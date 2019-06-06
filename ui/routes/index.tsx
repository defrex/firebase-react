import { Router } from '@reach/router'
import React from 'react'
import { ExampleRoute } from 'ui/routes/Example'
import { HomeRoute } from 'ui/routes/Home'
import { QueryRoute } from 'ui/routes/Query'

export function Routes() {
  return (
    <Router>
      <HomeRoute path='/home' />
      <ExampleRoute path='/example' />
      <QueryRoute path='/query' />
    </Router>
  )
}
