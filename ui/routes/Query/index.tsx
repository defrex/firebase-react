import { RouteComponentProps } from '@reach/router'
import React from 'react'
import { useQuery } from 'react-apollo-hooks'
import gql from './query.graphql'

export function QueryRoute(props: RouteComponentProps) {
  const { data, loading } = useQuery<{ helloWorld: string }>(gql)
  if (loading) return <div>Loading</div>
  return (
    <div>
      <h1>Query</h1>
      <span>{data && data.helloWorld}</span>
    </div>
  )
}
