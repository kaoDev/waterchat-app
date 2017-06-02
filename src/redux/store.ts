import { createStore, combineReducers, applyMiddleware, compose, StoreEnhancer } from 'redux'
import { createEpicMiddleware, combineEpics } from 'redux-observable'
import { History } from 'history'
import {
  routerMiddleware,
  RouterState,
  routerReducer
} from 'react-router-redux'
import * as reducers from './reducers'
import { extractSession, persistSession } from './epics'
import { WaterChatAction } from '../events/actions'

export type AppState = {
  readonly sessionId: string,
  readonly router: RouterState,
}
export const SESSION_ID = 'SESSION_ID'

const initialSession = localStorage.getItem(SESSION_ID) || ''

const initialAppState: AppState = {
  sessionId: initialSession,
  router: { location: null }
}

declare const __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose | undefined

export const createAppStore = (history: History) => {
  // Create a history of your choosing (we're using a browser history in this case)

  // Build the middleware for intercepting and dispatching navigation actions
  const routerMiddleWare = routerMiddleware(history)

  const reduxObservableMiddleWare = createEpicMiddleware(
    combineEpics<WaterChatAction, WaterChatAction>(
      extractSession, persistSession
    )
  )

  const composeEnhancers = __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const storeEnhancer: StoreEnhancer<AppState> = composeEnhancers(
    applyMiddleware(routerMiddleWare, reduxObservableMiddleWare)
  ) as any

  const reducer = combineReducers<AppState>({
    ...reducers,
    router: routerReducer
  })

  const store = createStore<AppState>(
    reducer,
    initialAppState,
    storeEnhancer
  )

  return store
}
