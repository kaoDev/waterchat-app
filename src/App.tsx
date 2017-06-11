import * as React from 'react'
import { Provider, connect, MapStateToProps } from 'react-redux'
import { createAppStore, AppState } from './redux/store'
import { ConnectedRouter } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import { Route, Redirect, RouteComponentProps } from 'react-router'
import { Login } from './components/login'
import { FlexColumnWrapper } from './components/generic'
import { Home } from './containers/home'
import { Header } from './containers/header'
import { INIT, EXIT } from './events/actionIds'

const history = createHistory()

const store = createAppStore(history)

const mapState: MapStateToProps<
  { sessionId: string },
  RouteComponentProps<{}>
> = (state: AppState, ownProps) => ({ ...ownProps, sessionId: state.sessionId })

const SessionRedirect = ({
  sessionId,
}: { sessionId: string } & RouteComponentProps<{}>) => {
  if (sessionId !== '') {
    return <Redirect to="/" />
  } else {
    return <Redirect to="/login" />
  }
}

const SessionCallback = connect(mapState)(SessionRedirect)

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
