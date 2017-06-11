import glamorous from 'glamorous'
import * as React from 'react'
import { ProfilePicture } from './profile-picture'
import { getHours, getMinutes } from 'date-fns'

const messageGreen = '#84fab0'
const messageGrey = '#d0d5dc'
const paddingV = '22px'
const paddingH = '12px'
const profileDiameter = 24

const MessageContainerLarge = glamorous.div<{ ownMessage: boolean }>(
  {
    height: 'auto',
    maxWidth: 'calc(80% - 60px)',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    paddingTop: paddingV,
    paddingBottom: paddingV,
    paddingLeft: paddingH,
    paddingRight: paddingH,
    position: 'relative',
    fontFamily: 'sans-serif',
    fontWeight: 100,
    flexShrink: 1,
  },
  ({ ownMessage }) => ({
    backgroundColor: ownMessage ? messageGreen : messageGrey,
    borderTopLeftRadius: ownMessage ? paddingH : paddingV,
    borderTopRightRadius: ownMessage ? paddingV : paddingH,
    borderBottomLeftRadius: ownMessage ? paddingV : '0',
    borderBottomRightRadius: ownMessage ? '0' : paddingV,
  })
)

const Row = glamorous.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
})

const Timestamp = glamorous.div<{ ownMessage: boolean }>(
  {
    fontFamily: 'sans-serif',
    fontWeight: 100,
    color: 'lightgrey',
    padding: paddingV,
    fontSize: '0.8em',
  },
  ({ ownMessage }) => ({
    order: ownMessage ? 0 : 1,
  })
)
const Spacer = glamorous.div<{ ownMessage: boolean }>(
  {
    flexGrow: 1,
  },
  ({ ownMessage }) => ({
    order: ownMessage ? 0 : 2,
  })
)
export type MessageProps = {
  profilePicture: string,
  userName: string,
  timestamp: string,
  content: string,
  ownMessage: boolean,
}
export const Message = ({
  profilePicture,
  content,
  userName,
  timestamp,
  ownMessage,
}: MessageProps) => {
  const PositionedProfilePicture = glamorous(ProfilePicture)({
    position: 'absolute',
    left: ownMessage ? undefined : '0',
    right: ownMessage ? '0' : undefined,
    bottom: `-${profileDiameter / 2}px`,
  })
  return (
    <Row>
      <Spacer ownMessage={ownMessage} />
      <Timestamp ownMessage={ownMessage}>{`${getHours(timestamp)}:${getMinutes(
        timestamp
      )}`}</Timestamp>
      <MessageContainerLarge ownMessage={ownMessage}>
        {content}
        <PositionedProfilePicture
          url={profilePicture}
          diameter={profileDiameter}
        />
      </MessageContainerLarge>
    </Row>
  )
}
