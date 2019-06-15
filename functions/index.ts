import { https } from 'firebase-functions'
import { hotUiServer } from './ui'
import { apiServer } from './api'

export const hello = https.onRequest((req, res) => {
  res.send('Hello Functions')
})

export const ui = https.onRequest(hotUiServer)

export const api = https.onRequest(apiServer)
