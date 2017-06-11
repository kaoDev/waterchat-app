import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapStateToProps } from 'react-redux'
import { AppState } from '../redux/store'
import { MessageList } from '../components/message-list'
import { RouteComponentProps } from 'react-router'

const mapState: MapStateToProps<AppState, RouteComponentProps<{}>> = (
  state: AppState,
  ownProps
) => state

const HomeComponent = (props: AppState & RouteComponentProps<{}>) => {
  const { chatSocket } = props

  if (chatSocket === null) {
    return (
      <p>
        <Link to="/login">goto login </Link>
      </p>
    )
  } else {
    const { messages, users, self } = props
    return <MessageList messages={messages} users={users} self={self} />
  }
}
export const Home = connect(mapState)(HomeComponent)
