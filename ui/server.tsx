import { isRedirect, ServerLocation } from '@reach/router'
import { Request, Response } from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { getMarkupFromTree, ApolloProvider } from 'react-apollo-hooks'
import { App } from 'ui/App'
import { Config, ConfigProvider } from 'ui/components/ConfigProvider'
import { Document } from 'ui/Document'
import { initApollo } from 'ui/lib/initApollo'
export default async function(req: Request, res: Response, config: Config) {
  let html = ''
  const assetPaths = '../public/assets.json'
  const routes = (await import(assetPaths)).default as { client: string }
  const scripts = Object.entries(routes).map(([, src]) => ({
    src,
  }))
  const client = initApollo({ baseUrl: config.baseUrl })

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
    <Document html={html} state={{ APOLLO_STATE: state, CONFIG: config }} scripts={scripts} />,
  )
  res.status(200).send(document)
}
