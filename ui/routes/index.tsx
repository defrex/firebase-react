import { Router } from '@reach/router'
import React from 'react'
import { ExampleRoute } from 'ui/routes/Example'
import { IndexRoute } from 'ui/routes/Index'

export function Routes() {
  return (
    <Router>
      <IndexRoute path='/' />
      <ExampleRoute path='/example' />
    </Router>
  )
}
