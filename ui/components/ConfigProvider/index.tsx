import React, { createContext, ReactNode, useContext } from 'react'

export interface Config {
  baseUrl: string
}

const ConfigContext = createContext<Config>({
  baseUrl: 'http://localhost',
})

interface ConfigProviderProps extends Config {
  children: ReactNode
}

export function ConfigProvider(props: ConfigProviderProps) {
  const { children, ...configValue } = props
  return <ConfigContext.Provider value={configValue}>{children}</ConfigContext.Provider>
}

export function useConfig() {
  return useContext(ConfigContext)
}
