import chokidar from 'chokidar'
import { Request, Response } from 'express'
import { config } from 'firebase-functions'
import 'isomorphic-unfetch'
import { readJSON } from 'fs-extra'
import { resolve } from 'path'

async function getUiServer() {
  const stf = 'server/server.json'
  const uiManifest = await readJSON(stf)
  const serverFilename = resolve(`${__dirname}/../server/${uiManifest.server}`)
  return import(serverFilename)
}

export async function hotUiServer(req: Request, res: Response) {
  let { uiServer } = await getUiServer()

  if (process.env.NODE_ENV === 'development')
    chokidar
      .watch(`${__dirname}/../server/server.json`, {
        ignoreInitial: true,
        awaitWriteFinish: { stabilityThreshold: 100 },
      })
      .on('all', async () => {
        process.stdout.write('Reloading UI Server...')
        uiServer = (await getUiServer()).uiServer
        process.stdout.write('✅\n')
      })

  return uiServer(
    req,
    res,
    ...Object.entries(config().ui).map(([a, b]) => ({
      [a.replace(/_(\D)/, (a, b) => b.toUpperCase())]: b,
    })),
  )
}
