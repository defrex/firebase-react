import { RouteComponentProps } from '@reach/router'
import React from 'react'
import { useTitle } from '../../components/HeadProvider'

export default function ExampleRoute(props: RouteComponentProps) {
  useTitle('Example Page')
  return (
    <div>
      <h1>Example</h1>
    </div>
  )
}
