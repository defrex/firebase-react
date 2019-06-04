import { https } from 'firebase-functions'
import { hotUiServer } from './ui'
<<<<<<< HEAD
<<<<<<< HEAD
import { apiServer } from './api'
=======
import { APIServer } from './api'
>>>>>>> feat: Add API Function.
=======
import { apiServer } from './api'
>>>>>>> feat: Move all API related files into functions/api.

export const hello = https.onRequest((req, res) => {
  res.send('Hello Functions')
})

const uiServerPromise = hotUiServer()
export const ui = https.onRequest(async (req, res) => {
  const uiServer = await uiServerPromise
  return uiServer(req, res)
})

<<<<<<< HEAD
<<<<<<< HEAD
export const api = https.onRequest(apiServer)
=======
export const api = https.onRequest(APIServer)
>>>>>>> feat: Add API Function.
=======
export const api = https.onRequest(apiServer)
>>>>>>> feat: Move all API related files into functions/api.
