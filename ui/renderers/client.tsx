import React from 'react'
import ReactDOM, { Renderer } from 'react-dom'
import { App as AppComponent } from 'ui/App'

async function render(renderFunction: Renderer, App: typeof AppComponent) {
  renderFunction(<App />, document.getElementById('app'))
}

render(ReactDOM.hydrate, AppComponent)

const hot = (module as any).hot
if (hot && hot.accept) {
  hot.accept('ui/App', () => {
    render(ReactDOM.render, require('ui/App').App)
  })
}
