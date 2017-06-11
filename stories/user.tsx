import * as React from 'react'
import { ProfilePicture } from '../src/components/profile-picture'
import { storiesOf } from '@kadira/storybook'

storiesOf('Profile picture', module)
  .add('without image', () => <ProfilePicture />)
  .add('with image', () =>
    <ProfilePicture url="https://avatars1.githubusercontent.com/u/3505939?v=3" />
  )
  .add('with image small', () =>
    <ProfilePicture
      diameter={25}
      url="https://avatars1.githubusercontent.com/u/3505939?v=3"
    />
  )
  .add('with image large', () =>
    <ProfilePicture
      diameter={150}
      url="https://avatars1.githubusercontent.com/u/3505939?v=3"
    />
  )
