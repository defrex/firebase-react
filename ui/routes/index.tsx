import { Router } from '@reach/router'
import React from 'react'
import { IndexRoute } from 'ui/routes/Index'

export function Routes() {
  return (
    <Router>
      <IndexRoute path='/' />
    </Router>
  )
}
