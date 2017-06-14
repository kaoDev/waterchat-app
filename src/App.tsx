import * as React from 'react'
import { Provider } from 'react-redux'
import { createAppStore } from './redux/store'
import { ConnectedRouter } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import { Route, Switch } from 'react-router'
import { Redirect } from 'react-router-dom'
import { Login } from './components/login'
import { FlexColumnWrapper } from './components/generic'
import { Home } from './containers/home'
import { Header } from './containers/header'
import { INIT, EXIT } from './events/actionIds'

const getBaseRoute = (ref: string) => {
  const indexBase = '/index.html'
  const ghPagesRoute = '/waterchat-app'
  const htmlIndex = ref.indexOf(indexBase)
  const ghPagesIndex = ref.indexOf(ghPagesRoute)
  console.log(ref)

  if (htmlIndex !== -1) {
    return ref.substring(htmlIndex, htmlIndex + indexBase.length)
  } else if (ghPagesIndex !== -1) {
    return ref.substring(ghPagesIndex, ghPagesIndex + ghPagesRoute.length)
  } else {
    return '/'
  }
}

const basename = getBaseRoute(window.location.href)

console.log('BASE', basename)

const history = createHistory({
  basename,
})

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
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login(basename)} />
              <Route>
                <Redirect to="/" />
              </Route>
            </Switch>
          </FlexColumnWrapper>
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default App
