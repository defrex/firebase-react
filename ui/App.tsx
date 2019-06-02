import { Link } from '@reach/router'
import React from 'react'
import { Routes } from 'ui/routes'

export function App() {
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
      <Routes />
    </div>
  )
}
