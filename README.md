# `use-reload`

**A simple hook to restart you React application - without refreshing the page**

## Why

At some point, **every application will face an unexpected error**.
Usually you will show the user a nice message with a funny image, but then what? The user is stuck - only option is to **refresh the entire page!**

`use-reload` allows you to perform a **"controlled refresh"** - a complete unmount and remount of the desired part of your application. Reset everything and start over - no need to actually refresh.

By remounting, it will reset all React state and hooks, and force-retrigger any side-effect that is part of the initial rendering process, including data-fetching, `useEffect`, `componentDidMount`, etc, so everything that happens when the app is first mounted, will happen again.

## Usage

Simple usage:

call `useReload` to get a callback to reload everything inside `<Reloadable>`

```jsx
const MyButton = () => {
  const { reload } = useRelaod()
  return <button onClick={reload}>Press Here to Remount the App!</button>
}

const App = () => (
  <Reloadable>
    <div>
      ...
      <MyButton />
      ...
    </div>
  </Reloadable>
)
```

Alternatively, you can use the `reloadable` HOC to make a component reloadable:

```jsx
const AppComp = () => (
  <div>
    ...
    <MyButton />
    ...
  </div>
)
const App = reloadable(AppComp)
```

don't like hooks? use withReload instead:

```jsx
class MyButton extends React.Component {
  render() {
    return (
      <WithReload>
        {reload => (
          <button onClick={reload}>
            Press Here to Remount the App!
          </button>
        )}
      </WithReload>
    )
  }
}

```

## Installation

- ```
  npm install use-reload
  ```
- ```
  yarn add use-reload
  ```

## How does it work
`use-reload` takes advantage of how [React reconcilliation](https://reactjs.org/docs/reconciliation.html#keys) treats the `key` attribute. 

**short version**:

when `relooad()` is triggered, the `key` prop is changed, causing React to  remount the reloadable component.

**long version**

When a component is rendered for the second time, the reconnciliation mechannism compares the resulting element tree against the one already mounted. If the new root element has the same type as the old one, React will only *update* the existing component instance and it will not be unmounted.

However, if two elements have a different `key` element, React will consider them to be different, even if they are otherwise identical. Since the elements are considered different, React unmounts and destroys the old element (and all of it's subtree), and initializes the *new* subtree, with fresh state, hooks, and lifecycle.