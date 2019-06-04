import React from 'react'
import { NormalizedCacheObject } from 'apollo-boost'

export interface Script {
  src?: string
  content?: string
}

interface DocumentProps {
  html: string
  scripts?: Script[]
  css?: string
  state: NormalizedCacheObject
}

export function Document({ html, css, scripts, state }: DocumentProps) {
  return (
    <html lang='en-US'>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        {css ? <style id='styles'>{css}</style> : null}
      </head>
      <body>
        <div id='app' dangerouslySetInnerHTML={{ __html: html }} />

        {scripts &&
          scripts.map(({ src, content }, index) => (
            <script
              key={index}
              src={src}
              dangerouslySetInnerHTML={content ? { __html: content } : undefined}
            />
          ))}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(/</g, '\\u003c')};`,
          }}
        />
        <script src={'/ui.js'} async />
      </body>
    </html>
  )
}
