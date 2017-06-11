import * as React from 'react'
import { GradienButtonExternalLink } from './generic'

export type LoginButtonProps = {
  url: string
  label: string
}

export default function LoginButton({ url, label }: LoginButtonProps) {
  return (
    <GradienButtonExternalLink href={url}>{label}</GradienButtonExternalLink>
  )
}
