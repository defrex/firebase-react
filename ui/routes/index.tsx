import { Router } from '@reach/router'
import React from 'react'
import Loadable from 'react-loadable'
import { HomeRoute } from 'ui/routes/Home'
import { QueryRoute } from 'ui/routes/Query'
import Loader from 'ui/components/Loader'

const Example = Loadable({
  loader: () => import('ui/routes/Example'),
  modules: ['ui/routes/Example'],
  loading: Loader,
  delay: 500,
})

export function Routes() {
  return (
    <Router>
      <HomeRoute path='/' />
      <Example path='/example' />
      <QueryRoute path='/query' />
    </Router>
  )
}
