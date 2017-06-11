import * as React from 'react'
import { Message } from '../src/components/message'
import { storiesOf } from '@kadira/storybook'

const messageDate = '2017-06-10T23:14:42.592+02:00'

storiesOf('Message', module)
  .add('with content own', () =>
    <Message
      content={`The following article covers a topic that has recently moved to center stage–at least it seems
that way. If you’ve been thinking you need to know more about unconditional love, here’s your
opportunity.`}
      ownMessage
      profilePicture="https://avatars1.githubusercontent.com/u/3505939?v=3"
      userName="Kalle Ott"
      timestamp={messageDate}
    />
  )
  .add('with content', () =>
    <Message
      content={`The following article covers a topic that has recently moved to center stage–at least it seems
that way. If you’ve been thinking you need to know more about unconditional love, here’s your
opportunity.`}
      ownMessage={false}
      profilePicture="https://avatars1.githubusercontent.com/u/3505939?v=3"
      userName="Kalle Ott"
      timestamp={messageDate}
    />
  )
