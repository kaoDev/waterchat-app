import { UserId } from './user'

export type Content = {
  readonly content: string
}
export type ChannelId = {
  readonly channelId: string
}

export type Message = UserId &
  Content &
  ChannelId & {
    readonly messageId: string
    readonly timestamp: string
  }
