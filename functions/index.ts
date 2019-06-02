import { https } from 'firebase-functions'
// import uiHandler from 'functions/ui'

console.log('functions/index postimport')
export const ui = https.onRequest((req, res) => {
  res.send('Hello Functions')
})
