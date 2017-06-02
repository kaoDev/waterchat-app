import * as React from 'react'
import './App.css'
import { Provider, connect, MapStateToProps } from 'react-redux'
import { createAppStore, AppState } from './redux/store'
import { ConnectedRouter } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import { Route, Redirect, RouteComponentProps } from 'react-router'
import { Home } from './components/home'
import { About } from './components/about'
import { Topics } from './components/topics';
import { Login } from './components/login';

const history = createHistory()

const store = createAppStore(history)

const mapState: MapStateToProps<{ sessionId: string }, RouteComponentProps<{}>> = (state: AppState, ownProps) => ({ ...ownProps, sessionId: state.sessionId })

const SessionCallback = connect(mapState)
  (({ sessionId }) => {
    if (sessionId !== '') {
      return (<Redirect to='/' />)
    }
    else {
      return (<Redirect to='/login' />)
    }
  })

class App extends React.Component<{}, null> {
  render() {
    return (
      <Provider store={store}>

        <ConnectedRouter history={history}>
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/topics" component={Topics} />
            <Route path="/login" component={Login} />
            <Route path="/sessionCallback" component={SessionCallback} />
          </div>
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default App
