import { https } from 'firebase-functions'
import { hotUiServer } from './ui'
import { APIServer } from './api'

export const hello = https.onRequest((req, res) => {
  res.send('Hello Functions')
})

const uiServerPromise = hotUiServer()
export const ui = https.onRequest(async (req, res) => {
  const uiServer = await uiServerPromise
  return uiServer(req, res)
})

export const api = https.onRequest(APIServer)
