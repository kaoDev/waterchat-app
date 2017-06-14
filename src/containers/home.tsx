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
  FlexRowSpecHeightWrapper,
} from '../components/generic'
import { RouteComponentProps } from 'react-router'
import { Redirect } from 'react-router-dom'
import glamorous from 'glamorous'
import { darkBlue } from '../colors'
import * as MediaQuery from 'react-responsive'

const topMargin = -20

const ChatWrapper = glamorous(FlexColumnWrapper)({
  marginTop: `${topMargin}px`,
  height: `calc(100% + ${topMargin * -1}px)`,
  backgroundColor: 'white',
  flexGrow: 1,
  boxShadow: `10px 10px 30px ${darkBlue}`,
})

const MessageListWrapper = glamorous.div({
  height: 'calc(100% - 100px)',
  width: '100%',
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
      : <FlexRowSpecHeightWrapper height={'calc(100% - 100px)'}>
          <MediaQuery minWidth={700}>
            <UserLst users={users} />
          </MediaQuery>
          <ChatWrapper>
            <MessageListWrapper>
              <MessageList
                messages={messages.filter(m => m.channelId === 'public')}
                users={users}
                self={self}
              />
            </MessageListWrapper>
            <ChatInput onSubmit={sendMessage} />
          </ChatWrapper>
        </FlexRowSpecHeightWrapper>
  }
}
export const Home = connect(mapState, mapDispatch)(HomeComponent)
