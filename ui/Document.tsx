import React from 'react'
import { NormalizedCacheObject } from 'apollo-boost'
import { Config } from 'ui/components/ConfigProvider'

export interface Script {
  src?: string
  content?: string
}

export interface AppState {
  APOLLO_STATE: NormalizedCacheObject
  CONFIG: Config
}

interface DocumentProps {
  html: string
  scripts?: Script[]
  css?: string
  state: AppState
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
            __html: `window.APP_STATE = { APOLLO_STATE:${JSON.stringify(state.APOLLO_STATE).replace(
              /</g,
              '\\u003c',
            )}, CONFIG: ${JSON.stringify(state.CONFIG)} };`,
          }}
        />
        <script src={'/ui.js'} />
      </body>
    </html>
  )
}
