import { Epic } from 'redux-observable'
import { WaterChatAction, NoOp, LocationChange } from '../events/actions'
import { NO_OP, SESSION_ID_CHANGED, LOCATION_CHANGE } from '../events/actionIds'
import { SESSION_ID } from './store'
import { parse } from 'query-string'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/mapTo'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'

const extractSessionId = (action: LocationChange) => {
  const { sessionId } = parse(action.payload.search)
  if (sessionId !== undefined) {
    return sessionId as string
  }
  return ''
}

export const extractSession: Epic<
  WaterChatAction,
  WaterChatAction
> = $actions =>
  $actions.ofType(LOCATION_CHANGE).map(a => {
    // if session callback is routed check if session id is set and then change route to login or home
    if (
      a.type === LOCATION_CHANGE &&
      a.payload.pathname.indexOf('/sessionCallback') == 0
    ) {
      const sessionId = extractSessionId(a)
      if (sessionId.length > 0) {
        return {
          type: SESSION_ID_CHANGED,
          sessionId,
        }
      }
    }
    return { type: NO_OP }
  })

export const persistSession: Epic<WaterChatAction, NoOp> = $actions =>
  $actions
    .ofType(SESSION_ID_CHANGED)
    .do(a => {
      if (a.type == SESSION_ID_CHANGED) {
        localStorage.setItem(SESSION_ID, a.sessionId)
      }
    })
    .mapTo({
      type: NO_OP,
    })
