import React, { ReactNode } from 'react'
import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from 'apollo-boost'
import { ApolloProvider as ApolloHookProvider } from 'react-apollo-hooks'
import { useConfig } from '../ConfigProvider'

interface ApolloProviderProps {
  children: ReactNode
  client?: ApolloClient<NormalizedCacheObject>
}

export function ApolloProvider(props: ApolloProviderProps) {
  const { baseUrl } = useConfig()
  const { children } = props
  let client
  if (!props.client)
    client = new ApolloClient({
      connectToDevTools: process.browser,
      ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
      link: new HttpLink({
        uri: `${baseUrl}/api`,
      }),
      cache: new InMemoryCache().restore(window.FB_STATE.APOLLO_STATE),
      defaultOptions: {
        watchQuery: {
          errorPolicy: 'all',
        },
        query: {
          errorPolicy: 'all',
        },
      },
    })
  else client = props.client
  return <ApolloHookProvider client={client}>{children}</ApolloHookProvider>
}
