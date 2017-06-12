import * as React from 'react'
import { Timestamp } from '../components/timestamp'
import { storiesOf } from '@storybook/react'
import { format, subMinutes, subHours, subDays } from 'date-fns'

storiesOf('Timestamp', module)
  .add('just now', () => <Timestamp timestamp={format(new Date())} />)
  .add('minute ago', () =>
    <Timestamp timestamp={format(subMinutes(new Date(), 1))} />
  )
  .add('hour ago', () =>
    <Timestamp timestamp={format(subHours(new Date(), 1))} />
  )
  .add('day ago', () =>
    <Timestamp timestamp={format(subDays(new Date(), 1))} />
  )
