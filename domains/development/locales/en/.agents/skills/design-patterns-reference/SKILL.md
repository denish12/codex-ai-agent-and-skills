---
name: design-patterns-reference
description: Design patterns reference with DO/DON'T examples — SOLID, DRY/KISS/YAGNI, GoF (Strategy, Observer, Factory, Adapter, Facade, Decorator, Command, State, Template Method), architectural (Repository, Service Layer, DI, Event-Driven, CQRS), microservices (Saga, Circuit Breaker). Language-agnostic pseudocode. Use when designing modules, reviewing architecture, or when asked "which pattern to apply".
---

# Skill: Design Patterns Reference

DO/DON'T reference for design patterns. Language-agnostic pseudocode.

**Sections:**
1. [SOLID](#1-solid)
2. [Fundamental Principles](#2-fundamental-principles)
3. [GoF Patterns](#3-gof-patterns)
4. [Architectural Patterns](#4-architectural-patterns)
5. [Microservices Patterns](#5-microservices-patterns)
6. [Pattern Selection Guide](#6-pattern-selection)

---

## 1. SOLID

### S — Single Responsibility Principle (SRP)
> A class/module has exactly one reason to change.

```
// ✅ DO: each class — one responsibility
class UserValidator
  validate(user) → ValidationResult

class UserRepository
  save(user) → void

class EmailNotifier
  sendWelcome(user) → void
```

```
// ❌ DON'T: one class does everything
class UserManager
  validate(user) → ...
  saveToDb(user) → ...
  sendEmail(user) → ...
  generateReport() → ...
  // Changing email logic breaks validation and DB
```

### O — Open/Closed Principle (OCP)
> Open for extension, closed for modification.

```
// ✅ DO: new type = new class, without modifying existing code
interface DiscountStrategy
  calculate(order) → number

class PercentDiscount implements DiscountStrategy
  calculate(order) → order.total * this.percent

class FixedDiscount implements DiscountStrategy
  calculate(order) → this.amount

class OrderService
  applyDiscount(order, strategy: DiscountStrategy)
    order.discount = strategy.calculate(order)
```

```
// ❌ DON'T: every new discount type — editing if/switch
class OrderService
  applyDiscount(order, type)
    if type == "percent" → ...
    else if type == "fixed" → ...
    else if type == "seasonal" → ...  // modifying this method every time
```

### L — Liskov Substitution Principle (LSP)
> Subtypes can be substituted for the base type without breaking behavior.

```
// ✅ DO: subtypes honestly implement the contract
interface Shape
  area() → number

class Rectangle implements Shape
  area() → this.width * this.height

class Circle implements Shape
  area() → π * this.radius²

// Any Shape can be passed to calculateTotalArea(shapes[])
```

```
// ❌ DON'T: subtype violates parent's contract
class Rectangle
  setWidth(w), setHeight(h)

class Square extends Rectangle
  setWidth(w) → this.width = w; this.height = w  // surprise: setWidth changes height
  // Code that expects Rectangle breaks
```

### I — Interface Segregation Principle (ISP)
> Many small interfaces are better than one fat one.

```
// ✅ DO: client depends only on needed methods
interface Readable
  read() → Data

interface Writable
  write(data) → void

interface Deletable
  delete(id) → void

class FileStore implements Readable, Writable, Deletable
class ReadOnlyCache implements Readable
```

```
// ❌ DON'T: one fat interface — clients depend on what they don't need
interface Storage
  read() → Data
  write(data) → void
  delete(id) → void
  backup() → void
  migrate() → void

class SimpleCache implements Storage
  backup() → throw "Not supported"   // contract violation
  migrate() → throw "Not supported"
```

### D — Dependency Inversion Principle (DIP)
> Depend on abstractions, not on concrete implementations.

```
// ✅ DO: business logic depends on an interface
interface PaymentGateway
  charge(amount) → Result

class OrderService
  constructor(gateway: PaymentGateway)  // abstraction injection
  checkout(order) → this.gateway.charge(order.total)

// Easy to swap: StripeGateway, PayPalGateway, TestGateway
```

```
// ❌ DON'T: direct dependency on a concrete implementation
class OrderService
  checkout(order)
    stripe = new StripeClient(API_KEY)  // hardcoded to Stripe
    stripe.charge(order.total)
    // Cannot test, cannot replace
```

---

## 2. Fundamental Principles

### DRY — Don't Repeat Yourself
```
// ✅ DO: reusable function
function formatCurrency(amount, currency)
  return currency.symbol + amount.toFixed(2)

// Used in Invoice, Cart, Report
```

```
// ❌ DON'T: copy-pasting the same logic
// In Invoice:  "$" + amount.toFixed(2)
// In Cart:     "$" + amount.toFixed(2)
// In Report:   "$" + amount.toFixed(2)
// Changing the format → editing 3+ places
```

> ⚠️ **Caution:** DRY is about knowledge, not code. Two identical code snippets with different reasons to change are NOT duplication.

### KISS — Keep It Simple, Stupid
```
// ✅ DO: simple and readable solution
function isAdult(age)
  return age >= 18
```

```
// ❌ DON'T: overengineering
function isAdult(age)
  ageValidator = new AgeValidatorFactory.create("adult")
  rule = ageValidator.getRuleEngine().getRule("minimum")
  return rule.evaluate(new AgeContext(age))
```

### YAGNI — You Aren't Gonna Need It
```
// ✅ DO: implement what is needed now
class UserService
  getUser(id) → User
  createUser(data) → User

// ❌ DON'T: "just in case"
class UserService
  getUser(id) → User
  createUser(data) → User
  exportToXml() → ...        // nobody asked
  syncWithLdap() → ...       // no requirement
  generatePdfReport() → ...  // "might come in handy"
```

### Composition over Inheritance
```
// ✅ DO: composition — flexible, testable
class Logger
  log(msg) → ...

class HttpClient
  constructor(logger: Logger)
  get(url) → this.logger.log(...); fetch(url)

class CachedHttpClient
  constructor(client: HttpClient, cache: Cache)
  get(url) → cache.get(url) ?? client.get(url)
```

```
// ❌ DON'T: deep inheritance hierarchy
class BaseClient → class HttpClient → class AuthHttpClient → class CachedAuthHttpClient
// 4 levels of inheritance — fragile, hard to modify
```

### Fail Fast
```
// ✅ DO: validate inputs immediately
function transfer(from, to, amount)
  if amount <= 0 → throw InvalidAmountError
  if from.balance < amount → throw InsufficientFundsError
  // ... main logic only if everything is valid

// ❌ DON'T: error surfaces deep inside
function transfer(from, to, amount)
  from.balance -= amount     // may go negative
  to.balance += amount       // data already corrupted
  if from.balance < 0 → ... // too late!
```

---

## 3. GoF Patterns

### Strategy — swappable algorithms
```
// ✅ DO: algorithm as an injectable strategy
interface SortStrategy
  sort(items[]) → items[]

class BubbleSort implements SortStrategy
class QuickSort implements SortStrategy
class MergeSort implements SortStrategy

class DataProcessor
  constructor(strategy: SortStrategy)
  process(data) → this.strategy.sort(data)
```

**When:** multiple algorithm variants, runtime selection.

### Observer — change notifications
```
// ✅ DO: subscribe/notify without tight coupling
class EventBus
  subscribers = Map<string, Function[]>
  subscribe(event, handler)
  publish(event, data) → subscribers[event].forEach(h => h(data))

// Components subscribe without knowing about each other
bus.subscribe("order.created", sendEmail)
bus.subscribe("order.created", updateInventory)
bus.subscribe("order.created", logAudit)
```

**When:** one event source, many consumers.

### Factory Method — creation without binding to a specific class
```
// ✅ DO: factory selects the implementation
class NotificationFactory
  static create(type) →
    if type == "email"  → new EmailNotification()
    if type == "sms"    → new SmsNotification()
    if type == "push"   → new PushNotification()
    throw UnknownTypeError

// Client doesn't know about specific classes
notification = NotificationFactory.create(user.preference)
notification.send(message)
```

**When:** object type determined at runtime; client should not know the specifics.

### Adapter — compatibility for incompatible interfaces
```
// ✅ DO: adapter wraps a foreign interface into yours
interface PaymentGateway
  charge(amount, currency) → Result

class StripeAdapter implements PaymentGateway
  constructor(stripeClient)
  charge(amount, currency) →
    this.stripeClient.createPaymentIntent({
      amount: amount * 100,  // Stripe accepts cents
      currency: currency
    })
```

**When:** integrating with an external API/library whose interface doesn't match yours.

### Facade — simple interface to a complex subsystem
```
// ✅ DO: facade hides complexity
class OrderFacade
  constructor(inventory, payment, shipping, notification)

  placeOrder(cart, user) →
    inventory.reserve(cart.items)
    payment.charge(user, cart.total)
    shipping.createShipment(user.address, cart.items)
    notification.sendConfirmation(user, cart)

// Client calls one method instead of four subsystems
orderFacade.placeOrder(cart, user)
```

**When:** complex subsystem of multiple components; client needs a simple entry point.

### Decorator — dynamic behavior extension
```
// ✅ DO: wrappers add behavior without modifying the original
interface DataSource
  read() → Data
  write(data) → void

class FileDataSource implements DataSource
class EncryptionDecorator implements DataSource
  constructor(source: DataSource)
  write(data) → this.source.write(encrypt(data))
  read() → decrypt(this.source.read())

class CompressionDecorator implements DataSource
  constructor(source: DataSource)
  write(data) → this.source.write(compress(data))

// Combining: compression + encryption + file
source = new CompressionDecorator(new EncryptionDecorator(new FileDataSource()))
```

**When:** need to combine behaviors in various combinations without a subclass explosion.

### Command — action encapsulated as an object
```
// ✅ DO: each action = object with execute/undo
interface Command
  execute() → void
  undo() → void

class AddItemCommand implements Command
  constructor(cart, item)
  execute() → this.cart.add(this.item)
  undo() → this.cart.remove(this.item)

class CommandHistory
  stack = []
  execute(cmd) → cmd.execute(); stack.push(cmd)
  undo() → stack.pop().undo()
```

**When:** undo/redo, operation queues, deferred execution.

### State — behavior depends on state
```
// ✅ DO: each state = separate class
interface OrderState
  next(order) → void
  cancel(order) → void

class PendingState implements OrderState
  next(order) → order.setState(new PaidState())
  cancel(order) → order.setState(new CancelledState())

class PaidState implements OrderState
  next(order) → order.setState(new ShippedState())
  cancel(order) → throw "Cannot cancel paid order"

class Order
  state: OrderState = new PendingState()
  next() → this.state.next(this)
  cancel() → this.state.cancel(this)
```

```
// ❌ DON'T: switch/if on string status
class Order
  status = "pending"
  next()
    if status == "pending" → status = "paid"
    else if status == "paid" → status = "shipped"
    // grows infinitely with new statuses
```

**When:** object with multiple states and different behavior in each.

### Template Method — algorithm skeleton with overridable steps
```
// ✅ DO: base class defines the skeleton, steps are overridden
abstract class DataImporter
  import(source)          // template method
    data = this.read(source)
    validated = this.validate(data)
    transformed = this.transform(validated)
    this.save(transformed)

  abstract read(source) → RawData
  abstract validate(data) → ValidData
  abstract transform(data) → FinalData
  save(data) → db.insert(data)  // shared implementation

class CsvImporter extends DataImporter
  read(source) → parseCsv(source)
  validate(data) → validateCsvRows(data)
  transform(data) → mapCsvToEntities(data)

class JsonImporter extends DataImporter
  read(source) → parseJson(source)
  validate(data) → validateJsonSchema(data)
  transform(data) → mapJsonToEntities(data)
```

**When:** same algorithm skeleton, different implementation details.

---

## 4. Architectural Patterns

### Repository — data access isolation
```
// ✅ DO: repository encapsulates storage access
interface UserRepository
  findById(id) → User | null
  findByEmail(email) → User | null
  save(user) → User
  delete(id) → void

class PostgresUserRepository implements UserRepository
  findById(id) → db.query("SELECT ... WHERE id = $1", [id])

class MongoUserRepository implements UserRepository
  findById(id) → collection.findOne({ _id: id })

// Business logic doesn't know about SQL/Mongo
class UserService
  constructor(repo: UserRepository)
  getUser(id) → this.repo.findById(id)
```

```
// ❌ DON'T: SQL in business logic
class UserService
  getUser(id)
    result = db.query("SELECT * FROM users WHERE id = $1", [id])
    // Bound to PostgreSQL, cannot test without DB
```

### Service Layer — business logic not in controllers
```
// ✅ DO: controller → service → repository
class OrderController
  constructor(orderService)
  handleCreateOrder(req)
    order = this.orderService.create(req.body)
    return Response(201, order)

class OrderService
  constructor(orderRepo, paymentGateway, inventory)
  create(data)
    this.inventory.reserve(data.items)
    order = Order.create(data)
    this.paymentGateway.charge(order.total)
    this.orderRepo.save(order)
    return order

// ❌ DON'T: business logic in controller
class OrderController
  handleCreateOrder(req)
    db.query("INSERT INTO orders ...")    // SQL in controller
    stripe.charge(...)                     // payment in controller
    sendEmail(...)                         // and email too
```

### Dependency Injection (DI)
```
// ✅ DO: dependencies passed from outside
class Application
  start()
    db = new PostgresConnection(config.db)
    userRepo = new PostgresUserRepository(db)
    emailService = new SmtpEmailService(config.smtp)
    userService = new UserService(userRepo, emailService)
    controller = new UserController(userService)
    server.register(controller)

// Each component receives dependencies via constructor
// Easy to test: substitute mock repository
```

```
// ❌ DON'T: components create their own dependencies
class UserService
  repo = new PostgresUserRepository(new PostgresConnection("hardcoded"))
  email = new SmtpEmailService("smtp://hardcoded")
  // Cannot test without real PostgreSQL and SMTP
```

### Event-Driven — reacting to events
```
// ✅ DO: loose coupling through events
// Service creates order and publishes event
class OrderService
  createOrder(data)
    order = Order.create(data)
    orderRepo.save(order)
    eventBus.publish("order.created", { orderId: order.id })

// Independent handlers subscribed to the event
class InventoryHandler
  on("order.created") → reserveItems(event.orderId)

class NotificationHandler
  on("order.created") → sendConfirmation(event.orderId)

class AnalyticsHandler
  on("order.created") → trackConversion(event.orderId)

// Adding a new handler → not a single line in OrderService changes
```

```
// ❌ DON'T: OrderService knows about all dependent components
class OrderService
  createOrder(data)
    order = Order.create(data)
    orderRepo.save(order)
    inventoryService.reserve(order)      // tight coupling
    notificationService.send(order)       // tight coupling
    analyticsService.track(order)         // tight coupling
```

### CQRS — Command Query Responsibility Segregation
```
// ✅ DO: separate models for writing and reading
// Command side — normalized model; business rules
class CreateOrderCommand
  execute(data)
    order = Order.create(data)
    orderRepo.save(order)
    eventBus.publish("order.created", order)

// Query side — denormalized model; optimized for reading
class OrderQueryService
  getOrderSummary(id) →
    readDb.query("SELECT ... FROM order_summaries WHERE id = $1", [id])

  getOrdersByUser(userId, page) →
    readDb.query("SELECT ... FROM user_orders_view WHERE user_id = $1 LIMIT ...", [userId])

// Writes update the read model via events
on("order.created") → updateOrderSummaryView(event)
```

**When:** read and write patterns differ significantly; high read load; denormalization needed for fast queries.

---

## 5. Microservices Patterns

### Saga — distributed transactions via compensations
```
// ✅ DO: each step has a compensation (rollback)
class OrderSaga
  steps = [
    { action: reserveInventory,    compensate: releaseInventory },
    { action: chargePayment,       compensate: refundPayment },
    { action: createShipment,      compensate: cancelShipment },
    { action: sendConfirmation,    compensate: sendCancellation },
  ]

  execute(orderData)
    completed = []
    for step in steps
      try
        step.action(orderData)
        completed.push(step)
      catch error
        // Roll back all completed steps in reverse order
        for s in completed.reverse()
          s.compensate(orderData)
        throw SagaFailedError(error)
```

**When:** transaction spans multiple services; cannot use distributed 2PC.

### Circuit Breaker — protection against cascading failures
```
// ✅ DO: Circuit Breaker before calling an external service
class CircuitBreaker
  state = CLOSED        // normal operation
  failureCount = 0
  threshold = 5
  resetTimeout = 30s

  call(fn)
    if state == OPEN
      if elapsed > resetTimeout → state = HALF_OPEN
      else → throw ServiceUnavailableError   // don't send request

    try
      result = fn()
      if state == HALF_OPEN → state = CLOSED; failureCount = 0
      return result
    catch error
      failureCount++
      if failureCount >= threshold → state = OPEN; startTimer()
      throw error

// Usage
breaker = new CircuitBreaker()
userData = breaker.call(() => externalUserApi.getUser(id))
```

**When:** dependency on an external service that may fail; preventing cascading failure.

### Mediator — central coordinator for interactions
```
// ✅ DO: components communicate through mediator, not directly
class OrderMediator
  handlers = Map<string, Handler>

  register(commandType, handler)
  send(command)
    handler = this.handlers.get(command.type)
    return handler.handle(command)

// Registration
mediator.register("CreateOrder", new CreateOrderHandler(orderRepo, inventory))
mediator.register("CancelOrder", new CancelOrderHandler(orderRepo, payment))

// Call — controller doesn't know about specific handlers
class OrderController
  handleCreate(req) → mediator.send(new CreateOrderCommand(req.body))
  handleCancel(req) → mediator.send(new CancelOrderCommand(req.params.id))
```

**When:** many interacting components; need to centralize coordination and remove direct dependencies.

---

## 6. Pattern Selection

| Problem | Pattern | Example |
|---------|---------|---------|
| Multiple algorithm variants | Strategy | Sorting algorithms, discount calculations |
| Reacting to changes | Observer / Event-Driven | Notifications, audit, analytics |
| Conditional object creation | Factory Method | Notifications: email/sms/push |
| Integration with foreign API | Adapter | Stripe/PayPal wrapper |
| Complex subsystem | Facade | Order placement (inventory + payment + shipping) |
| Behavior combinations | Decorator | Caching + encryption + logging |
| Undo/redo, queues | Command | Text editor, batch operations |
| Multiple object states | State | Order workflow, tasks |
| Same skeleton, different details | Template Method | CSV/JSON/XML import |
| Storage isolation | Repository | DB access without SQL in business logic |
| Business logic not in controllers | Service Layer | REST API |
| Loose component coupling | DI | Dependency injection via constructor |
| Different read/write models | CQRS | Dashboard + admin panel |
| Distributed transactions | Saga | Order: inventory → payment → shipping |
| Protection against cascading failures | Circuit Breaker | External APIs |
| Component coordination | Mediator | Request → Handler routing |

---

## See also
- `architecture-doc` → where to document chosen patterns
- `architecture-compliance-review` → verifying adherence to architecture
- `adr-log` → recording pattern selection decisions
- `code-review-checklist` → verifying pattern implementation
