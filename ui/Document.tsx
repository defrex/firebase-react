import { NormalizedCacheObject } from 'apollo-boost'
import React from 'react'
import { Config } from './components/ConfigProvider'

export interface AppState {
  APOLLO_STATE: NormalizedCacheObject
  CONFIG: Config
}

interface DocumentProps {
  html: string
  scripts?: string[]
  css?: string
  state: AppState
  head: JSX.Element[]
}

export function Document({ html, css, scripts, state, head }: DocumentProps) {
  return (
    <html lang='en-US'>
      <head>
        <link rel='manifest' href='/manifest.json' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        {head}
        {scripts &&
          scripts.map(
            (src, index) => src && <link rel='preload' href={src} as='script' key={index} />,
          )}
        {css ? <style id='styles'>{css}</style> : null}
      </head>
      <body>
        <div id='app' dangerouslySetInnerHTML={{ __html: html }} />

        <script
          dangerouslySetInnerHTML={{
            __html: `window.APP_STATE = { APOLLO_STATE:${JSON.stringify(state.APOLLO_STATE).replace(
              /</g,
              '\\u003c',
            )}, CONFIG: ${JSON.stringify(state.CONFIG)} };`,
          }}
        />
        {scripts && scripts.map((src, index) => <script key={index} src={src} async />)}
      </body>
    </html>
  )
}
