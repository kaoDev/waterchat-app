import * as React from 'react'
import LoginButton from './loginButton'
const logo = require('./logo.svg')

const githubAuthBase = 'https://office.cap3.de:57503/auth/github'

const sessionCallBack = () => {
  const base = window.location.origin

  return `${base}/sessionCallback`
}

export function Login() {
  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to React</h2>
      </div>
      <p className="App-intro">
        To get started, edit <code>src/App.tsx</code> and save to reload.
        <LoginButton
          url={`${githubAuthBase}?callback=${sessionCallBack()}`}
          label="sign in with github"
        />
      </p>
    </div>
  )
}
