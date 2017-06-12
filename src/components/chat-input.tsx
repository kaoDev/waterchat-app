import * as React from 'react'
import { PureComponent } from 'react'
import glamorous from 'glamorous'
import { grey, lightGrey } from '../colors'
import { GradienButton } from '../components/generic'

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
  padding: '8px',
})

type ChatInputState = {
  messageContent: string,
}

export type ChatInputProps = {
  onSubmit: (content: string, channelId: string) => void,
}

export class ChatInput extends PureComponent<ChatInputProps, ChatInputState> {
  state = { messageContent: '' }

  onTextInput = (event: React.FormEvent<HTMLTextAreaElement>) => {
    this.setState({
      messageContent: (event.target as HTMLTextAreaElement).value,
    })
  }

  submit = () => {
    const content = this.state.messageContent
    const channelId = 'public'
    this.props.onSubmit(content, channelId)

    this.setState({
      messageContent: '',
    })
  }

  submitOnEnter = (event: React.KeyboardEvent<any>) => {
    if (event.keyCode === 13 /* ENTER */) {
      this.submit()
    }
  }

  render() {
    return (
      <InputWrapper key="input">
        <TextInput
          onKeyUp={this.submitOnEnter}
          onChange={this.onTextInput}
          value={this.state.messageContent}
        />
        <GradienButton onClick={this.submit}>Send</GradienButton>
      </InputWrapper>
    )
  }
}
