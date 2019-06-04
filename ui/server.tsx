import { isRedirect, ServerLocation } from '@reach/router'
import { Request, Response } from 'express'
import {
  ApolloProvider,
  getMarkupFromTree
} from 'react-apollo-hooks'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { App } from 'ui/App'
import { Document } from 'ui/Document'
import initClient from 'ui/withApollo';

export default async function(req: Request, res: Response) {
  let html = ''

  const client = initClient({})
  try {
    html = await getMarkupFromTree({
      renderFunction: renderToString,
      tree: (
        <ApolloProvider client={client}>
            <ServerLocation url={req.url}>
              <App />
            </ServerLocation>
        </ApolloProvider>
      ),
    });
  } catch (error) {
    if (isRedirect(error)) {
      res.redirect(error.uri)
    } else {
      throw error
    }
  }

  const state = client.cache.extract()

  const document = renderToString(<Document html={html} state={state} />)
  res.status(200).send(document)
}
