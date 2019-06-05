import { Link } from '@reach/router'
import React from 'react'
import { useConfig } from 'ui/components/ConfigProvider'
import { Routes } from 'ui/routes'

export function App() {
  const { baseUrl } = useConfig()
  return (
    <div>
      <ul>
        <li>
          <Link to='/'>Index</Link>
        </li>
        <li>
          <Link to='/example'>Example</Link>
        </li>
      </ul>
      <h3>{baseUrl}</h3>
      <Routes />
    </div>
  )
}
