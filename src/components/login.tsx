import * as React from 'react'
import LoginButton from './loginButton'

const githubAuthBase = 'https://office.cap3.de:57503/auth/github'

const sessionCallBack = () => {
  const base = window.location.origin

  return `${base}/sessionCallback`
}

export function Login() {
  return (
    <LoginButton
      url={`${githubAuthBase}?callback=${sessionCallBack()}`}
      label="sign in with github"
    />
  )
}
