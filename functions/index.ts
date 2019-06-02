import functions from 'firebase-functions'
import uiHandler from 'functions/ui'

export const ui = functions.https.onRequest(uiHandler)
