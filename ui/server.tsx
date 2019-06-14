import { isRedirect, ServerLocation } from '@reach/router'
import { Request, Response } from 'express'
import React from 'react'
import { ApolloProvider, getMarkupFromTree } from 'react-apollo-hooks'
import { Capture } from 'react-loadable'
import { renderToString } from 'react-dom/server'
import { App } from 'ui/App'
import { Config, ConfigProvider } from 'ui/components/ConfigProvider'
import { HeadProvider, resetTagID } from 'ui/components/HeadProvider'
import { Document } from 'ui/Document'
import { initApollo } from 'ui/lib/initApollo'

export async function uiServer(req: Request, res: Response, config: Config) {
  const clientAssetsFile = './client.json'
  const manifestFile = './parcel-manifest.json'
  const [clientAssets, parcelManifest] = await Promise.all([
    require(clientAssetsFile),
    require(manifestFile) as Promise<{ [key: string]: string }>,
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
          <ApolloProvider client={client}>
            <Capture
              report={(moduleName) =>
                Object.entries(parcelManifest).map(([file, script]) =>
                  file.replace('/index.tsx', '') === moduleName.replace('ui/', '')
                    ? scripts.push(script)
                    : '',
                )
              }
            >
              <App />
            </Capture>
          </ApolloProvider>
        </HeadProvider>
      </ConfigProvider>
    </ServerLocation>
  )

  let html = ''
  try {
    html = await getMarkupFromTree({
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
