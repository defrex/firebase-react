import { Link, Router } from '@reach/router'
import React from 'react'
import { ExampleRoute } from 'ui/routes/Example'
import { IndexRoute } from 'ui/routes/Index'

export function Routes() {
  return (
    <div>
      <ul>
        <li>
          <Link to='/'>Index</Link>
        </li>
        <li>
          <Link to='/example'>Example</Link>
        </li>
      </ul>
      <Router>
        <IndexRoute path='/' />
        <ExampleRoute path='/example' />
      </Router>
    </div>
  )
}
