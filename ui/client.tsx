import React from 'react'
import ReactDOM, { Renderer } from 'react-dom'
import { App as AppComponent } from 'ui/App'
import { ConfigProvider } from 'ui/components/ConfigProvider'
import { initApollo } from 'ui/lib/initApollo'
import { ApolloProvider } from 'react-apollo-hooks';

async function render(renderFunction: Renderer, App: typeof AppComponent) {
  if ('serviceWorker' in navigator) {
    const swName = `/service-worker.js`
    window.addEventListener('load', function() {
      navigator.serviceWorker.register(swName);
    });
  }
  renderFunction(
    <ConfigProvider {...window.APP_STATE.CONFIG}>
      <ApolloProvider
        client={initApollo({
          baseUrl: window.APP_STATE.CONFIG.baseUrl,
          initialState: window.APP_STATE.APOLLO_STATE,
        })}
      >
        <App />
      </ApolloProvider>
    </ConfigProvider>,
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
