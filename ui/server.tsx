import { isRedirect, ServerLocation } from '@reach/router'
import { Request, Response } from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { getMarkupFromTree } from 'react-apollo-hooks'
import { App } from 'ui/App'
import { Config, ConfigProvider } from 'ui/components/ConfigProvider'
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost'
import { Document } from 'ui/Document'
import { ApolloProvider } from 'ui/components/ApolloProvider'

export default async function(req: Request, res: Response, config: Config) {
  let html = ''

  const client = new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: new HttpLink({
      uri: `${config.baseUrl}/api`,
    }),
    cache: new InMemoryCache().restore({}),
    defaultOptions: {
      watchQuery: {
        errorPolicy: 'all',
      },
      query: {
        errorPolicy: 'all',
      },
    },
  })

  try {
    html = await getMarkupFromTree({
      renderFunction: renderToString,
      tree: (
        <ServerLocation url={req.url}>
          <ConfigProvider {...config}>
            <ApolloProvider client={client}>
              <App />
            </ApolloProvider>
          </ConfigProvider>
        </ServerLocation>
      ),
    })
  } catch (error) {
    if (isRedirect(error)) {
      res.redirect(error.uri)
    } else {
      throw error
    }
  }

  const state = client.cache.extract()

  const document = renderToString(
    <Document html={html} state={{ APOLLO_STATE: state, CONFIG: config }} />,
  )
  res.status(200).send(document)
}
