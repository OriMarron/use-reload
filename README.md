# `use-reload`

**A simple hook to restart you React application - without refreshing the page**

At some point, **every application will face an unexpected error**.
Usually you will show the user a nice message with a funny image, but then what? The user is stuck - only option is to **refresh the entire page!**

`use-reload` allows you to perform a **"controlled refresh"** - a complete unmount and remount of the desired part of your application. Reset everything and start over - no need to actually refresh.

By remounting, it will reset all React state and hooks, and force-retrigger any side-effect that is part of the initial rendering process, including data-fetching, `useEffect`, `componentDidMount`, etc, so everything that happens when the app is first mounted, will happen again.

## Usage

The most simple usage:
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

Alternatively, you can use the `reloadable` HOC:

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

don't like hooks?
try withReload:

```jsx
const MyButton = () => {
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

```

## Installation

- ```
  npm install use-reload
  ```
- ```
  yarn add use-reload
  ```
