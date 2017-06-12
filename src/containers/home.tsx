import * as React from 'react'
import { PureComponent } from 'react'
import { connect, MapStateToProps, Dispatch } from 'react-redux'
import { AppState } from '../redux/store'
import { WaterChatAction } from '../events/actions'
import { SEND_MESSAGE } from '../events/actionIds'
import { MessageList } from '../components/message-list'
import { ChatInput } from '../components/chat-input'
import { UserLst } from '../components/user-list'
import {
  FlexColumnWrapper,
  FlexColumnCenteredWrapper,
  GradienButtonLink,
  FlexRowWrapper,
} from '../components/generic'
import { RouteComponentProps } from 'react-router'
import { Redirect } from 'react-router-dom'
import glamorous from 'glamorous'

const ChatWrapper = glamorous(FlexColumnWrapper)({
  marginTop: '-10px',
  height: 'calc(100% + 10px)',
  backgroundColor: 'white',
  flexGrow: 1,
})

function mapDispatch(dispatch: Dispatch<WaterChatAction>) {
  return {
    sendMessage: (content: string, channelId: string) => {
      dispatch({
        type: SEND_MESSAGE,
        content,
        channelId,
      })
    },
  }
}

const mapState: MapStateToProps<AppState, RouteComponentProps<{}>> = (
  state: AppState,
  ownProps
) => state

type DispatchProps = {
  sendMessage: (content: string, channelId: string) => void
}

type ChatState = {}

class HomeComponent extends PureComponent<
  AppState & DispatchProps & RouteComponentProps<{}>,
  ChatState
> {
  render() {
    const {
      chatSocket,
      messages,
      users,
      self,
      sendMessage,
      router,
    } = this.props

    // if this component is routed with the session id redirect ro clean home url
    if (router.location !== null && router.location.search.length > 0) {
      return <Redirect to="/" />
    }

    return chatSocket === null
      ? <FlexColumnCenteredWrapper>
          <GradienButtonLink to="/login">goto login </GradienButtonLink>
        </FlexColumnCenteredWrapper>
      : <FlexRowWrapper>
          <UserLst users={users} />
          <ChatWrapper>
            <MessageList messages={messages} users={users} self={self} />
            <ChatInput onSubmit={sendMessage} />
          </ChatWrapper>
        </FlexRowWrapper>
  }
}
export const Home = connect(mapState, mapDispatch)(HomeComponent)