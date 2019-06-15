import { isRedirect, ServerLocation } from '@reach/router'
import { Request, Response } from 'express'
import React from 'react'
import { ApolloProvider, getMarkupFromTree } from 'react-apollo-hooks'
import { Capture, preloadAll } from 'react-loadable'
import { renderToString } from 'react-dom/server'
import { App } from './App'
import { Config, ConfigProvider } from './components/ConfigProvider'
import { HeadProvider, resetTagID } from './components/HeadProvider'
import { Document } from './Document'
import { initApollo } from './lib/initApollo'
import { readJSON } from 'fs-extra'

export async function uiServer(req: Request, res: Response, config: Config) {
  await preloadAll()
  const clientAssetsFile = 'public/client.json'
  const manifestFile = 'public/parcel-manifest.json'
  const [clientAssets, parcelManifest] = await Promise.all([
    readJSON(clientAssetsFile),
    readJSON(manifestFile) as Promise<{ [key: string]: string }>,
  ])
  const scripts = Object.values(clientAssets).filter(
    (script) => typeof script === 'string',
  ) as string[]
  const client = initApollo({ baseUrl: config.baseUrl })

  resetTagID()

  let head: JSX.Element[] = []

  const app = (
    <ServerLocation url={req.url}>
      <ConfigProvider {...config}>
        <HeadProvider tags={head}>
          <Capture
            report={(moduleName) =>
              Object.entries(parcelManifest).map(([file, script]) =>
                file.replace('/index.tsx', '') === moduleName.replace('ui/', '')
                  ? scripts.push(script)
                  : '',
              )
            }
          >
            <ApolloProvider client={client}>
              <App />
            </ApolloProvider>
          </Capture>
        </HeadProvider>
      </ConfigProvider>
    </ServerLocation>
  )

  let html = ''
  try {
    await getMarkupFromTree({
      renderFunction: renderToString,
      tree: app,
    })
  } catch (error) {
    if (isRedirect(error)) {
      res.redirect(error.uri)
    } else {
      throw error
    }
  }

  const state = client.cache.extract()

  html = renderToString(app)

  const document = renderToString(
    <Document
      html={html}
      state={{ APOLLO_STATE: state, CONFIG: config }}
      scripts={scripts}
      head={head}
    />,
  )

  res.status(200).send(`<!DOCTYPE html>${document}`)
}
