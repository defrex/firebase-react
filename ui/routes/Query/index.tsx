import { RouteComponentProps } from '@reach/router'
import React from 'react'
import { useQuery } from 'react-apollo-hooks'
import { useTitle } from '../../components/HeadProvider'
import gql from './query.graphql'

export default function QueryRoute(props: RouteComponentProps) {
  useTitle('Query Page')
  const { data, loading } = useQuery<{ helloWorld: string }>(gql)
  if (loading) return <div>Loading</div>
  return (
    <div>
      <h1>Query</h1>
      <span>{data && data.helloWorld}</span>
    </div>
  )
}
