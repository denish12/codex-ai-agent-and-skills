---
name: react-15-3-wix-iframe
description: Legacy-разработка для Wix iFrame приложений на React 15.3: класс-компоненты, lifecycle методы, PropTypes/defaultProps, паттерны без hooks. Коммуникация с Wix через iFrame SDK (postMessage, Wix.addEventListener, resizeWindow). Используй этот скилл ВСЕГДА когда упоминается Wix iFrame, Wix iFrame SDK, или когда кодовая база явно использует React 15.3. Не применять вместе с react-beast-practices — они несовместимы.
---

# Skill: React 15.3 + Wix iFrame

> ⚠️ Этот скилл — отдельный мир. Hooks, Suspense, React.memo, фрагменты `<>` — всего этого нет.
> Всегда проверяй: React 15.3 или современный React?

**Разделы:**
1. [Класс-компоненты: паттерны и lifecycle](#1-класс-компоненты)
2. [PropTypes и defaultProps](#2-proptypes-и-defaultprops)
3. [setState: безопасные паттерны](#3-setstate)
4. [Wix iFrame SDK: коммуникация](#4-wix-iframe-sdk)
5. [Обработка ошибок и загрузки](#5-ошибки-и-загрузка)
6. [DO/DON'T: что нельзя в React 15.3](#6-чего-нельзя)

---

## 1. Класс-компоненты

### ✅ DO: полный lifecycle с защитой от анмаунта
```jsx
class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      user: null,
      error: null,
    };
    // ✅ Биндинг в конструкторе — один раз, не в render
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  componentDidMount() {
    this._isMounted = true; // ✅ флаг защиты от утечки
    this.loadUser();
  }

  componentDidUpdate(prevProps) {
    // ✅ Сравнивай пропсы вручную, аналог useEffect([userId])
    if (prevProps.userId !== this.props.userId) {
      this.loadUser();
    }
  }

  componentWillUnmount() {
    this._isMounted = false; // ✅ предотвращаем setState после анмаунта
  }

  loadUser() {
    this.setState({ loading: true, error: null });

    fetchUser(this.props.userId)
      .then(user => {
        if (!this._isMounted) return; // ✅ проверка перед setState
        this.setState({ loading: false, user });
      })
      .catch(err => {
        if (!this._isMounted) return;
        this.setState({ loading: false, error: err.message });
      });
  }

  handleRefresh() {
    this.loadUser();
  }

  render() {
    const { loading, user, error } = this.state;

    if (loading) return React.createElement("div", null, "Loading…");
    if (error) return React.createElement(
      "div", { role: "alert" },
      error,
      React.createElement("button", { onClick: this.handleRefresh }, "Retry")
    );

    return React.createElement(
      "div", { className: "profile" },
      React.createElement("h1", null, user.name),
      React.createElement("p", null, user.email)
    );
  }
}
```

### ✅ DO: shouldComponentUpdate для оптимизации
```jsx
// Аналог React.memo — предотвращает лишние рендеры
shouldComponentUpdate(nextProps, nextState) {
  return (
    nextProps.userId !== this.props.userId ||
    nextState.user   !== this.state.user   ||
    nextState.loading !== this.state.loading
  );
}
```

### ✅ DO: PureComponent для простых случаев
```jsx
// ✅ PureComponent делает shallow compare автоматически
class UserCard extends React.PureComponent {
  render() {
    return React.createElement("div", null, this.props.name);
  }
}
```

---

## 2. PropTypes и defaultProps

### ✅ DO: явные типы и дефолты для всех пропсов
```jsx
// ✅ PropTypes — документация + runtime-предупреждения в development
UserProfile.propTypes = {
  userId:   React.PropTypes.string.isRequired,
  onUpdate: React.PropTypes.func,
  theme:    React.PropTypes.oneOf(["light", "dark"]),
  config:   React.PropTypes.shape({
    showAvatar: React.PropTypes.bool,
    maxItems:   React.PropTypes.number,
  }),
};

UserProfile.defaultProps = {
  onUpdate: function() {}, // ✅ no-op вместо проверки if(onUpdate)
  theme: "light",
  config: {
    showAvatar: true,
    maxItems: 10,
  },
};
```

### ❌ DON'T: пропускать PropTypes для shared-компонентов
```jsx
// Плохо: без PropTypes неясно что принимает компонент,
// ошибки пропсов всплывают в неочевидных местах.
```

---

## 3. setState

### ✅ DO: функциональный setState когда новое состояние зависит от текущего
```jsx
// ✅ Безопасно: React может батчить обновления, функция всегда получает актуальный state
this.setState(function(prevState) {
  return { count: prevState.count + 1 };
});

// ❌ Небезопасно: this.state.count может быть устаревшим в батче
this.setState({ count: this.state.count + 1 });
```

### ✅ DO: callback второй аргумент когда нужно действие после обновления
```jsx
// ✅ callback вызывается ПОСЛЕ того как state обновлён и компонент перерисован
this.setState({ step: 2 }, function() {
  // this.state.step === 2 гарантировано
  this.props.onStepChange(this.state.step);
});
```

### ✅ DO: сбрасывать состояние при смене ключевого пропса
```jsx
componentDidUpdate(prevProps) {
  if (prevProps.formId !== this.props.formId) {
    // ✅ Сброс формы при переходе к другой записи
    this.setState({
      values: this.getInitialValues(),
      errors: {},
      dirty: false,
    });
  }
}
```

---

## 4. Wix iFrame SDK

### ✅ DO: инициализация и базовая коммуникация
```jsx
// ✅ Wix SDK доступен глобально через window.Wix
class WixWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = { settings: {}, ready: false };
  }

  componentDidMount() {
    this._isMounted = true;

    // ✅ Слушаем события от Wix
    Wix.addEventListener(Wix.Events.SETTINGS_UPDATED, this.handleSettingsUpdate.bind(this));
    Wix.addEventListener(Wix.Events.SITE_PUBLISHED,   this.handlePublish.bind(this));

    // ✅ Получаем начальные данные
    Wix.getSiteInfo(function(siteInfo) {
      if (!this._isMounted) return;
      this.setState({ siteInfo, ready: true });
    }.bind(this));

    // ✅ Подстраиваем высоту виджета
    this.updateHeight();
  }

  componentWillUnmount() {
    this._isMounted = false;
    // ✅ Убираем слушатели
    Wix.removeEventListener(Wix.Events.SETTINGS_UPDATED, this.handleSettingsUpdate);
  }

  handleSettingsUpdate(settings) {
    if (!this._isMounted) return;
    this.setState({ settings });
    this.updateHeight();
  }

  handlePublish() {
    // публикация сайта — можно сохранить данные
  }

  updateHeight() {
    // ✅ Сообщаем Wix актуальную высоту iFrame
    var height = document.body.scrollHeight;
    Wix.resizeWindow(undefined, height);
  }

  render() {
    if (!this.state.ready) return React.createElement("div", null, "Loading…");
    return React.createElement("div", { id: "widget" }, /* контент */);
  }
}
```

### ✅ DO: получить настройки из панели редактора
```jsx
componentDidMount() {
  this._isMounted = true;

  // ✅ Получаем сохранённые настройки компонента
  Wix.Settings.getExternalId(function(externalId) {
    if (!this._isMounted) return;
    this.setState({ externalId });
  }.bind(this));

  // ✅ Читаем публичные данные (видны и в editor, и в live)
  Wix.Data.Public.get("userPreferences", { scope: "COMPONENT" }, function(value) {
    if (!this._isMounted) return;
    this.setState({ preferences: value || {} });
  }.bind(this));
}
```

### ✅ DO: сохранить данные из виджета
```jsx
handleSave(data) {
  // ✅ Сохраняем данные компонента
  Wix.Data.Public.set(
    "userPreferences",
    data,
    { scope: "COMPONENT" },
    function() {
      // callback после успешного сохранения
      this.setState({ saved: true });
    }.bind(this)
  );
}
```

### ✅ DO: navigateTo для переходов внутри Wix
```jsx
handleNavigation(pageId) {
  Wix.Utils.navigateToSection({
    sectionIdentifier: Wix.Styles.getStyleParams().sectionIdentifier,
    state: pageId,
  });
}
```

### ❌ DON'T: прямые DOM-манипуляции минуя React
```jsx
// ❌ Плохо: React не знает об этих изменениях → рассинхрон при ре-рендере
document.getElementById("title").innerHTML = this.state.title;

// ✅ Правильно: через state → render
this.setState({ title: newTitle });
```

---

## 5. Ошибки и загрузка

### ✅ DO: единый паттерн для async операций
```jsx
// ✅ Обёртка для всех async вызовов — исключает дублирование
function withLoadingState(component, asyncFn) {
  return function() {
    var self = component;
    self.setState({ loading: true, error: null });
    asyncFn()
      .then(function(result) {
        if (!self._isMounted) return;
        self.setState({ loading: false, data: result });
      })
      .catch(function(err) {
        if (!self._isMounted) return;
        self.setState({ loading: false, error: err.message || "Unknown error" });
      });
  };
}

// Использование в конструкторе:
this.loadData = withLoadingState(this, function() {
  return fetchData(self.props.id);
});
```

### ✅ DO: явные состояния в render
```jsx
render() {
  var state = this.state;

  if (state.loading) {
    return React.createElement("div", { className: "loader" }, "Loading…");
  }

  if (state.error) {
    return React.createElement(
      "div", { className: "error", role: "alert" },
      state.error,
      React.createElement("button", { onClick: this.handleRetry }, "Try again")
    );
  }

  if (!state.data) {
    return React.createElement("div", { className: "empty" }, "No data yet");
  }

  return this.renderContent(state.data);
}
```

---

## 6. Чего нельзя

| ❌ Нельзя | Появилось в | ✅ Альтернатива в 15.3 |
|---|---|---|
| `useState`, `useEffect`, любые hooks | React 16.8 | `this.state` + lifecycle методы |
| `React.memo` | React 16.6 | `PureComponent` или `shouldComponentUpdate` |
| `React.createContext` / `useContext` | React 16.3 | Props drilling или сторонний state (Redux) |
| `<>...</>` фрагменты | React 16.2 | `React.DOM.div` или обёртка-контейнер |
| `React.lazy` / `Suspense` | React 16.6 | Ручной code splitting через require |
| `getDerivedStateFromProps` | React 16.3 | `componentWillReceiveProps` |
| `getSnapshotBeforeUpdate` | React 16.3 | `componentWillUpdate` |
| `React.forwardRef` | React 16.3 | Передавать ref через обычный prop (`inputRef`) |
| `React.createRef()` | React 16.3 | `ref={function(el){ this.inputEl = el; }.bind(this)}` |
| `React.StrictMode` | React 16.3 | — |
| `ReactDOM.createPortal` | React 16 | Прямая работа с DOM + `ReactDOM.render` |

### ✅ DO: ref через callback (React 15.3)
```jsx
class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.focusInput = this.focusInput.bind(this);
  }

  focusInput() {
    if (this.inputEl) this.inputEl.focus();
  }

  render() {
    return React.createElement("input", {
      ref: function(el) { this.inputEl = el; }.bind(this), // ✅ callback ref
      type: "text",
    });
  }
}
```

### ✅ DO: передача данных вверх через callback prop
```jsx
// В React 15.3 нет Context — передаём callback через props
class ChildForm extends React.Component {
  handleChange(field, value) {
    // ✅ Сообщаем родителю об изменении
    this.props.onChange(field, value);
  }

  render() {
    return React.createElement("input", {
      value: this.props.value,
      onChange: function(e) {
        this.handleChange(this.props.field, e.target.value);
      }.bind(this),
    });
  }
}

ChildForm.propTypes = {
  field:    React.PropTypes.string.isRequired,
  value:    React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
};
```

---

## См. также
- `dev-reference-snippets` → раздел 10 «Legacy React 15.3» — дополнительные примеры
- Не используй `react-beast-practices` или `es2025-beast-practices` в Wix iFrame контексте
