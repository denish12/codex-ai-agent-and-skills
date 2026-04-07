---
name: react-15-3-wix-iframe
description: Legacy development for Wix iFrame apps on React 15.3: class components, lifecycle methods, PropTypes/defaultProps, patterns without hooks. Communication with Wix via iFrame SDK (postMessage, Wix.addEventListener, resizeWindow). ALWAYS use this skill when Wix iFrame, Wix iFrame SDK are mentioned, or when the codebase explicitly uses React 15.3. Do not apply together with react-beast-practices — they are mutually exclusive.
---

# Skill: React 15.3 + Wix iFrame

> ⚠️ This skill is a separate world. Hooks, Suspense, React.memo, `<>` fragments — none of these exist here.
> Always check: React 15.3 or modern React?

**Sections:**
1. [Class components: patterns and lifecycle](#1-class-components)
2. [PropTypes and defaultProps](#2-proptypes-and-defaultprops)
3. [setState: safe patterns](#3-setstate)
4. [Wix iFrame SDK: communication](#4-wix-iframe-sdk)
5. [Error and loading handling](#5-error-and-loading-handling)
6. [DO/DON'T: what is prohibited in React 15.3](#6-what-is-prohibited)

---

## 1. Class components

### ✅ DO: full lifecycle with unmount protection
```jsx
class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      user: null,
      error: null,
    };
    // ✅ Binding in constructor — once, not in render
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  componentDidMount() {
    this._isMounted = true; // ✅ memory leak protection flag
    this.loadUser();
  }

  componentDidUpdate(prevProps) {
    // ✅ Compare props manually, analog to useEffect([userId])
    if (prevProps.userId !== this.props.userId) {
      this.loadUser();
    }
  }

  componentWillUnmount() {
    this._isMounted = false; // ✅ prevent setState after unmount
  }

  loadUser() {
    this.setState({ loading: true, error: null });

    fetchUser(this.props.userId)
      .then(user => {
        if (!this._isMounted) return; // ✅ check before setState
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

### ✅ DO: shouldComponentUpdate for optimization
```jsx
// Analog to React.memo — prevents unnecessary renders
shouldComponentUpdate(nextProps, nextState) {
  return (
    nextProps.userId !== this.props.userId ||
    nextState.user   !== this.state.user   ||
    nextState.loading !== this.state.loading
  );
}
```

### ✅ DO: PureComponent for simple cases
```jsx
// ✅ PureComponent applies shallow compare automatically
class UserCard extends React.PureComponent {
  render() {
    return React.createElement("div", null, this.props.name);
  }
}
```

---

## 2. PropTypes and defaultProps

### ✅ DO: explicit types and defaults for all props
```jsx
// ✅ PropTypes — documentation + runtime warnings in development
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
  onUpdate: function() {}, // ✅ no-op instead of checking if(onUpdate)
  theme: "light",
  config: {
    showAvatar: true,
    maxItems: 10,
  },
};
```

### ❌ DON'T: skip PropTypes for shared components
```jsx
// Bad: without PropTypes it's unclear what the component expects,
// prop errors surface in unexpected places.
```

---

## 3. setState

### ✅ DO: functional setState when new state depends on the current one
```jsx
// ✅ Safe: React may batch updates, the function always receives the actual state
this.setState(function(prevState) {
  return { count: prevState.count + 1 };
});

// ❌ Unsafe: this.state.count might be stale in a batch
this.setState({ count: this.state.count + 1 });
```

### ✅ DO: callback as the second argument when action after update is needed
```jsx
// ✅ callback is invoked AFTER the state is updated and the component rerendered
this.setState({ step: 2 }, function() {
  // this.state.step === 2 is guaranteed
  this.props.onStepChange(this.state.step);
});
```

### ✅ DO: reset state upon key prop change
```jsx
componentDidUpdate(prevProps) {
  if (prevProps.formId !== this.props.formId) {
    // ✅ Reset form when navigating to another record
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

### ✅ DO: initialization and basic communication
```jsx
// ✅ Wix SDK is available globally via window.Wix
class WixWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = { settings: {}, ready: false };
  }

  componentDidMount() {
    this._isMounted = true;

    // ✅ Listen to events from Wix
    Wix.addEventListener(Wix.Events.SETTINGS_UPDATED, this.handleSettingsUpdate.bind(this));
    Wix.addEventListener(Wix.Events.SITE_PUBLISHED,   this.handlePublish.bind(this));

    // ✅ Fetch initial data
    Wix.getSiteInfo(function(siteInfo) {
      if (!this._isMounted) return;
      this.setState({ siteInfo, ready: true });
    }.bind(this));

    // ✅ Adjust widget height
    this.updateHeight();
  }

  componentWillUnmount() {
    this._isMounted = false;
    // ✅ Remove listeners
    Wix.removeEventListener(Wix.Events.SETTINGS_UPDATED, this.handleSettingsUpdate);
  }

  handleSettingsUpdate(settings) {
    if (!this._isMounted) return;
    this.setState({ settings });
    this.updateHeight();
  }

  handlePublish() {
    // site publication — data can be saved
  }

  updateHeight() {
    // ✅ Notify Wix about the actual iFrame height
    var height = document.body.scrollHeight;
    Wix.resizeWindow(undefined, height);
  }

  render() {
    if (!this.state.ready) return React.createElement("div", null, "Loading…");
    return React.createElement("div", { id: "widget" }, /* content */);
  }
}
```

### ✅ DO: retrieve settings from the editor panel
```jsx
componentDidMount() {
  this._isMounted = true;

  // ✅ Get saved component settings
  Wix.Settings.getExternalId(function(externalId) {
    if (!this._isMounted) return;
    this.setState({ externalId });
  }.bind(this));

  // ✅ Read public data (visible in both editor and live)
  Wix.Data.Public.get("userPreferences", { scope: "COMPONENT" }, function(value) {
    if (!this._isMounted) return;
    this.setState({ preferences: value || {} });
  }.bind(this));
}
```

### ✅ DO: save data from the widget
```jsx
handleSave(data) {
  // ✅ Save component data
  Wix.Data.Public.set(
    "userPreferences",
    data,
    { scope: "COMPONENT" },
    function() {
      // callback after successful save
      this.setState({ saved: true });
    }.bind(this)
  );
}
```

### ✅ DO: navigateTo for transitions within Wix
```jsx
handleNavigation(pageId) {
  Wix.Utils.navigateToSection({
    sectionIdentifier: Wix.Styles.getStyleParams().sectionIdentifier,
    state: pageId,
  });
}
```

### ❌ DON'T: direct DOM manipulations bypassing React
```jsx
// ❌ Bad: React is unaware of these changes → out-of-sync on rerender
document.getElementById("title").innerHTML = this.state.title;

// ✅ Correct: via state → render
this.setState({ title: newTitle });
```

---

## 5. Error and loading handling

### ✅ DO: unified pattern for async operations
```jsx
// ✅ Wrapper for all async calls — prevents duplication
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

// Usage in constructor:
this.loadData = withLoadingState(this, function() {
  return fetchData(self.props.id);
});
```

### ✅ DO: explicit states in render
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

## 6. What is prohibited

| ❌ Prohibited | Appeared in | ✅ Alternative in 15.3 |
|---|---|---|
| `useState`, `useEffect`, any hooks | React 16.8 | `this.state` + lifecycle methods |
| `React.memo` | React 16.6 | `PureComponent` or `shouldComponentUpdate` |
| `React.createContext` / `useContext` | React 16.3 | Props drilling or external state (Redux) |
| `<>...</>` fragments | React 16.2 | `React.DOM.div` or wrapper-container |
| `React.lazy` / `Suspense` | React 16.6 | Manual code splitting via require |
| `getDerivedStateFromProps` | React 16.3 | `componentWillReceiveProps` |
| `getSnapshotBeforeUpdate` | React 16.3 | `componentWillUpdate` |
| `React.forwardRef` | React 16.3 | Pass ref via a custom prop (`inputRef`) |
| `React.createRef()` | React 16.3 | `ref={function(el){ this.inputEl = el; }.bind(this)}` |
| `React.StrictMode` | React 16.3 | — |
| `ReactDOM.createPortal` | React 16 | Direct DOM manipulation + `ReactDOM.render` |

### ✅ DO: ref via callback (React 15.3)
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

### ✅ DO: passing data upwards via callback prop
```jsx
// React 15.3 lacks Context — pass a callback through props
class ChildForm extends React.Component {
  handleChange(field, value) {
    // ✅ Notify parent of the change
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

## See also
- `dev-reference-snippets` → section 10 "Legacy React 15.3" — additional examples
- Do not use `react-beast-practices` or `es2025-beast-practices` in the Wix iFrame context
