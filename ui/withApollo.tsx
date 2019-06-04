import { ApolloClient, InMemoryCache, HttpLink, NormalizedCacheObject } from 'apollo-boost/lib/index'

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null

export const create = (initialState?: NormalizedCacheObject): ApolloClient<NormalizedCacheObject> => {
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: new HttpLink({
      uri: 'https://us-central1-cloud-computing-5859.cloudfunctions.net/api',
    }),
    cache: new InMemoryCache().restore(initialState || {}),
    defaultOptions: {
      watchQuery: {
        errorPolicy: "all"
      },
      query: {
        errorPolicy: "all"
      }
    }
  })
}

export default (initialState?: NormalizedCacheObject) => {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState)
  }

  return apolloClient
}
