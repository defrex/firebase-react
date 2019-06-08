import { AppState } from 'ui/Document'
import workbox from 'workbox-sw'

declare global {
  interface Window {
    APP_STATE: AppState
    workbox: workbox
  }
  /* eslint-disable @typescript-eslint/no-namespace */
  namespace NodeJS {
    interface Process {
      browser: boolean
    }
  }
  /* eslint-enable @typescript-eslint/no-namespace */
}
