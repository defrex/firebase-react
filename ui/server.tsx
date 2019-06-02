import { isRedirect, ServerLocation } from '@reach/router'
import { NextFunction, Request, Response } from 'express'
import React from 'react'
import ReactDOMServer, { renderToString } from 'react-dom/server'
import { App } from 'ui/App'
import { Document, Script } from 'ui/Document'

interface Stats {
  assetsByChunkName: (string | string[])[]
}

export default function getServer({ clientStats }: { clientStats: Stats }) {
  console.log('getServer')
  return function server(req: Request, res: Response, _next: NextFunction) {
    console.log('server start')
    let html = ''
    try {
      html = renderToString(
        <ServerLocation url={req.url}>
          <App />
        </ServerLocation>,
      )
    } catch (error) {
      if (isRedirect(error)) {
        res.redirect(error.uri)
      } else {
        throw error
      }
    }

    const scripts: Script[] = Object.values(clientStats.assetsByChunkName).map((asset) => {
      if (typeof asset !== 'string') {
        asset = asset[0]
      }
      return { src: `/dist/${asset}` }
    })

    res.send(ReactDOMServer.renderToStaticMarkup(<Document html={html} scripts={scripts} />))
    res.end()
    console.log('server end')
  }
}
