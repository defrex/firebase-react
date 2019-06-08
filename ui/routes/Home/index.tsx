import { RouteComponentProps } from '@reach/router'
import React from 'react'
import { useSEO } from 'ui/components/useSEO'

export function HomeRoute(props: RouteComponentProps) {
  useSEO({ 
    title: 'Index Page',
    description: 'Firebase React SSR Demo',
    keywords: ['Defrex', 'KristianFJones']
  })
  return (
    <div>
      <h1>Index</h1>
    </div>
  )
}
