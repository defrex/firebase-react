import util from 'util'
import { remove, ensureDir } from 'fs-extra'
import ParcelBundler, { ParcelOptions } from 'parcel-bundler'
import { generateSW } from 'workbox-build'
const exec = util.promisify(require('child_process').exec)

async function BuildUI() {
  const options: ParcelOptions = {
    outDir: 'dist/ui/',
    minify: true,
    watch: true,
    contentHash: true,
  }
  const JSOptions: ParcelOptions = {
    outDir: 'dist/public',
    minify: true,
    watch: true,
    contentHash: true,
  }

  await remove('dist/')
  await ensureDir('dist/public')

  await exec('cp -r public/* dist/public/ && cp package* dist')
  exec('tsc -b functions/tsconfig.json --watch &')
  await generateSW({
    swDest: 'dist/public/service-worker.js',
    importScripts: ['worker.js'],
    globDirectory: '.',
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'offlineCache',
          expiration: {
            maxEntries: 200,
          },
        },
      },
    ],
  })
  const ClientBundler = new ParcelBundler(['public/assets.urls'], JSOptions)
  const ServerBundler = new ParcelBundler(['ui/server.tsx'], options)
  await ServerBundler.bundle()
  await ClientBundler.bundle()
}

BuildUI()
