---
name: go-beast-practices
description: Go best practices — простота, ошибки как значения, интерфейсы, контекст, конкурентность, структура проекта, линтеры и тестирование (TDD). Table-driven tests, errgroup, graceful shutdown, HTTP handlers. Активируй при написании или ревью Go-кода, или при вопросах «как правильно написать X на Go».
---

# Skill: Go Beast Practices

Конкретные DO/DON'T паттерны для идиоматического Go.

**Разделы:**
1. [Структура проекта](#1-структура-проекта)
2. [Обработка ошибок](#2-обработка-ошибок)
3. [Интерфейсы и DI](#3-интерфейсы-и-di)
4. [Context](#4-context)
5. [Конкурентность](#5-конкурентность)
6. [HTTP Handlers](#6-http-handlers)
7. [Тестирование](#7-тестирование)
8. [Tooling](#8-tooling)
9. [Anti-patterns](#9-anti-patterns)

---

## 1. Структура проекта

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

## 2. Обработка ошибок

### ✅ DO: оборачивать ошибки контекстом

```go
// ✅ fmt.Errorf с %w — сохраняет цепочку ошибок
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

### ✅ DO: sentinel errors для бизнес-ошибок

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

// В handler:
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

### ❌ DON'T: игнорировать ошибки

```go
// ❌ Ошибка молча проглатывается
json.Unmarshal(data, &result) // err ignored!

// ✅ Всегда проверять
if err := json.Unmarshal(data, &result); err != nil {
    return fmt.Errorf("unmarshal response: %w", err)
}

// ❌ Паника вместо обработки
func MustParse(s string) int {
    n, err := strconv.Atoi(s)
    if err != nil {
        panic(err) // ❌ никогда в production
    }
    return n
}
```

---

## 3. Интерфейсы и DI

### ✅ DO: маленькие интерфейсы на стороне потребителя

```go
// ✅ Интерфейс определяется там где ИСПОЛЬЗУЕТСЯ, а не там где реализуется
// service/coupon.go
type CouponRepository interface {
    FindByID(ctx context.Context, id string) (*model.Coupon, error)
    FindAll(ctx context.Context, offset, limit int) ([]model.Coupon, error)
    Create(ctx context.Context, c *model.Coupon) error
    Delete(ctx context.Context, id string) error
}

type CouponService struct {
    repo   CouponRepository // ✅ зависимость от интерфейса
    logger *slog.Logger
}

func NewCouponService(repo CouponRepository, logger *slog.Logger) *CouponService {
    return &CouponService{repo: repo, logger: logger}
}
```

### ❌ DON'T: fat interfaces

```go
// ❌ Интерфейс с 20 методами — невозможно мокать, нарушает ISP
type Database interface {
    FindUser(ctx context.Context, id string) (*User, error)
    FindCoupon(ctx context.Context, id string) (*Coupon, error)
    FindOrder(ctx context.Context, id string) (*Order, error)
    CreateUser(...) error
    CreateCoupon(...) error
    // ... ещё 15 методов
}

// ✅ Маленькие интерфейсы по домену
type UserFinder interface {
    FindUser(ctx context.Context, id string) (*User, error)
}
```

---

## 4. Context

### ✅ DO: context первым параметром

```go
// ✅ ctx всегда первый, именуется ctx
func (s *CouponService) GetByID(ctx context.Context, id string) (*model.Coupon, error) {
    return s.repo.FindByID(ctx, id)
}

// ✅ Timeout через context
func (h *Handler) ListCoupons(w http.ResponseWriter, r *http.Request) {
    ctx, cancel := context.WithTimeout(r.Context(), 5*time.Second)
    defer cancel()

    coupons, err := h.service.ListAll(ctx)
    // ...
}

// ❌ Не хранить context в struct
type BadService struct {
    ctx context.Context // ❌ context не хранится в struct!
}
```

---

## 5. Конкурентность

### ✅ DO: errgroup для параллельных задач

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

### ✅ DO: worker pool с semaphore

```go
func processItems(ctx context.Context, items []Item, maxWorkers int) error {
    g, ctx := errgroup.WithContext(ctx)
    g.SetLimit(maxWorkers) // ✅ ограничение параллельности

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

// JSON отправляет JSON response с указанным статусом.
func JSON(w http.ResponseWriter, status int, data any) {
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(status)
    json.NewEncoder(w).Encode(data)
}

// Error отправляет JSON error response.
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

## 7. Тестирование

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

### ✅ DO: test helpers с t.Helper()

```go
func createTestCoupon(t *testing.T, db *sql.DB, code string) *model.Coupon {
    t.Helper() // ✅ ошибки покажут вызывающую строку, не эту

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

    t.Cleanup(func() { // ✅ автоматическая очистка
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

### ✅ DO: golangci-lint конфиг

```yaml
# .golangci.yml
linters:
  enable:
    - errcheck        # проверить все ошибки
    - govet           # go vet
    - staticcheck     # мощный статический анализ
    - unused          # неиспользуемый код
    - gosimple        # упрощения
    - ineffassign     # бесполезные присваивания
    - misspell        # опечатки в комментариях
    - gofmt           # форматирование
    - goimports       # import sorting
    - bodyclose       # незакрытые http.Response.Body
    - contextcheck    # context propagation
    - nilerr          # return nil после проверки err != nil

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

| ❌ Anti-pattern | ✅ Решение |
|----------------|-----------|
| `panic` в production | `return error` + оборачивание контекстом |
| `_ = fn()` (игнор ошибки) | Всегда обрабатывать или хотя бы логировать |
| Глобальные переменные | DI через конструкторы |
| Fat interfaces (20+ методов) | Маленькие интерфейсы на стороне consumer |
| `context.Background()` вместо propagation | Пробрасывать `ctx` от handler к repo |
| `go func()` без errgroup/recovery | `errgroup`, `recover`, worker pool |
| `init()` для бизнес-логики | Explicit wiring в `main()` |
| Вложенные goroutines без control | `errgroup.SetLimit(n)` |
| Мутексы для конкурентных Map | `sync.Map` или channels |
| `interface{}` / `any` везде | Typed generics (Go 1.18+) |

---

## См. также
- `$node-express-beast-practices` — Node.js/Express (если нужен JS backend)
- `$testing-strategy-js` — TDD стратегия (JS, но паттерны переносимые)
- `$security-baseline-dev` — безопасность в реализации
- `$observability-logging` — логирование и метрики
