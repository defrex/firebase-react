import { RouteComponentProps } from '@reach/router'
import React from 'react'
import { useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'

const helloWorldGQL = gql`
  {
    helloWorld
  }
`

export function QueryRoute(props: RouteComponentProps) {
  const { data, loading } = useQuery<{ helloWorld: string }>(helloWorldGQL)
  if (loading) return <div>Loading</div>
  return (
    <div>
      <h1>Query</h1>
      <span>{data && data.helloWorld}</span>
    </div>
  )
}
