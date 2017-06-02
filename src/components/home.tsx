import * as React from 'react'
import { Link } from 'react-router-dom'
const logo = require('./logo.svg')

export function Home() {
  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to React</h2>
      </div>
      <p className="App-intro">
        To get started, edit <code>src/App.tsx</code> and save to reload.
        <Link to="/login">goto login </Link>
      </p>
    </div>
  )
}
