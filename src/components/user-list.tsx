import * as React from 'react'
import { ChatUser } from '../models/user'
import { User } from './user'
import { FlexColumnWrapper } from './generic'
import { lightGrey } from '../colors'
import glamorous from 'glamorous'

const Wrapper = glamorous(FlexColumnWrapper)({
  maxWidth: '250px',
  backgroundColor: lightGrey,
  overflow: 'auto',
})

export const UserLst = ({ users }: { users: ChatUser[] }) =>
  <Wrapper>
    {users.map(({ userId, ...user }) => <User key={userId} {...user} />)}
  </Wrapper>
