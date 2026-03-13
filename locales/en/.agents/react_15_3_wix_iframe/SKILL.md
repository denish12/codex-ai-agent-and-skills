---
name: react_15_3_wix_iframe
description: Legacy development for Wix iFrame applications on React 15.3: class components, lifecycle methods, PropTypes/defaultProps, patterns without hooks. Communication with Wix via the iFrame SDK (postMessage, Wix.addEventListener, resizeWindow). Use this skill whenever Wix iFrame or the Wix iFrame SDK is mentioned, or when the code base explicitly uses React 15.3. Do not apply together with react_beast_practices ? they are incompatible.
---

# Skill: React 15.3 + Wix iFrame

> ?? This skill is a separate world. Hooks, Suspense, React.memo, fragments `<>` ? none of that here.
> Always check: React 15.3 or modern React?

**Sections:**
1. [Class components: patterns and lifecycle](#1-class components)
2. [PropTypes and defaultProps](#2-proptypes-and-defaultprops)
3. [setState: safe patterns](#3-setstate)
4. [Wix iFrame SDK: communication](#4-wix-iframe-sdk)
5. [Handling errors and loading](#5-error)
6. [DO/DON'T: what is forbidden in React 15.3](#6-what-is-forbidden)

---

## 1. Class components

### ✅ DO: full lifecycle with protection from unmount
```jsx
class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      user: null,
      error: null,
    };
    // ? Binding in the constructor ? one time, not in render
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  componentDidMount() {
    this._isMounted = true; // ✅ flag protection from leaks
    this.loadUser();
  }

  componentDidUpdate(prevProps) {
    // ? Compare props manually, analogue of useEffect([userId])
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

### ✅ DO: shouldComponentUpdate for optimizations
```jsx
// Analogue of React.memo ? prevents extra renders
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
// ✅ PureComponent does shallow compare automatically
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
// ? PropTypes ? documentation + runtime warnings in development
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
  onUpdate: function() {}, // ✅ no-op instead of checks if(onUpdate)
  theme: "light",
  config: {
    showAvatar: true,
    maxItems: 10,
  },
};
```

### ❌ DON'T: skip PropTypes for shared-components
```jsx
// Bad: without PropTypes it is unclear what the component accepts,
// props errors surface in non-obvious places.
```

---

## 3. setState

### ? DO: functional setState when new state depends on current
```jsx
// ? Safe: React may batch updates, the function always receives the current state
this.setState(function(prevState) {
  return { count: prevState.count + 1 };
});

// ? Unsafe: this.state.count may be stale in a batch
this.setState({ count: this.state.count + 1 });
```

### ? DO: callback second argument when an action is needed after updates
```jsx
// ? callback is called after the state update and the component rerender
this.setState({ step: 2 }, function() {
  // this.state.step === 2 guarantee
  this.props.onStepChange(this.state.step);
});
```

### ? DO: reset state when a key prop changes
```jsx
componentDidUpdate(prevProps) {
  if (prevProps.formId !== this.props.formId) {
    // ? Reset forms when moving to another record
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

### ✅ DO: initialization and baseline communication
```jsx
// ✅ Wix SDK available global via window.Wix
class WixWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = { settings: {}, ready: false };
  }

  componentDidMount() {
    this._isMounted = true;

    // ? Listen to events from Wix
    Wix.addEventListener(Wix.Events.SETTINGS_UPDATED, this.handleSettingsUpdate.bind(this));
    Wix.addEventListener(Wix.Events.SITE_PUBLISHED,   this.handlePublish.bind(this));

    // ? Get initial data
    Wix.getSiteInfo(function(siteInfo) {
      if (!this._isMounted) return;
      this.setState({ siteInfo, ready: true });
    }.bind(this));

    // ? Adjust widget height
    this.updateHeight();
  }

  componentWillUnmount() {
    this._isMounted = false;
    // ? Remove listeners
    Wix.removeEventListener(Wix.Events.SETTINGS_UPDATED, this.handleSettingsUpdate);
  }

  handleSettingsUpdate(settings) {
    if (!this._isMounted) return;
    this.setState({ settings });
    this.updateHeight();
  }

  handlePublish() {
    // site publish ? can save data
  }

  updateHeight() {
    // ? Report actual iFrame height to Wix
    var height = document.body.scrollHeight;
    Wix.resizeWindow(undefined, height);
  }

  render() {
    if (!this.state.ready) return React.createElement("div", null, "Loading…");
    return React.createElement("div", { id: "widget" }, /* content */);
  }
}
```

### ? DO: get settings from the editor panel
```jsx
componentDidMount() {
  this._isMounted = true;

  // ✅ We get saved settings component
  Wix.Settings.getExternalId(function(externalId) {
    if (!this._isMounted) return;
    this.setState({ externalId });
  }.bind(this));

  // ? Read public data (visible both in editor and live)
  Wix.Data.Public.get("userPreferences", { scope: "COMPONENT" }, function(value) {
    if (!this._isMounted) return;
    this.setState({ preferences: value || {} });
  }.bind(this));
}
```

### ✅ DO: save data from widget
```jsx
handleSave(data) {
  // ✅ Save data component
  Wix.Data.Public.set(
    "userPreferences",
    data,
    { scope: "COMPONENT" },
    function() {
      // callback after successful saving
      this.setState({ saved: true });
    }.bind(this)
  );
}
```

### ? DO: use navigateTo for navigation inside Wix
```jsx
handleNavigation(pageId) {
  Wix.Utils.navigateToSection({
    sectionIdentifier: Wix.Styles.getStyleParams().sectionIdentifier,
    state: pageId,
  });
}
```

### ? DON'T: direct DOM manipulation bypassing React
```jsx
// ? Bad: React does not know about these changes ? desync on rerender
document.getElementById("title").innerHTML = this.state.title;

// ✅ Correctly: via state → render
this.setState({ title: newTitle });
```

---

## 5. Errors and loading

### ✅ DO: unified pattern for async operations
```jsx
// ? Wrapper for all async calls ? removes duplication
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

## 6. What cannot

| ? Cannot | Appeared in | ? Alternative in 15.3 |
|---|---|---|
| `useState`, `useEffect`, any hooks | React 16.8 | `this.state` + lifecycle method |
| `React.memo` | React 16.6 | `PureComponent` or `shouldComponentUpdate` |
| `React.createContext` / `useContext` | React 16.3 | Props drilling or store state (Redux) |
| `<>...</>` fragments | React 16.2 | `React.DOM.div` or wrapper |
| `React.lazy` / `Suspense` | React 16.6 | Manual code splitting via require |
| `getDerivedStateFromProps` | React 16.3 | `componentWillReceiveProps` |
| `getSnapshotBeforeUpdate` | React 16.3 | `componentWillUpdate` |
| `React.forwardRef` | React 16.3 | Pass ref via regular prop (`inputRef`) |
| `React.createRef()` | React 16.3 | `ref={function(el){ this.inputEl = el; }.bind(this)}` |
| `React.StrictMode` | React 16.3 | — |
| `ReactDOM.createPortal` | React 16 | direct work with DOM + `ReactDOM.render` |

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

### ✅ DO: handoff data up via callback prop
```jsx
// In React 15.3 there is no Context ? pass callback via props
class ChildForm extends React.Component {
  handleChange(field, value) {
    // ? Report the change to the parent
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
- `dev_reference_snippets` → section 10 «Legacy React 15.3» — additional examples
- Not use `react_beast_practices` or `es2025_beast_practices` in Wix iFrame context
