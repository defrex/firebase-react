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
          scripts.map(({ src }, index) => src && <link rel='preload' href={src} as='script' />)}
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
        {scripts &&
          scripts.map(({ src, content }, index) => (
            <script
              key={index}
              src={src}
              dangerouslySetInnerHTML={content ? { __html: content } : undefined}
              async
            />
          ))}
      </body>
    </html>
  )
}
