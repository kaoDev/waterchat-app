import * as React from 'react'
import { Message } from '../components/message'
import { storiesOf } from '@storybook/react'
import { users, messageContents } from './mock-data'

const messageDate = '2017-06-10T23:14:42.592+02:00'

const userSelf = users[0]
const userOther = users[2]

storiesOf('Message', module)
  .add('with content own lorm', () =>
    <Message
      content={messageContents[0].lorem}
      ownMessage
      profilePicture={userSelf.profilePicture}
      userName={userSelf.displayName}
      timestamp={messageDate}
    />
  )
  .add('with content own evil', () =>
    <Message
      content={messageContents[0].evil}
      ownMessage
      profilePicture={userSelf.profilePicture}
      userName={userSelf.displayName}
      timestamp={messageDate}
    />
  )
  .add('with content own short', () =>
    <Message
      content={messageContents[0].slogan}
      ownMessage
      profilePicture={userSelf.profilePicture}
      userName={userSelf.displayName}
      timestamp={messageDate}
    />
  )
  .add('with content other lorem', () =>
    <Message
      content={messageContents[1].lorem}
      ownMessage={false}
      profilePicture={userOther.profilePicture}
      userName={userOther.displayName}
      timestamp={messageDate}
    />
  )
  .add('with content other evil', () =>
    <Message
      content={messageContents[1].evil}
      ownMessage={false}
      profilePicture={userOther.profilePicture}
      userName={userOther.displayName}
      timestamp={messageDate}
    />
  )
  .add('with content other short', () =>
    <Message
      content={messageContents[1].slogan}
      ownMessage={false}
      profilePicture={userOther.profilePicture}
      userName={userOther.displayName}
      timestamp={messageDate}
    />
  )
