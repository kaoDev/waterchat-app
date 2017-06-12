import * as React from 'react'
import { connect, MapStateToProps } from 'react-redux'
import { AppState } from '../redux/store'
import { Redirect, RouteComponentProps } from 'react-router'

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

export const SessionCallback = connect(mapState)(SessionRedirect)
