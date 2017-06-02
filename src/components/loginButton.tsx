import * as React from 'react'

export type LoginButtonProps = {
  url: string,
  label: string,
}

export default function LoginButton({ url, label }: LoginButtonProps) {
  return <a href={url}>{label}</a>
}
