import glamorous from 'glamorous'
import * as React from 'react'
import { ProfilePicture } from './profile-picture'
import { Timestamp } from './timestamp'
import { grey, green } from '../colors'

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
    backgroundColor: ownMessage ? green : grey,
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
  paddingBottom: '18px',
  paddingLeft: '8px',
  paddingRight: '8px',
  boxSizing: 'border-box',
})

const Spacer = glamorous.div({
  flexGrow: 1,
})
export type MessageProps = {
  profilePicture: string
  userName: string
  timestamp: string
  content: string
  ownMessage: boolean
  style?: React.CSSProperties
}
export const Message = ({
  profilePicture,
  content,
  userName,
  timestamp,
  ownMessage,
  style,
}: MessageProps) => {
  const PositionedProfilePicture = glamorous(ProfilePicture)({
    position: 'absolute',
    left: ownMessage ? undefined : '0',
    right: ownMessage ? '0' : undefined,
    bottom: `-${profileDiameter / 2}px`,
  })

  const rowContent = [
    <Spacer key="spacer" />,
    <Timestamp key="time" timestamp={timestamp} />,
    <MessageContainerLarge key="message" ownMessage={ownMessage}>
      {content}
      <PositionedProfilePicture
        url={profilePicture}
        diameter={profileDiameter}
      />
    </MessageContainerLarge>,
  ]
  return (
    <Row style={style}>
      {ownMessage ? rowContent : rowContent.reverse()}
    </Row>
  )
}
