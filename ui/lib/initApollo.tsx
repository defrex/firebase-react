import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from 'apollo-boost'

interface InitClientParams {
  baseUrl: string
  initialState?: NormalizedCacheObject
}

export function initApollo({ baseUrl, initialState }: InitClientParams) {
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: new HttpLink({
      uri: `${baseUrl}/api`,
    }),
    cache: new InMemoryCache().restore(initialState || {}),
    defaultOptions: {
      watchQuery: {
        errorPolicy: 'all',
      },
      query: {
        errorPolicy: 'all',
      },
    },
  })
}
