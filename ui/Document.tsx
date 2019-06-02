import React from 'react'

export interface Script {
  src?: string
  content?: string
}

interface DocumentProps {
  scripts: Script[]
  html: string
  css?: string
}

export function Document({ html, css, scripts }: DocumentProps) {
  return (
    <html lang='en-US'>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        {css ? <style id='styles'>{css}</style> : null}
      </head>
      <body>
        <div id='app' dangerouslySetInnerHTML={{ __html: html }} />

        {scripts.map(({ src, content }, index) => (
          <script
            key={index}
            src={src}
            dangerouslySetInnerHTML={content ? { __html: content } : undefined}
          />
        ))}
      </body>
    </html>
  )
}
