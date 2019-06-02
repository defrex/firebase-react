import { https } from 'firebase-functions'
import { hotUiServer } from './ui'

export const hello = https.onRequest((req, res) => {
  res.send('Hello Functions')
})

const uiServerPromise = hotUiServer()
export const ui = https.onRequest(async (req, res) => {
  const uiServer = await uiServerPromise
  return uiServer(req, res)
})
