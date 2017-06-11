import * as React from 'react'
import { PureComponent } from 'react'
import { connect, MapStateToProps, Dispatch } from 'react-redux'
import { AppState } from '../redux/store'
import { WaterChatAction } from '../events/actions'
import { SEND_MESSAGE } from '../events/actionIds'
import { MessageList } from '../components/message-list'
import {
  GradienButton,
  FlexColumnWrapper,
  FlexColumnCenteredWrapper,
  GradienButtonLink,
} from '../components/generic'
import { RouteComponentProps } from 'react-router'
import glamorous from 'glamorous'
import { grey, lightGrey } from '../colors'

const InputWrapper = glamorous.div({
  backgroundColor: lightGrey,
  borderColor: grey,
  borderBottomStyle: 'solid',
  borderWidth: '1px',
  width: '100%',
  height: '100px',
  minHeight: '100px',
  flex: '0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

const TextInput = glamorous.textarea({
  borderColor: grey,
  borderBottomStyle: 'solid',
  borderWidth: '1px',
  borderRadius: '4px',
  flexGrow: 1,
  margin: '20px',
  outline: 'none',
  resize: 'none',
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

type ChatState = {
  messageContent: string
}

class HomeComponent extends PureComponent<
  AppState & DispatchProps & RouteComponentProps<{}>,
  ChatState
> {
  state = { messageContent: '' }
  onTextInput = (event: React.FormEvent<HTMLTextAreaElement>) => {
    this.setState({
      messageContent: (event.target as HTMLTextAreaElement).value,
    })
  }
  submit = (event: React.FormEvent<HTMLButtonElement>) => {
    const content = this.state.messageContent
    const channelId = 'public'
    this.props.sendMessage(content, channelId)

    this.setState({
      messageContent: '',
    })
  }
  render() {
    const { chatSocket, messages, users, self } = this.props

    return chatSocket === null
      ? <FlexColumnCenteredWrapper>
          <GradienButtonLink to="/login">goto login </GradienButtonLink>
        </FlexColumnCenteredWrapper>
      : <FlexColumnWrapper>
          <MessageList
            key="messages"
            messages={messages}
            users={users}
            self={self}
          />
          <InputWrapper key="input">
            <TextInput
              onChange={this.onTextInput}
              value={this.state.messageContent}
            />
            <GradienButton onClick={this.submit}>Send</GradienButton>
          </InputWrapper>
        </FlexColumnWrapper>
  }
}
export const Home = connect(mapState, mapDispatch)(HomeComponent)
