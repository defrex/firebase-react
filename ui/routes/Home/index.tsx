import { RouteComponentProps } from '@reach/router'
import React from 'react'
import { useKeywords, useDescription } from 'ui/components/useSEO'
import { useTitle } from 'ui/components/HeadProvider'

export function HomeRoute(props: RouteComponentProps) {
  useTitle('Index Page')
  useKeywords(['Defrex', 'KristianFJones'])
  useDescription('Firebase React SSR Demo')
  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}
