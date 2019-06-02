import { https } from 'firebase-functions'
import uiHandler from './ui'

export const hello = https.onRequest((req, res) => {
  res.send('Hello Functions')
})

export const ui = https.onRequest(uiHandler)
