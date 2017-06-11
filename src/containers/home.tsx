import * as React from 'react'
import { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { connect, MapStateToProps, Dispatch } from 'react-redux'
import { AppState } from '../redux/store'
import { WaterChatAction } from '../events/actions'
import { SEND_MESSAGE, SESSION_ID_CHANGED } from '../events/actionIds'
import { MessageList } from '../components/message-list'
import { RouteComponentProps } from 'react-router'
import glamorous from 'glamorous'

const Header = glamorous.div({
  backgroundColor: '#2c3e50',
  height: '100px',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

const green = '#85f7b5'
const lightBlue = '#8ed5f0'
const lightGrey = '#f2f6fc'
const grey = '#dadee4'

const Title = glamorous.h1({
  fontSize: '60px',
  color: green,
  margin: '0',
  fontWeight: 100,
})

const FlexWrapper = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
})

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

const Button = glamorous.button({
  background: `linear-gradient(to right, ${green}, ${lightBlue})`,
  height: '50px',
  width: '100px',
  borderRadius: '25px',
  margin: '20px',
  borderWidth: '0',
  outline: 'none',
  cursor: 'pointer',
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
    logOut: () => {
      dispatch({
        type: SESSION_ID_CHANGED,
        sessionId: '',
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
  logOut: () => void
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

    const content = chatSocket === null
      ? <p>
          <Link to="/login">goto login </Link>
        </p>
      : [
          <MessageList
            key="messages"
            messages={messages}
            users={users}
            self={self}
          />,
          <InputWrapper key="input">
            <TextInput
              onChange={this.onTextInput}
              value={this.state.messageContent}
            />
            <Button onClick={this.submit}>Send</Button>
          </InputWrapper>,
        ]

    return (
      <FlexWrapper>
        <Header>
          <Title>Waterchat</Title>
          {(() => {
            if (chatSocket)
              return <Button onClick={this.props.logOut}>Logout</Button>
            else return null
          })()}
        </Header>
        {content}
      </FlexWrapper>
    )
  }
}
export const Home = connect(mapState, mapDispatch)(HomeComponent)
