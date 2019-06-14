import React from 'react'
import { ApolloProvider } from 'react-apollo-hooks'
import ReactDOM, { Renderer } from 'react-dom'
import { preloadReady } from 'react-loadable'
import { App as AppComponent } from 'ui/App'
import { ConfigProvider } from 'ui/components/ConfigProvider'
import { initApollo } from 'ui/lib/initApollo'
import { HeadProvider } from './components/HeadProvider'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async function() {
    const worker = await navigator.serviceWorker.register('/service-worker.ts', { scope: '/' })
    console.log('SW registered: ', worker)
  })
}

async function render(renderFunction: Renderer, App: typeof AppComponent) {
  await preloadReady()
  renderFunction(
    <HeadProvider tags={[]}>
      <ConfigProvider {...window.APP_STATE.CONFIG}>
        <ApolloProvider
          client={initApollo({
            baseUrl: window.APP_STATE.CONFIG.baseUrl,
            initialState: window.APP_STATE.APOLLO_STATE,
          })}
        >
          <App />
        </ApolloProvider>
      </ConfigProvider>
    </HeadProvider>,
    document.getElementById('app'),
  )
}

render(ReactDOM.hydrate, AppComponent)

const hot = (module as any).hot
if (hot && hot.accept) {
  hot.accept(() => {
    render(ReactDOM.render, require('ui/App').App)
  })
}
