import { isRedirect, ServerLocation } from '@reach/router'
import { Request, Response } from 'express'
import { readFileSync } from 'fs'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { App } from 'ui/App'
import { Config, ConfigProvider } from 'ui/components/ConfigProvider'
import { Document } from 'ui/Document'

export default function(req: Request, res: Response, config: Config) {
  const assets = JSON.parse(readFileSync('../public/client.json', 'utf-8'))

  let html = ''
  try {
    html = renderToString(
      <ServerLocation url={req.url}>
        <ConfigProvider {...config}>
          <App />
        </ConfigProvider>
      </ServerLocation>,
    )
  } catch (error) {
    if (isRedirect(error)) {
      res.redirect(error.uri)
    } else {
      throw error
    }
  }

  const document = renderToString(<Document html={html} scripts={Object.values(assets)} />)
  res.status(200).send(document)
}
