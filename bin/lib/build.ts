import { copy, mkdir, remove } from 'fs-extra'
import ParcelBundler from 'parcel-bundler'
import run from './run'

export async function build(watch: boolean = false) {
  await remove('dist')
  await mkdir('dist')

  await copy('public', 'dist/public')
  await copy('package.json', 'dist/package.json')
  await copy('package-lock.json', 'dist/package-lock.json')

  await run('tsc --build functions/tsconfig.json')

  const bundler = new ParcelBundler(['ui/server.tsx', 'ui/client.urls', 'ui/manifest.json'], {
    outDir: 'dist/public',
    watch,
  })
  await bundler.bundle()
}
