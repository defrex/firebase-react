import { Router } from '@reach/router'
import React from 'react'
import { ExampleRoute } from 'ui/routes/Example'
import { IndexRoute } from 'ui/routes/Index'
import { QueryRoute } from 'ui/routes/Query'

export function Routes() {
  return (
    <Router>
      <IndexRoute path='/' />
      <ExampleRoute path='/example' />
      <QueryRoute path='/query' />
    </Router>
  )
}
