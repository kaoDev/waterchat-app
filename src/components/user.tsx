import * as React from 'react'
import { ProfilePicture } from './profile-picture'
import glamorous from 'glamorous'

const Wrapper = glamorous.div<{
  online: boolean
}>(
  {
    display: 'flex',
    alignItems: 'center',
    width: '250px',
    boxSizing: 'border-box',
    padding: '8px',
  },
  ({ online }) => ({
    opacity: online ? 1 : 0.5,
  })
)

const Name = glamorous.div({
  width: '200px',
  overflow: 'hidden',
  boxSizing: 'border-box',
  margin: '8px',
  textOverflow: 'ellipsis',
})

const StatusAvatar = glamorous(ProfilePicture)({
  flexShrink: 0,
})

export const User = ({
  displayName,
  online,
  profilePicture,
}: {
  displayName: string
  online: boolean
  profilePicture: string
}) =>
  <Wrapper online={online}>
    <StatusAvatar diameter={50} url={profilePicture} />
    <Name>{displayName}</Name>
  </Wrapper>
