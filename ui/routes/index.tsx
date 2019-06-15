import { Router } from '@reach/router'
import React from 'react'
import Loadable from 'react-loadable'
import { HomeRoute } from './Home'
import Loader from '../components/Loader'

const ExampleRoute = Loadable({
  loader: () => import('./Example'),
  modules: ['./Example'],
  loading: Loader,
  delay: 500,
})

const QueryRoute = Loadable({
  loader: () => import('./Query'),
  modules: ['./Query'],
  loading: Loader,
  delay: 500,
})

export function Routes() {
  return (
    <Router>
      <HomeRoute path='/' />
      <ExampleRoute path='/example' />
      <QueryRoute path='/query' />
    </Router>
  )
}
