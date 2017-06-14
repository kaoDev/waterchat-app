import * as React from 'react'
import LoginButton from './loginButton'
import { FlexColumnWrapper } from './generic'

const oAuthBase = 'https://office.cap3.de:57503/auth'

const sessionCallBack = (base: string) => {
  const { origin } = window.location
  const path = base.endsWith('/') ? base : `${base}/`
  return `${origin}${path}`
}

export const Login = (baseUrl: string) => () =>
  <FlexColumnWrapper>
    <LoginButton
      url={`${oAuthBase}/github?callback=${sessionCallBack(baseUrl)}`}
      label="sign in with github"
    />
    <LoginButton
      url={`${oAuthBase}/twitter?callback=${sessionCallBack(baseUrl)}`}
      label="sign in with twitter"
    />
  </FlexColumnWrapper>
