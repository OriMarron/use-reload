import * as React from 'react'

interface Reload {
  reload(): void
}

const ReloadContext = React.createContext<Reload | null>(null)

export const Reloadable: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [key, setKey] = React.useState<number>(0)
  const reload = () => setKey(prevKey => prevKey++)
  return (
    <ReloadContext.Provider value={{ reload }}>
      <React.Fragment key={key}>{children}</React.Fragment>
    </ReloadContext.Provider>
  )
}

export const useRelaod = (): Reload => {
  const value = React.useContext(ReloadContext)
  if (value) {
    return value
  }

  return {
    reload: () => {
      throw Error('to use useRelaod you must be rendered under a <Reloadable> component')
    }
  }
}
const MyButton = () => {
  return (
    <WithReload>
      {reload => (
        <button onClick={reload}>
          ---------------------------------------Press Here to Remount the App!
        </button>
      )}
    </WithReload>
  )
}
