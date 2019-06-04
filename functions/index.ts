import { https } from 'firebase-functions'
import { hotUiServer } from './ui'
<<<<<<< HEAD
import { apiServer } from './api'
=======
import { APIServer } from './api'
>>>>>>> feat: Add API Function.

export const hello = https.onRequest((req, res) => {
  res.send('Hello Functions')
})

const uiServerPromise = hotUiServer()
export const ui = https.onRequest(async (req, res) => {
  const uiServer = await uiServerPromise
  return uiServer(req, res)
})

<<<<<<< HEAD
export const api = https.onRequest(apiServer)
=======
export const api = https.onRequest(APIServer)
>>>>>>> feat: Add API Function.
