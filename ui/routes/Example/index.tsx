import { RouteComponentProps } from '@reach/router'
import React from 'react'
import { useTitle } from 'ui/components/HeadProvider'
import { useBreadCrumbJsonLd } from 'ui/components/useSEO';

export function ExampleRoute(props: RouteComponentProps) {
  useTitle('Example Page')
  useBreadCrumbJsonLd([
    {
      position: 1,
      name: 'Books',
      item: 'https://example.com/books',
    },
    {
      position: 2,
      name: 'Authors',
      item: 'https://example.com/books/authors',
    },
    {
      position: 3,
      name: 'Ann Leckie',
      item: 'https://example.com/books/authors/annleckie',
    },
    {
      position: 4,
      name: 'Ancillary Justice',
      item: 'https://example.com/books/authors/ancillaryjustice',
    },
  ])
  return (
    <div>
      <h1>Example</h1>
    </div>
  )
}
