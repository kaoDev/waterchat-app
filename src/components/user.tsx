import * as React from 'react'
import { ProfilePicture } from './profile-picture'
import glamorous from 'glamorous'

const Wrapper = glamorous.div({
  display: 'flex',
  alignItems: 'center',
  width: '250px',
  boxSizing: 'border-box',
  padding: '8px',
})

const Name = glamorous.div({
  width: '200px',
  overflow: 'hidden',
  boxSizing: 'border-box',
  margin: '8px',
  textOverflow: 'ellipsis',
})

const StatusAvatar = glamorous(ProfilePicture)<{
  online: boolean
}>({}, ({ online }) => ({
  opacity: online ? 1 : 0.5,
}))

export const User = ({
  displayName,
  online,
  profilePicture,
}: {
  displayName: string
  online: boolean
  profilePicture: string
}) =>
  <Wrapper>
    <StatusAvatar online={online} diameter={50} url={profilePicture} />
    <Name>{displayName}</Name>
  </Wrapper>
