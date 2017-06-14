import { Epic } from 'redux-observable'
import {
  WaterChatAction,
  LocationChange,
  ChatSocketChanged,
  ServerMessage,
  SessionChanged,
  UserSelfChanged,
} from '../events/actions'
import {
  SESSION_ID_CHANGED,
  LOCATION_CHANGE,
  CHAT_SOCKET_CHANGED,
  SEND_MESSAGE,
  INIT,
  EXIT,
  USER_SELF_CHANGED,
  CREATE_CHANNEL,
} from '../events/actionIds'
import { AppState } from './store'
import { User } from '../models/user'
import { parse } from 'query-string'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/mapTo'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/distinct'
import 'rxjs/add/operator/catch'
import { empty } from 'rxjs/observable/empty'
import { Observable } from 'rxjs/Observable'
import { interval } from 'rxjs/observable/interval'
import { webSocket } from 'rxjs/observable/dom/webSocket'
import { ajax } from 'rxjs/observable/dom/ajax'
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject'

const extractSessionId = (action: LocationChange) => {
  const { sessionId } = parse(action.payload.search)
  if (sessionId !== undefined) {
    return sessionId as string
  }
  return ''
}

export const extractSession: Epic<WaterChatAction, AppState> = $actions =>
  $actions
    .ofType(LOCATION_CHANGE)
    .flatMap<WaterChatAction, WaterChatAction>(a => {
      // if session callback is routed check if session id is set and then change route to login or home
      if (a.type === LOCATION_CHANGE) {
        const sessionId = extractSessionId(a)
        if (sessionId.length > 0) {
          return [
            {
              type: SESSION_ID_CHANGED,
              sessionId,
            },
          ]
        }
      }
      return empty<WaterChatAction>()
    })

const SESSION_ID_KEY = 'SESSION_ID'

export const readInitialSessionId: Epic<WaterChatAction, AppState> = $actions =>
  $actions.ofType(INIT).map(a => {
    console.log('read session id')
    const initialSession = window.localStorage !== undefined
      ? window.localStorage.getItem(SESSION_ID_KEY) || ''
      : ''

    return {
      type: SESSION_ID_CHANGED,
      sessionId: initialSession,
    } as SessionChanged
  })

export const persistSession: Epic<WaterChatAction, AppState> = $actions =>
  $actions
    .ofType(SESSION_ID_CHANGED)
    .do(a => {
      if (a.type == SESSION_ID_CHANGED) {
        localStorage.setItem(SESSION_ID_KEY, a.sessionId)
      }
    })
    .flatMap(a => empty<WaterChatAction>())

export const log: Epic<WaterChatAction, AppState> = $actions =>
  $actions.do(a => console.log(a.type)).flatMap(a => empty<WaterChatAction>())

export const sessionConnection: Epic<WaterChatAction, AppState> = (
  $actions,
  stateApi
) =>
  $actions.ofType(SESSION_ID_CHANGED).map(a => {
    const state = stateApi.getState()
    if (state.chatSocket !== null) {
      state.chatSocket.complete()
    }
    const socket = a.type === SESSION_ID_CHANGED && a.sessionId.length > 0
      ? webSocket(
          `wss://office.cap3.de:57503/messages?sessionId=${a.sessionId}`
        )
      : null
    return {
      type: CHAT_SOCKET_CHANGED,
      socket,
    } as ChatSocketChanged
  })

export const serverMessages: Epic<WaterChatAction, AppState> = $actions =>
  $actions
    .ofType(CHAT_SOCKET_CHANGED)
    .map(a => (a.type === CHAT_SOCKET_CHANGED ? a.socket : null))
    .filter(socket => socket !== null)
    .flatMap((socket: WebSocketSubject<ServerMessage>) => socket)
    .filter(m => m.type !== undefined)
    .catch((e: Error) => {
      return empty()
    })

export const serverCommands: Epic<WaterChatAction, AppState> = (
  $actions,
  stateApi
) =>
  $actions
    .ofType(SEND_MESSAGE, CREATE_CHANNEL)
    .filter(a => stateApi.getState().chatSocket !== null)
    .do(a => {
      const subject = stateApi.getState().chatSocket
      if (subject !== null && subject.socket.readyState === WebSocket.OPEN) {
        switch (a.type) {
          case CREATE_CHANNEL:
          case SEND_MESSAGE:
            console.log('sending command to server', a)
            subject.socket.send(JSON.stringify(a))
            break
        }
      }
    })
    .flatMap(a => empty<WaterChatAction>())

export const heartbeat: Epic<WaterChatAction, AppState> = (
  $actions,
  stateApi
) =>
  $actions
    .ofType(CHAT_SOCKET_CHANGED)
    .map(a => (a.type === CHAT_SOCKET_CHANGED ? a.socket : null))
    .filter(socket => socket !== null)
    .map((subject: WebSocketSubject<ServerMessage>) => subject.socket)
    .flatMap(socket => {
      return interval(10000).do(() => {
        if (socket.readyState === WebSocket.OPEN) socket.send('ping')
      })
    })
    .flatMap(a => empty<WaterChatAction>())

export const closeSocket: Epic<WaterChatAction, AppState> = (
  $actions,
  stateApi
) =>
  $actions
    .ofType(EXIT)
    .map(a => (a.type === EXIT ? stateApi.getState().chatSocket : null))
    .filter(socket => socket !== null)
    .do((socket: WebSocketSubject<ServerMessage>) => {
      socket.complete()
    })
    .mapTo(
      {
        type: CHAT_SOCKET_CHANGED,
        socket: null,
      } as ChatSocketChanged
    )

export const fetchUser: Epic<WaterChatAction, AppState> = $actions =>
  $actions
    .ofType(SESSION_ID_CHANGED)
    .filter(a => a.type === SESSION_ID_CHANGED && a.sessionId.length > 0)
    .flatMap((a: SessionChanged) => {
      return ajax(`https://office.cap3.de:57503/auth/user/${a.sessionId}`)
    })
    .map(res => res.response as User)
    .map(u => ({ type: USER_SELF_CHANGED, data: u })) as Observable<
    UserSelfChanged
  >
