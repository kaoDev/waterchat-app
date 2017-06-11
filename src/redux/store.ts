import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
  StoreEnhancer,
} from 'redux'
import { createEpicMiddleware, combineEpics } from 'redux-observable'
import { History } from 'history'
import {
  routerMiddleware,
  RouterState,
  routerReducer,
} from 'react-router-redux'
import * as reducers from './reducers'
import {
  extractSession,
  persistSession,
  sessionConnection,
  serverMessages,
  readInitialSessionId,
  serverCommands,
  heartbeat,
  log,
  closeSocket,
  fetchUser,
} from './epics'
import { User } from '../models/user'
import { ServerMessage } from '../events/actions'
import { Message } from '../models/message'
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject'

export type AppState = {
  readonly sessionId: string
  readonly router: RouterState
  readonly chatSocket: WebSocketSubject<ServerMessage> | null
  readonly users: User[]
  readonly self: User
  readonly messages: Message[]
}

const initialAppState: AppState = {
  sessionId: '',
  router: { location: null },
  chatSocket: null,
  users: [],
  messages: [],
  self: { displayName: '', profilePicture: '', userId: '' },
}

declare const __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose | undefined

export const createAppStore = (history: History) => {
  // Create a history of your choosing (we're using a browser history in this case)

  // Build the middleware for intercepting and dispatching navigation actions
  const routerMiddleWare = routerMiddleware(history)

  const reduxObservableMiddleWare = createEpicMiddleware(
    combineEpics(
      extractSession,
      persistSession,
      sessionConnection,
      serverMessages,
      readInitialSessionId,
      serverCommands,
      heartbeat,
      log,
      closeSocket,
      fetchUser
    )
  )

  const composeEnhancers = __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const storeEnhancer: StoreEnhancer<AppState> = composeEnhancers(
    applyMiddleware(routerMiddleWare, reduxObservableMiddleWare)
  ) as any

  const reducer = combineReducers<AppState>({
    ...reducers,
    router: routerReducer,
  })

  const store = createStore<AppState>(reducer, initialAppState, storeEnhancer)

  return store
}
