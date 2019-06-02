import chokidar from 'chokidar'
import { Request, Response } from 'express'
import fs from 'fs'
import ora from 'ora'
import { resolve } from 'path'
import requireFromString from 'require-from-string'
import { promisify } from 'util'

const readFile = promisify(fs.readFile)
const serverFilename = resolve(`${__dirname}/../ui/server.js`)

function defaultImport(obj: any) {
  return obj && obj.__esModule ? obj.default : obj
}

async function getUiServer() {
  const content = await readFile(serverFilename, 'utf-8')
  return defaultImport(requireFromString(content, serverFilename))
}

export async function hotUiServer() {
  let uiServer = await getUiServer()

  if (process.env.NODE_ENV === 'development')
    chokidar
      .watch(serverFilename, {
        ignoreInitial: true,
        awaitWriteFinish: { stabilityThreshold: 100 },
      })
      .on('all', async () => {
        const spinner = ora('Updating ServerUi ')
        spinner.start()
        try {
          uiServer = await getUiServer()
        } catch (e) {
          spinner.fail()
          console.error(e)
          return
        }
        spinner.succeed()
      })

  return (req: Request, res: Response) => uiServer(req, res)
}
