---
name: design-patterns-reference
description: Справочник паттернов проектирования с DO/DON'T примерами — SOLID, DRY/KISS/YAGNI, GoF (Strategy, Observer, Factory, Adapter, Facade, Decorator, Command, State, Template Method), архитектурные (Repository, Service Layer, DI, Event-Driven, CQRS), микросервисные (Saga, Circuit Breaker). Language-agnostic псевдокод. Используй при проектировании модулей, ревью архитектуры, или при вопросах «какой паттерн применить».
---

# Skill: Design Patterns Reference

DO/DON'T справочник паттернов проектирования. Language-agnostic псевдокод.

**Разделы:**
1. [SOLID](#1-solid)
2. [Fundamental Principles](#2-fundamental-principles)
3. [GoF Patterns](#3-gof-patterns)
4. [Architectural Patterns](#4-architectural-patterns)
5. [Microservices Patterns](#5-microservices-patterns)
6. [Правило выбора паттерна](#6-правило-выбора)

---

## 1. SOLID

### S — Single Responsibility Principle (SRP)
> Класс/модуль имеет ровно одну причину для изменения.

```
// ✅ DO: каждый класс — одна ответственность
class UserValidator
  validate(user) → ValidationResult

class UserRepository
  save(user) → void

class EmailNotifier
  sendWelcome(user) → void
```

```
// ❌ DON'T: один класс делает всё
class UserManager
  validate(user) → ...
  saveToDb(user) → ...
  sendEmail(user) → ...
  generateReport() → ...
  // Изменение email-логики ломает валидацию и БД
```

### O — Open/Closed Principle (OCP)
> Открыт для расширения, закрыт для модификации.

```
// ✅ DO: новый тип = новый класс, без изменения существующего кода
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
// ❌ DON'T: каждый новый тип скидки — правка if/switch
class OrderService
  applyDiscount(order, type)
    if type == "percent" → ...
    else if type == "fixed" → ...
    else if type == "seasonal" → ...  // каждый раз меняем этот метод
```

### L — Liskov Substitution Principle (LSP)
> Подтипы можно подставлять вместо базового типа без поломки.

```
// ✅ DO: подтипы честно реализуют контракт
interface Shape
  area() → number

class Rectangle implements Shape
  area() → this.width * this.height

class Circle implements Shape
  area() → π * this.radius²

// Любой Shape можно передать в calculateTotalArea(shapes[])
```

```
// ❌ DON'T: подтип нарушает контракт родителя
class Rectangle
  setWidth(w), setHeight(h)

class Square extends Rectangle
  setWidth(w) → this.width = w; this.height = w  // сюрприз: setWidth меняет height
  // Код, который ожидает Rectangle, ломается
```

### I — Interface Segregation Principle (ISP)
> Много маленьких интерфейсов лучше одного толстого.

```
// ✅ DO: клиент зависит только от нужных методов
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
// ❌ DON'T: один толстый интерфейс — клиенты зависят от лишнего
interface Storage
  read() → Data
  write(data) → void
  delete(id) → void
  backup() → void
  migrate() → void

class SimpleCache implements Storage
  backup() → throw "Not supported"   // нарушение контракта
  migrate() → throw "Not supported"
```

### D — Dependency Inversion Principle (DIP)
> Завись от абстракций, не от конкретных реализаций.

```
// ✅ DO: бизнес-логика зависит от интерфейса
interface PaymentGateway
  charge(amount) → Result

class OrderService
  constructor(gateway: PaymentGateway)  // инъекция абстракции
  checkout(order) → this.gateway.charge(order.total)

// Легко подменить: StripeGateway, PayPalGateway, TestGateway
```

```
// ❌ DON'T: прямая зависимость от конкретики
class OrderService
  checkout(order)
    stripe = new StripeClient(API_KEY)  // жёстко привязан к Stripe
    stripe.charge(order.total)
    // Нельзя тестировать, нельзя заменить
```

---

## 2. Fundamental Principles

### DRY — Don't Repeat Yourself
```
// ✅ DO: переиспользуемая функция
function formatCurrency(amount, currency)
  return currency.symbol + amount.toFixed(2)

// Используется в Invoice, Cart, Report
```

```
// ❌ DON'T: копипаст одной и той же логики
// В Invoice:  "$" + amount.toFixed(2)
// В Cart:     "$" + amount.toFixed(2)
// В Report:   "$" + amount.toFixed(2)
// Изменение формата → правка в 3+ местах
```

> ⚠️ **Осторожно:** DRY — про знание, не про код. Два одинаковых куска кода с разными причинами изменения — это НЕ дублирование.

### KISS — Keep It Simple, Stupid
```
// ✅ DO: простое и читаемое решение
function isAdult(age)
  return age >= 18
```

```
// ❌ DON'T: переусложнение
function isAdult(age)
  ageValidator = new AgeValidatorFactory.create("adult")
  rule = ageValidator.getRuleEngine().getRule("minimum")
  return rule.evaluate(new AgeContext(age))
```

### YAGNI — You Aren't Gonna Need It
```
// ✅ DO: реализуй то, что нужно сейчас
class UserService
  getUser(id) → User
  createUser(data) → User

// ❌ DON'T: "на будущее"
class UserService
  getUser(id) → User
  createUser(data) → User
  exportToXml() → ...        // никто не просил
  syncWithLdap() → ...       // нет требования
  generatePdfReport() → ...  // "вдруг пригодится"
```

### Composition over Inheritance
```
// ✅ DO: композиция — гибко, тестируемо
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
// ❌ DON'T: глубокая иерархия наследования
class BaseClient → class HttpClient → class AuthHttpClient → class CachedAuthHttpClient
// 4 уровня наследования — хрупко, сложно менять
```

### Fail Fast
```
// ✅ DO: проверяй входы сразу
function transfer(from, to, amount)
  if amount <= 0 → throw InvalidAmountError
  if from.balance < amount → throw InsufficientFundsError
  // ... основная логика только если всё валидно

// ❌ DON'T: ошибка всплывает где-то глубоко внутри
function transfer(from, to, amount)
  from.balance -= amount     // может стать отрицательным
  to.balance += amount       // данные уже испорчены
  if from.balance < 0 → ... // поздно!
```

---

## 3. GoF Patterns

### Strategy — заменяемые алгоритмы
```
// ✅ DO: алгоритм как инъектируемая стратегия
interface SortStrategy
  sort(items[]) → items[]

class BubbleSort implements SortStrategy
class QuickSort implements SortStrategy
class MergeSort implements SortStrategy

class DataProcessor
  constructor(strategy: SortStrategy)
  process(data) → this.strategy.sort(data)
```

**Когда:** несколько вариантов алгоритма, выбор в runtime.

### Observer — уведомления об изменениях
```
// ✅ DO: подписка/уведомление без жёсткой связи
class EventBus
  subscribers = Map<string, Function[]>
  subscribe(event, handler)
  publish(event, data) → subscribers[event].forEach(h => h(data))

// Компоненты подписываются, не зная друг о друге
bus.subscribe("order.created", sendEmail)
bus.subscribe("order.created", updateInventory)
bus.subscribe("order.created", logAudit)
```

**Когда:** один источник события, много потребителей.

### Factory Method — создание без привязки к конкретному классу
```
// ✅ DO: фабрика выбирает реализацию
class NotificationFactory
  static create(type) →
    if type == "email"  → new EmailNotification()
    if type == "sms"    → new SmsNotification()
    if type == "push"   → new PushNotification()
    throw UnknownTypeError

// Клиент не знает про конкретные классы
notification = NotificationFactory.create(user.preference)
notification.send(message)
```

**Когда:** тип объекта определяется в runtime; клиент не должен знать конкретику.

### Adapter — совместимость несовместимого
```
// ✅ DO: адаптер оборачивает чужой интерфейс в ваш
interface PaymentGateway
  charge(amount, currency) → Result

class StripeAdapter implements PaymentGateway
  constructor(stripeClient)
  charge(amount, currency) →
    this.stripeClient.createPaymentIntent({
      amount: amount * 100,  // Stripe принимает в центах
      currency: currency
    })
```

**Когда:** интеграция с внешним API/библиотекой, интерфейс которой не совпадает с вашим.

### Facade — простой интерфейс к сложной подсистеме
```
// ✅ DO: фасад скрывает сложность
class OrderFacade
  constructor(inventory, payment, shipping, notification)

  placeOrder(cart, user) →
    inventory.reserve(cart.items)
    payment.charge(user, cart.total)
    shipping.createShipment(user.address, cart.items)
    notification.sendConfirmation(user, cart)

// Клиент вызывает один метод вместо четырёх подсистем
orderFacade.placeOrder(cart, user)
```

**Когда:** сложная подсистема из нескольких компонентов; клиенту нужен простой вход.

### Decorator — динамическое расширение поведения
```
// ✅ DO: обёртки добавляют поведение, не меняя оригинал
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

// Комбинируем: сжатие + шифрование + файл
source = new CompressionDecorator(new EncryptionDecorator(new FileDataSource()))
```

**Когда:** нужно комбинировать поведения в разных сочетаниях без взрыва подклассов.

### Command — инкапсуляция действия как объекта
```
// ✅ DO: каждое действие = объект с execute/undo
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

**Когда:** undo/redo, очередь операций, отложенное выполнение.

### State — поведение зависит от состояния
```
// ✅ DO: каждое состояние = отдельный класс
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
// ❌ DON'T: switch/if на строковый статус
class Order
  status = "pending"
  next()
    if status == "pending" → status = "paid"
    else if status == "paid" → status = "shipped"
    // растёт бесконечно при добавлении статусов
```

**Когда:** объект с множеством состояний и разным поведением в каждом.

### Template Method — каркас алгоритма с переопределяемыми шагами
```
// ✅ DO: базовый класс определяет каркас, шаги переопределяются
abstract class DataImporter
  import(source)          // template method
    data = this.read(source)
    validated = this.validate(data)
    transformed = this.transform(validated)
    this.save(transformed)

  abstract read(source) → RawData
  abstract validate(data) → ValidData
  abstract transform(data) → FinalData
  save(data) → db.insert(data)  // общая реализация

class CsvImporter extends DataImporter
  read(source) → parseCsv(source)
  validate(data) → validateCsvRows(data)
  transform(data) → mapCsvToEntities(data)

class JsonImporter extends DataImporter
  read(source) → parseJson(source)
  validate(data) → validateJsonSchema(data)
  transform(data) → mapJsonToEntities(data)
```

**Когда:** одинаковый каркас алгоритма, разные детали реализации.

---

## 4. Architectural Patterns

### Repository — изоляция доступа к данным
```
// ✅ DO: репозиторий инкапсулирует работу с хранилищем
interface UserRepository
  findById(id) → User | null
  findByEmail(email) → User | null
  save(user) → User
  delete(id) → void

class PostgresUserRepository implements UserRepository
  findById(id) → db.query("SELECT ... WHERE id = $1", [id])

class MongoUserRepository implements UserRepository
  findById(id) → collection.findOne({ _id: id })

// Бизнес-логика не знает про SQL/Mongo
class UserService
  constructor(repo: UserRepository)
  getUser(id) → this.repo.findById(id)
```

```
// ❌ DON'T: SQL в бизнес-логике
class UserService
  getUser(id)
    result = db.query("SELECT * FROM users WHERE id = $1", [id])
    // Привязан к PostgreSQL, нельзя тестировать без БД
```

### Service Layer — бизнес-логика не в контроллерах
```
// ✅ DO: контроллер → сервис → репозиторий
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

// ❌ DON'T: бизнес-логика в контроллере
class OrderController
  handleCreateOrder(req)
    db.query("INSERT INTO orders ...")    // SQL в контроллере
    stripe.charge(...)                     // платёж в контроллере
    sendEmail(...)                         // и email тоже
```

### Dependency Injection (DI)
```
// ✅ DO: зависимости передаются извне
class Application
  start()
    db = new PostgresConnection(config.db)
    userRepo = new PostgresUserRepository(db)
    emailService = new SmtpEmailService(config.smtp)
    userService = new UserService(userRepo, emailService)
    controller = new UserController(userService)
    server.register(controller)

// Каждый компонент принимает зависимости через конструктор
// Легко тестировать: подставляем mock-репозиторий
```

```
// ❌ DON'T: компоненты сами создают зависимости
class UserService
  repo = new PostgresUserRepository(new PostgresConnection("hardcoded"))
  email = new SmtpEmailService("smtp://hardcoded")
  // Нельзя протестировать без реальных PostgreSQL и SMTP
```

### Event-Driven — реакция на события
```
// ✅ DO: слабая связанность через события
// Сервис создаёт заказ и публикует событие
class OrderService
  createOrder(data)
    order = Order.create(data)
    orderRepo.save(order)
    eventBus.publish("order.created", { orderId: order.id })

// Независимые обработчики подписаны на событие
class InventoryHandler
  on("order.created") → reserveItems(event.orderId)

class NotificationHandler
  on("order.created") → sendConfirmation(event.orderId)

class AnalyticsHandler
  on("order.created") → trackConversion(event.orderId)

// Добавляем новый обработчик → ни одна строка в OrderService не меняется
```

```
// ❌ DON'T: OrderService знает обо всех зависимых компонентах
class OrderService
  createOrder(data)
    order = Order.create(data)
    orderRepo.save(order)
    inventoryService.reserve(order)      // жёсткая связь
    notificationService.send(order)       // жёсткая связь
    analyticsService.track(order)         // жёсткая связь
```

### CQRS — Command Query Responsibility Segregation
```
// ✅ DO: разные модели для записи и чтения
// Command side — нормализованная модель; бизнес-правила
class CreateOrderCommand
  execute(data)
    order = Order.create(data)
    orderRepo.save(order)
    eventBus.publish("order.created", order)

// Query side — денормализованная модель; оптимизирована под чтение
class OrderQueryService
  getOrderSummary(id) →
    readDb.query("SELECT ... FROM order_summaries WHERE id = $1", [id])

  getOrdersByUser(userId, page) →
    readDb.query("SELECT ... FROM user_orders_view WHERE user_id = $1 LIMIT ...", [userId])

// Записи обновляют read-модель через events
on("order.created") → updateOrderSummaryView(event)
```

**Когда:** паттерны чтения и записи сильно различаются; высокая нагрузка на чтение; нужна денормализация для быстрых запросов.

---

## 5. Microservices Patterns

### Saga — распределённые транзакции через компенсации
```
// ✅ DO: каждый шаг имеет компенсацию (откат)
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
        // Откатываем все выполненные шаги в обратном порядке
        for s in completed.reverse()
          s.compensate(orderData)
        throw SagaFailedError(error)
```

**Когда:** транзакция охватывает несколько сервисов; нельзя использовать распределённый 2PC.

### Circuit Breaker — защита от каскадных сбоев
```
// ✅ DO: Circuit Breaker перед вызовом внешнего сервиса
class CircuitBreaker
  state = CLOSED        // нормальная работа
  failureCount = 0
  threshold = 5
  resetTimeout = 30s

  call(fn)
    if state == OPEN
      if elapsed > resetTimeout → state = HALF_OPEN
      else → throw ServiceUnavailableError   // не шлём запрос

    try
      result = fn()
      if state == HALF_OPEN → state = CLOSED; failureCount = 0
      return result
    catch error
      failureCount++
      if failureCount >= threshold → state = OPEN; startTimer()
      throw error

// Использование
breaker = new CircuitBreaker()
userData = breaker.call(() => externalUserApi.getUser(id))
```

**Когда:** зависимость от внешнего сервиса, который может упасть; предотвращение каскадного отказа.

### Mediator — центральный координатор взаимодействий
```
// ✅ DO: компоненты общаются через медиатор, не напрямую
class OrderMediator
  handlers = Map<string, Handler>

  register(commandType, handler)
  send(command)
    handler = this.handlers.get(command.type)
    return handler.handle(command)

// Регистрация
mediator.register("CreateOrder", new CreateOrderHandler(orderRepo, inventory))
mediator.register("CancelOrder", new CancelOrderHandler(orderRepo, payment))

// Вызов — контроллер не знает про конкретные обработчики
class OrderController
  handleCreate(req) → mediator.send(new CreateOrderCommand(req.body))
  handleCancel(req) → mediator.send(new CancelOrderCommand(req.params.id))
```

**Когда:** много взаимодействующих компонентов; нужно централизовать координацию и убрать прямые зависимости.

---

## 6. Правило выбора

| Проблема | Паттерн | Пример |
|----------|---------|--------|
| Несколько вариантов алгоритма | Strategy | Алгоритмы сортировки, расчёта скидок |
| Реакция на изменения | Observer / Event-Driven | Уведомления, аудит, аналитика |
| Создание объектов по условию | Factory Method | Нотификации: email/sms/push |
| Интеграция с чужим API | Adapter | Обёртка Stripe/PayPal |
| Сложная подсистема | Facade | Оформление заказа (inventory + payment + shipping) |
| Комбинации поведений | Decorator | Кэширование + шифрование + логирование |
| Undo/redo, очереди | Command | Текстовый редактор, batch-операции |
| Множество состояний объекта | State | Workflow заказа, задачи |
| Одинаковый каркас, разные детали | Template Method | Импорт CSV/JSON/XML |
| Изоляция хранилища | Repository | Работа с БД без SQL в бизнес-логике |
| Бизнес-логика не в контроллерах | Service Layer | REST API |
| Слабая связь компонентов | DI | Инъекция зависимостей через конструктор |
| Разные модели чтения/записи | CQRS | Dashboard + admin panel |
| Распределённые транзакции | Saga | Заказ: inventory → payment → shipping |
| Защита от каскадных сбоев | Circuit Breaker | Внешние API |
| Координация компонентов | Mediator | Request → Handler routing |

---

## См. также
- `architecture-doc` → где фиксировать выбранные паттерны
- `architecture-compliance-review` → проверка соответствия архитектуре
- `adr-log` → фиксация решений по выбору паттернов
- `code-review-checklist` → проверка реализации паттернов
