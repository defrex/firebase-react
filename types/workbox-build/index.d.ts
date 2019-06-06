declare module "workbox-build" {
  interface GenerateSWOpts {
    swDest: string
    importWorkboxFrom?: 'cdn' | 'local'
    skipWaiting?: boolean
    clientsClaim?: boolean
    importScripts: string[]
    globDirectory: string
    runtimeCaching: {
      urlPattern: string | RegExp,
      handler: 'CacheFirst' | 'CacheOnly' | 'NetworkFirst' | 'NetworkOnly' | 'StaleWhileRevalidate',
      options: {
        cacheName: string
        expiration: {
          maxEntries: number
        }
      }
    }[]
  }
  export function generateSW(opts: GenerateSWOpts): { count: number, size: number, warnings: any[]}
}