---
name: go_beast_practices
description: Go best practices ? simplicity, errors as values, interfaces, context, concurrency, project structure, linters, and testing (TDD). Table-driven tests, errgroup, graceful shutdown, HTTP handlers. Activate when writing or reviewing Go code, or with questions like "how to write X correctly in Go".
---

#Skill: Go Beast Practices

Concrete DO/DON'T patterns for idiomatic Go.

**Sections:**
1. [Structure project](#1-structured)
2. [Handling errors](#2-error handling)
3. [Interfaces and DI](#3-interfaces-and-di)
4. [Context](#4-context)
5. [Concurrency](#5-concurrency)
6. [HTTP Handlers](#6-http-handlers)
7. [Testing](#7-testing)
8. [Tooling](#8-tooling)
9. [Anti-patterns](#9-anti-patterns)

---

## 1. Structure project

```
project/
├── cmd/
│   └── server/
│       └── main.go              # Entrypoint: wiring, start server
├── internal/                     # Private app code (not importable)
│   ├── config/
│   │   └── config.go            # Env loading + validation
│   ├── handler/
│   │   ├── coupon.go            # HTTP handlers
│   │   └── middleware.go        # HTTP middleware
│   ├── service/
│   │   └── coupon.go            # Business logic
│   ├── repository/
│   │   └── coupon.go            # Data access
│   └── model/
│       └── coupon.go            # Domain types
├── pkg/                          # Public reusable code (if any)
│   └── httputil/
│       └── response.go
├── go.mod
├── go.sum
├── Makefile
└── .golangci.yml
```

> [!TIP]
> `internal/` — Go enforces access control: code in `internal/` cannot be imported by external packages. Use it for app-specific code.

---

## 2. Handling errors

### ? DO: wrap errors with context

```go
// ? fmt.Errorf with %w ? preserves the error chain
func (r *CouponRepo) FindByID(ctx context.Context, id string) (*model.Coupon, error) {
    var coupon model.Coupon
    err := r.db.QueryRowContext(ctx, "SELECT * FROM coupons WHERE id = $1", id).Scan(&coupon)
    if err != nil {
        if errors.Is(err, sql.ErrNoRows) {
            return nil, fmt.Errorf("coupon %s: %w", id, ErrNotFound)
        }
        return nil, fmt.Errorf("query coupon %s: %w", id, err)
    }
    return &coupon, nil
}
```

### ? DO: sentinel errors for business errors

```go
// errors.go
package service

import "errors"

var (
    ErrNotFound    = errors.New("not found")
    ErrConflict    = errors.New("already exists")
    ErrValidation  = errors.New("validation failed")
    ErrUnauthorized = errors.New("unauthorized")
)

// In handler:
func (h *Handler) GetCoupon(w http.ResponseWriter, r *http.Request) {
    coupon, err := h.service.GetByID(r.Context(), id)
    if err != nil {
        switch {
        case errors.Is(err, service.ErrNotFound):
            httputil.Error(w, http.StatusNotFound, err.Error())
        case errors.Is(err, service.ErrUnauthorized):
            httputil.Error(w, http.StatusUnauthorized, "access denied")
        default:
            h.logger.Error("get coupon failed", "error", err, "id", id)
            httputil.Error(w, http.StatusInternalServerError, "internal error")
        }
        return
    }
    httputil.JSON(w, http.StatusOK, coupon)
}
```

### ❌ DON'T: ignore errors

```go
// ❌ Error silently is swallowed
json.Unmarshal(data, &result) // err ignored!

// ✅ Always check
if err := json.Unmarshal(data, &result); err != nil {
    return fmt.Errorf("unmarshal response: %w", err)
}

// ? Panic instead of handling
func MustParse(s string) int {
    n, err := strconv.Atoi(s)
    if err != nil {
        panic(err) // ❌ never in productionuction
    }
    return n
}
```

---

## 3. Interfaces and DI

### ? DO: small interfaces on the consumer side

```go
// ? Interface is defined where it is used, not where it is implemented
// service/coupon.go
type CouponRepository interface {
    FindByID(ctx context.Context, id string) (*model.Coupon, error)
    FindAll(ctx context.Context, offset, limit int) ([]model.Coupon, error)
    Create(ctx context.Context, c *model.Coupon) error
    Delete(ctx context.Context, id string) error
}

type CouponService struct {
    repo   CouponRepository // ✅ dependency from interface
    logger *slog.Logger
}

func NewCouponService(repo CouponRepository, logger *slog.Logger) *CouponService {
    return &CouponService{repo: repo, logger: logger}
}
```

### ❌ DON'T: fat interfaces

```go
// ? Interface with 20 methods ? impossible to mock, violates ISP
type Database interface {
    FindUser(ctx context.Context, id string) (*User, error)
    FindCoupon(ctx context.Context, id string) (*Coupon, error)
    FindOrder(ctx context.Context, id string) (*Order, error)
    CreateUser(...) error
    CreateCoupon(...) error
    // ... still 15 methods
}

// ✅ Small interfaces by domain
type UserFinder interface {
    FindUser(ctx context.Context, id string) (*User, error)
}
```

---

## 4. Context

### ? DO: context as the first parameter

```go
// ? ctx is always first, named ctx
func (s *CouponService) GetByID(ctx context.Context, id string) (*model.Coupon, error) {
    return s.repo.FindByID(ctx, id)
}

// ✅ Timeout via context
func (h *Handler) ListCoupons(w http.ResponseWriter, r *http.Request) {
    ctx, cancel := context.WithTimeout(r.Context(), 5*time.Second)
    defer cancel()

    coupons, err := h.service.ListAll(ctx)
    // ...
}

// ❌ Not store context in struct
type BadService struct {
    ctx context.Context // ❌ context not store in struct!
}
```

---

## 5. Concurrency

### ✅ DO: errgroup for parallel tasks

```go
import "golang.org/x/sync/errgroup"

func (s *DashboardService) GetDashboard(ctx context.Context, userID string) (*Dashboard, error) {
    g, ctx := errgroup.WithContext(ctx)

    var user *model.User
    var stats *model.Stats
    var coupons []model.Coupon

    g.Go(func() error {
        var err error
        user, err = s.userRepo.FindByID(ctx, userID)
        return err
    })

    g.Go(func() error {
        var err error
        stats, err = s.statsRepo.GetForUser(ctx, userID)
        return err
    })

    g.Go(func() error {
        var err error
        coupons, err = s.couponRepo.FindByUser(ctx, userID)
        return err
    })

    if err := g.Wait(); err != nil {
        return nil, fmt.Errorf("load dashboard for %s: %w", userID, err)
    }

    return &Dashboard{User: user, Stats: stats, Coupons: coupons}, nil
}
```

### ✅ DO: worker pool with semaphore

```go
func processItems(ctx context.Context, items []Item, maxWorkers int) error {
    g, ctx := errgroup.WithContext(ctx)
    g.SetLimit(maxWorkers) // ? concurrency limit

    for _, item := range items {
        item := item // ✅ capture (Go < 1.22)
        g.Go(func() error {
            return processItem(ctx, item)
        })
    }

    return g.Wait()
}
```

### ✅ DO: graceful shutdown

```go
func main() {
    srv := &http.Server{Addr: ":8080", Handler: mux}

    // Start server in goroutine
    go func() {
        if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
            log.Fatal("server error:", err)
        }
    }()

    // Wait for signal
    quit := make(chan os.Signal, 1)
    signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
    <-quit

    log.Println("Shutting down...")

    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    if err := srv.Shutdown(ctx); err != nil {
        log.Fatal("forced shutdown:", err)
    }

    log.Println("Server stopped")
}
```

---

## 6. HTTP Handlers

### ✅ DO: httputil response helpers

```go
// pkg/httputil/response.go
package httputil

import (
    "encoding/json"
    "net/http"
)

// JSON sends a JSON response with the specified status.
func JSON(w http.ResponseWriter, status int, data any) {
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(status)
    json.NewEncoder(w).Encode(data)
}

// Error sends JSON error response.
func Error(w http.ResponseWriter, status int, message string) {
    JSON(w, status, map[string]string{"error": message})
}
```

### ✅ DO: middleware pattern

```go
// Middleware type
type Middleware func(http.Handler) http.Handler

// RequestID middleware
func RequestID(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        id := r.Header.Get("X-Request-ID")
        if id == "" {
            id = uuid.NewString()
        }
        ctx := context.WithValue(r.Context(), requestIDKey, id)
        w.Header().Set("X-Request-ID", id)
        next.ServeHTTP(w, r.WithContext(ctx))
    })
}

// Logging middleware
func Logging(logger *slog.Logger) Middleware {
    return func(next http.Handler) http.Handler {
        return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
            start := time.Now()
            ww := &responseWriter{ResponseWriter: w, status: http.StatusOK}

            next.ServeHTTP(ww, r)

            logger.Info("request",
                "method", r.Method,
                "path", r.URL.Path,
                "status", ww.status,
                "duration", time.Since(start),
                "request_id", r.Context().Value(requestIDKey),
            )
        })
    }
}

// Chain middleware
func Chain(h http.Handler, mw ...Middleware) http.Handler {
    for i := len(mw) - 1; i >= 0; i-- {
        h = mw[i](h)
    }
    return h
}
```

---

## 7. Testing

### ✅ DO: table-driven tests

```go
func TestCalculateDiscount(t *testing.T) {
    tests := []struct {
        name     string
        price    float64
        percent  float64
        want     float64
        wantErr  bool
    }{
        {name: "20% off 100", price: 100, percent: 20, want: 80},
        {name: "100% off", price: 50, percent: 100, want: 0},
        {name: "0% off", price: 100, percent: 0, want: 100},
        {name: "negative price", price: -10, percent: 5, wantErr: true},
        {name: "discount > 100%", price: 100, percent: 120, wantErr: true},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            got, err := CalculateDiscount(tt.price, tt.percent)

            if tt.wantErr {
                if err == nil {
                    t.Fatal("expected error, got nil")
                }
                return
            }

            if err != nil {
                t.Fatalf("unexpected error: %v", err)
            }
            if got != tt.want {
                t.Errorf("got %v, want %v", got, tt.want)
            }
        })
    }
}
```

### ✅ DO: test helpers with t.Helper()

```go
func createTestCoupon(t *testing.T, db *sql.DB, code string) *model.Coupon {
    t.Helper() // ? errors point to the calling line, not this one

    coupon := &model.Coupon{
        ID:       uuid.NewString(),
        Code:     code,
        Discount: 10,
        Active:   true,
    }

    _, err := db.Exec("INSERT INTO coupons (id, code, discount, active) VALUES ($1, $2, $3, $4)",
        coupon.ID, coupon.Code, coupon.Discount, coupon.Active)
    if err != nil {
        t.Fatalf("create test coupon: %v", err)
    }

    t.Cleanup(func() { // ✅ automatic cleanup
        db.Exec("DELETE FROM coupons WHERE id = $1", coupon.ID)
    })

    return coupon
}
```

### ✅ DO: HTTP handler tests

```go
func TestGetCoupon(t *testing.T) {
    // Arrange
    mockService := &MockCouponService{
        GetByIDFn: func(ctx context.Context, id string) (*model.Coupon, error) {
            return &model.Coupon{ID: id, Code: "TEST10"}, nil
        },
    }
    handler := NewHandler(mockService, slog.Default())

    req := httptest.NewRequest(http.MethodGet, "/coupons/abc", nil)
    rec := httptest.NewRecorder()

    // Act
    handler.GetCoupon(rec, req)

    // Assert
    if rec.Code != http.StatusOK {
        t.Fatalf("status = %d, want %d", rec.Code, http.StatusOK)
    }

    var got model.Coupon
    json.NewDecoder(rec.Body).Decode(&got)
    if got.Code != "TEST10" {
        t.Errorf("code = %q, want %q", got.Code, "TEST10")
    }
}
```

---

## 8. Tooling

### Makefile

```makefile
.PHONY: run test lint fmt build

run:
	go run ./cmd/server

build:
	go build -o bin/server ./cmd/server

test:
	go test -v -race -count=1 ./...

test-cover:
	go test -coverprofile=coverage.out ./...
	go tool cover -html=coverage.out -o coverage.html

lint:
	golangci-lint run ./...

fmt:
	gofmt -w .
	goimports -w .
```

### ✅ DO: golangci-lint config

```yaml
# .golangci.yml
linters:
  enable:
    - errcheck        # check all errors
    - govet           # go vet
    - staticcheck     # powerful static analysis
    - unused          # unused code
    - gosimple        # simplifications
    - ineffassign     # useless assignments
    - misspell        # typos in comment
    - gofmt           # form
    - goimports       # import sorting
    - bodyclose       # unclosed http.Response.Body
    - contextcheck    # context propagation
    - nilerr          # return nil after checks err != nil

linters-settings:
  errcheck:
    check-blank: true
  govet:
    shadow: true

run:
  timeout: 3m

issues:
  max-issues-per-linter: 0
  max-same-issues: 0
```

---

## 9. Anti-patterns

| ❌ Anti-pattern | ✅ Decision |
|----------------|-----------|
| `panic` in production | `return error` + context wrapping |
| `_ = fn()` (ignore errors) | Always handle or at least log |
| Global variables | DI via constructor |
| Fat interfaces (20+ methods) | Small interfaces on storenot consumer |
| `context.Background()` instead of propagation | Pass through `ctx` from handler to repo |
| `go func()` without errgroup/recovery | `errgroup`, `recover`, worker pool |
| `init()` for business logic | Explicit wiring in `main()` |
| Nested goroutines without control | `errgroup.SetLimit(n)` |
| Mutexes for concurrent Map | `sync.Map` or channels |
| `interface{}` / `any` everywhere | Typed generics (Go 1.18+) |

---

## See also
- `$node_express_beast_practices` — Node.js/Express (if needed JS backend)
- `$testing_strategy_js` ? TDD strategy (JS, but patterns are transferable)
- `$security_baseline_dev` — security in implementation
- `$observability_logging` — logging and metrics
