import * as React from 'react'
import LoginButton from './loginButton'

const githubAuthBase = 'https://office.cap3.de:57503/auth/github'

const sessionCallBack = (base: string) => {
  const { origin } = window.location
  return `${origin}${base}`
}

export const LoginWithGitHub = (baseUrl: string) => () =>
  <LoginButton
    url={`${githubAuthBase}?callback=${sessionCallBack(baseUrl)}`}
    label="sign in with github"
  />
