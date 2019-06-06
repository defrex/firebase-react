import React from 'react'
import ReactDOM, { Renderer } from 'react-dom'
import { App as AppComponent } from 'ui/App'
import { ConfigProvider } from 'ui/components/ConfigProvider'
import { ApolloProvider } from 'ui/components/ApolloProvider'

async function render(renderFunction: Renderer, App: typeof AppComponent) {
  renderFunction(
    <ConfigProvider {...window.FB_STATE.CONFIG}>
      <ApolloProvider>
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
