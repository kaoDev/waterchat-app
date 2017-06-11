import * as React from 'react'
import { MessageList } from '../components/message-list'
import { Message } from '../models/message'
import { storiesOf } from '@storybook/react'
import { users, messageContents } from './mock-data'
import { addSeconds, format } from 'date-fns'

const messageDate = '2017-06-11T17:14:42.592+02:00'

const userSelf = users[0]
const channelId = 'public'

const createMessage = (content: string, index: number) => ({
  content,
  userId: users[index % users.length].userId,
  channelId,
  timestamp: format(addSeconds(messageDate, 10 * index)),
  messageId: `${index}`,
})

const loremMessages: Message[] = messageContents
  .map(m => m.lorem)
  .map(createMessage)

const evilMessages: Message[] = messageContents
  .map(m => m.evil)
  .map(createMessage)

const sloganMessages: Message[] = messageContents
  .map(m => m.slogan)
  .map(createMessage)

const manyMessages: Message[] = messageContents
  .map(m => m.slogan)
  .concat(messageContents.map(m => m.lorem))
  .concat(messageContents.map(m => m.evil))
  .concat(messageContents.map(m => m.slogan))
  .concat(messageContents.map(m => m.lorem))
  .concat(messageContents.map(m => m.evil))
  .concat(messageContents.map(m => m.slogan))
  .concat(messageContents.map(m => m.lorem))
  .concat(messageContents.map(m => m.evil))
  .concat(messageContents.map(m => m.slogan))
  .concat(messageContents.map(m => m.lorem))
  .concat(messageContents.map(m => m.evil))
  .concat(messageContents.map(m => m.slogan))
  .map(createMessage)

const MinSizeContainer = ({ children }: React.Props<{}>) =>
  <div style={{ height: '500px' }}>
    {children}
  </div>

storiesOf('Channel', module)
  .add('with lorem messages', () =>
    <MinSizeContainer>
      <MessageList users={users} self={userSelf} messages={loremMessages} />
    </MinSizeContainer>
  )
  .add('with evil messages', () =>
    <MinSizeContainer>
      <MessageList users={users} self={userSelf} messages={evilMessages} />
    </MinSizeContainer>
  )
  .add('with short slogan messages', () =>
    <MinSizeContainer>
      <MessageList users={users} self={userSelf} messages={sloganMessages} />
    </MinSizeContainer>
  )
  .add('with many messages', () =>
    <MinSizeContainer>
      <MessageList users={users} self={userSelf} messages={manyMessages} />
    </MinSizeContainer>
  )
