import { WaterChatAction, ServerMessage } from '../events/actions'
import {
  SESSION_ID_CHANGED,
  CHAT_SOCKET_CHANGED,
  MESSAGE_RECEIVED,
  ONLINE_USERS_CHANGED,
  USER_SELF_CHANGED,
} from '../events/actionIds'
import { User, ChatUser } from '../models/user'
import { Message } from '../models/message'
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject'

export const sessionId = (oldState: string = '', action: WaterChatAction) => {
  switch (action.type) {
    case SESSION_ID_CHANGED: {
      return action.sessionId
    }
    default:
      return oldState
  }
}

export const chatSocket = (
  oldState: WebSocketSubject<ServerMessage> | null = null,
  action: WaterChatAction
) => {
  switch (action.type) {
    case CHAT_SOCKET_CHANGED: {
      return action.socket
    }
    default:
      return oldState
  }
}

export const users = (oldState: ChatUser[] = [], action: WaterChatAction) => {
  switch (action.type) {
    case ONLINE_USERS_CHANGED: {
      return action.users.sort((a, b) => {
        if (a.online && !b.online) {
          return -1
        } else if (!a.online && b.online) {
          return 1
        } else {
          if (a.displayName && b.displayName) {
            return a.displayName < b.displayName ? -1 : 1
          } else {
            return -1
          }
        }
      })
    }
    default:
      return oldState
  }
}

export const messages = (oldState: Message[] = [], action: WaterChatAction) => {
  switch (action.type) {
    case MESSAGE_RECEIVED: {
      return oldState
        .concat([
          {
            messageId: action.messageId,
            content: action.content,
            channelId: action.channelId,
            timestamp: action.timestamp,
            userId: action.userId,
          },
        ])
        .sort((a, b) => (a.timestamp < b.timestamp ? -1 : 1))
    }
    default:
      return oldState
  }
}

export const self = (
  oldState: User = { displayName: '', profilePicture: '', userId: '' },
  action: WaterChatAction
) => {
  switch (action.type) {
    case USER_SELF_CHANGED: {
      return action.data
    }
    default:
      return oldState
  }
}
