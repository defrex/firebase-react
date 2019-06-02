import cookieParser from 'cookie-parser'
import express from 'express'
import morgan from 'morgan'
import { resolve } from 'path'

function absolutePath(path: string) {
  return resolve(`${__dirname}/../../${path}`)
}

const config = {
  environment: process.env.NODE_ENV || 'production',
  port: parseInt(process.env.PORT || '3333'),
}

export default async function ui() {
  const app = express()

  app.use(morgan(config.environment === 'development' ? 'dev' : 'common'))
  app.use(cookieParser())

  if (config.environment === 'development') {
    app.use(express.static(absolutePath('dist/public')))

    const webpack = require('webpack')
    const webpackDevMiddleware = require('webpack-dev-middleware')
    const webpackHotMiddleware = require('webpack-hot-middleware')
    const webpackHotServerMiddleware = require('webpack-hot-server-middleware')
    const webpackConfigs = require(absolutePath('webpack.config.js'))

    const compiler = webpack(webpackConfigs)
    app.use(
      webpackDevMiddleware(compiler, {
        publicPath: '/dist',
        stats: 'minimal',
        serverSideRender: true,
      }),
    )

    const clientCompiler = compiler.compilers.find(
      ({ name }: { name: string }) => name === 'client',
    )
    if (!clientCompiler) {
      throw new Error('Cannon find client compiler')
    }
    app.use(webpackHotMiddleware(clientCompiler))
    app.get('/dist/*', (_req, res) => res.sendStatus(404))

    app.get('*', webpackHotServerMiddleware(compiler, { chunkName: 'server' }))
  } else {
    const serverStats = require(absolutePath('dist/ui/server-stats.json'))
    const clientStats = require(absolutePath('dist/public/client-stats.json'))

    const uiServerPath = absolutePath(
      `dist/ui/${
        typeof serverStats.assetsByChunkName.server === 'string'
          ? serverStats.assetsByChunkName.server
          : serverStats.assetsByChunkName.server[0]
      }`,
    )
    console.log('uiServerPath', uiServerPath)
    const uiServer = require(uiServerPath).default

    app.get('*', uiServer({ clientStats }))
  }

  return app
}
