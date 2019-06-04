import React from 'react'
import ReactDOM, { Renderer } from 'react-dom'
import { ApolloProvider } from 'react-apollo-hooks'
import { App as AppComponent } from 'ui/App'
import initClient from 'ui/withApollo'
import { NormalizedCacheObject } from 'apollo-boost';

declare global {
  interface Window {
    __APOLLO_STATE__: NormalizedCacheObject
  }
}

async function render(renderFunction: Renderer, App: typeof AppComponent) {
  renderFunction(
    <ApolloProvider client={initClient(window.__APOLLO_STATE__)}>
      <App />
    </ApolloProvider>,
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
