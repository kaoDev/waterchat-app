import * as React from 'react'
import { Provider } from 'react-redux'
import { createAppStore } from './redux/store'
import { ConnectedRouter } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'
import { Login } from './components/login'
import { FlexColumnWrapper } from './components/generic'
import { Home } from './containers/home'
import { Header } from './containers/header'
import { INIT, EXIT } from './events/actionIds'
import { SessionCallback } from './containers/session-callback'

const history = createHistory()

const store = createAppStore(history)

class App extends React.Component<{}, null> {
  componentDidMount() {
    store.dispatch({ type: INIT })
  }

  componentWillUnmount() {
    store.dispatch({ type: EXIT })
  }

  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <FlexColumnWrapper>
            <Header />
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/sessionCallback" component={SessionCallback} />
          </FlexColumnWrapper>
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default App
