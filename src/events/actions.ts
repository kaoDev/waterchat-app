import {
  SESSION_ID_CHANGED,
  LOCATION_CHANGE,
  SEND_MESSAGE,
  MESSAGE_RECEIVED,
  ONLINE_USERS_CHANGED,
  CHAT_SOCKET_CHANGED,
  INIT,
  EXIT,
  USER_SELF_CHANGED,
} from './actionIds'
import { User, ChatUser } from '../models/user'
import { Message, Content, ChannelId } from '../models/message'
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject'

export type SessionChanged = {
  readonly type: typeof SESSION_ID_CHANGED
  readonly sessionId: string
}

export type LocationChange = {
  readonly type: typeof LOCATION_CHANGE
  readonly payload: {
    readonly pathname: string
    readonly search: string
    readonly hash: string
  }
}

export type SendMessage = Content &
  ChannelId & {
    readonly type: typeof SEND_MESSAGE
  }

export type MessageReveived = Message & {
  readonly type: typeof MESSAGE_RECEIVED
}

export type OnlineUsersChanged = {
  readonly type: typeof ONLINE_USERS_CHANGED
  readonly users: ChatUser[]
}

export type ServerMessage = MessageReveived | SendMessage | OnlineUsersChanged

export type ChatSocketChanged = {
  readonly type: typeof CHAT_SOCKET_CHANGED
  readonly socket: WebSocketSubject<ServerMessage> | null
}

export type Init = {
  readonly type: typeof INIT
}
export type Exit = {
  readonly type: typeof EXIT
}

export type UserSelfChanged = {
  readonly type: typeof USER_SELF_CHANGED
  readonly data: User
}

export type WaterChatAction =
  | SessionChanged
  | LocationChange
  | ChatSocketChanged
  | Init
  | Exit
  | ServerMessage
  | UserSelfChanged
