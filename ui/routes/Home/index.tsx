import { RouteComponentProps } from '@reach/router'
import React from 'react'
import { useTitle } from 'ui/components/HeadProvider'
import { useKeywords } from 'ui/components/useSEO'

export function HomeRoute(props: RouteComponentProps) {
  useTitle('Index Page')
  useKeywords(['Defrex', 'KristianFJones'])
  return (
    <div>
      <h1>Index</h1>
    </div>
  )
}
