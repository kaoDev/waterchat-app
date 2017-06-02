import { WaterChatAction } from '../events/actions'
import { SESSION_ID_CHANGED } from '../events/actionIds'

export const sessionId = (oldState: string = '', action: WaterChatAction) => {
  switch (action.type) {
    case SESSION_ID_CHANGED: {
      return action.sessionId
    }
    default:
      return oldState
  }
}
