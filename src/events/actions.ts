import {
  SESSION_ID_CHANGED,
  NO_OP,
  LOCATION_CHANGE
} from './actionIds'

export type SessionChanged = {
  type: typeof SESSION_ID_CHANGED,
  sessionId: string,
}

export type NoOp = {
  type: typeof NO_OP
}

export type LocationChange = {
  type: typeof LOCATION_CHANGE
  payload: {
    pathname: string
    search: string
    hash: string
  }
}

export type WaterChatAction = NoOp | SessionChanged | LocationChange
