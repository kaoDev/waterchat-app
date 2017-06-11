import glamorous from 'glamorous'
import * as React from 'react'
import { PureComponent } from 'react'
import {
  format,
  isSameDay,
  isSameHour,
  isSameMinute,
  differenceInMinutes,
  differenceInSeconds,
  differenceInMilliseconds,
  endOfDay,
  endOfMinute,
  endOfHour,
} from 'date-fns'

const padding = '22px'

const StyledDiv = glamorous.div({
  fontFamily: 'sans-serif',
  fontWeight: 100,
  color: 'lightgrey',
  padding: padding,
  fontSize: '0.8em',
})

export type TimestampProps = {
  timestamp: string
}

export type TimestampState = {
  timeString: string
}

export class Timestamp extends PureComponent<TimestampProps, TimestampState> {
  private timerID: number | undefined

  componentDidMount() {
    this.updateTimeString()
  }
  componentWillUnmount() {
    if (this.timerID !== undefined) {
      window.clearTimeout(this.timerID)
    }
  }

  updateTimeString = () => {
    const { timestamp } = this.props
    const now = new Date()
    this.setState(this.createState(timestamp, now))

    if (isSameMinute(now, timestamp)) {
      this.timerID = window.setTimeout(
        this.updateTimeString,
        differenceInMilliseconds(now, endOfMinute(now))
      )
    } else if (isSameHour(now, timestamp)) {
      this.timerID = window.setTimeout(
        this.updateTimeString,
        differenceInMilliseconds(now, endOfHour(now))
      )
    } else if (isSameDay(now, timestamp)) {
      this.timerID = window.setTimeout(
        this.updateTimeString,
        differenceInMilliseconds(now, endOfDay(now))
      )
    }
  }

  createState = (timestamp: string, now: Date) => {
    if (isSameMinute(now, timestamp)) {
      const diff = differenceInSeconds(now, timestamp) || 1

      return {
        timeString: diff > 30 ? '~30 seconds ago' : 'seconds ago',
      }
    } else if (isSameHour(now, timestamp)) {
      const diff = differenceInMinutes(now, timestamp) || 1
      return {
        timeString: `${diff} minute${diff > 1 ? 's' : ''} ago`,
      }
    } else if (isSameDay(now, timestamp)) {
      return {
        timeString: format(timestamp, 'HH:mm'),
      }
    } else {
      return {
        timeString: format(timestamp, 'HH:mm DD.MM.YYYY'),
      }
    }
  }

  state = { timeString: '' }

  render() {
    const { timeString } = this.state
    return (
      <StyledDiv>
        {timeString}
      </StyledDiv>
    )
  }
}
