import {
    SESSION_ID_CHANGED
} from './actionIds';

export type SessionChanged = {
    type: typeof SESSION_ID_CHANGED,
    sessionId: string
}



export type WaterChatAction = SessionChanged