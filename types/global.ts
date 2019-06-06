import { AppState } from 'ui/Document'

declare global {
  interface Window {
    APP_STATE: AppState
  }
  /* eslint-disable @typescript-eslint/no-namespace */
  namespace NodeJS {
    interface Process {
      browser: boolean
    }
  }
  /* eslint-enable @typescript-eslint/no-namespace */
}
