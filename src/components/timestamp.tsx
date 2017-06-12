import glamorous from 'glamorous'
import * as React from 'react'
import { PureComponent } from 'react'
import {
  format,
  isSameDay,
  differenceInMinutes,
  differenceInSeconds,
  differenceInMilliseconds,
  endOfDay,
} from 'date-fns'
import { grey } from '../colors'

const padding = '22px'

const StyledDiv = glamorous.div({
  fontFamily: 'sans-serif',
  fontWeight: 100,
  color: grey,
  padding: padding,
  fontSize: '0.8em',
})

export type TimestampProps = {
  timestamp: string,
}

export type TimestampState = {
  timeString: string,
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

    const diffInSeconds = differenceInSeconds(now, timestamp)
    if (diffInSeconds < 60) {
      this.timerID = window.setTimeout(
        this.updateTimeString,
        (diffInSeconds > 30
          ? Math.abs(60 - diffInSeconds)
          : Math.abs(30 - diffInSeconds)) * 1000
      )
    } else if (diffInSeconds < 3600) {
      this.timerID = window.setTimeout(
        this.updateTimeString,
        diffInSeconds % 60 * 1000
      )
    } else if (isSameDay(now, timestamp)) {
      this.timerID = window.setTimeout(
        this.updateTimeString,
        differenceInMilliseconds(now, endOfDay(now))
      )
    }
  }

  createState = (timestamp: string, now: Date) => {
    const diffInSeconds = differenceInSeconds(now, timestamp)
    if (diffInSeconds < 60) {
      return {
        timeString: diffInSeconds > 30 ? 'a moment ago' : 'just now',
      }
    } else if (diffInSeconds < 3600) {
      const diff = differenceInMinutes(now, timestamp)
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
