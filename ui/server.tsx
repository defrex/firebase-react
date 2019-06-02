import { isRedirect, ServerLocation } from '@reach/router'
import { Request, Response } from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { App } from 'ui/App'
import { Document } from 'ui/Document'

export default function(req: Request, res: Response) {
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

  const document = renderToString(<Document html={html} />)
  res.status(200).send(document)
}
