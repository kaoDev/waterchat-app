import * as React from 'react'
import {ProfilePicture} from '../components/profile-picture'
import {storiesOf} from '@storybook/react'
import {users} from './mock-data'

storiesOf('Profile picture', module)
  .add('without image', () => <ProfilePicture />)
  .add('with image', () =>
    <ProfilePicture url={users[0].profilePicture} />
  )
  .add('with image small', () =>
    <ProfilePicture
      diameter={25}
      url={users[0].profilePicture}
    />
  )
  .add('with image large', () =>
    <ProfilePicture
      diameter={150}
      url={users[0].profilePicture}
    />
  )
