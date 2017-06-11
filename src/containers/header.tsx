import * as React from 'react'
import { PureComponent } from 'react'
import { connect, MapStateToProps, Dispatch } from 'react-redux'
import { AppState } from '../redux/store'
import { WaterChatAction } from '../events/actions'
import { SESSION_ID_CHANGED } from '../events/actionIds'
import glamorous from 'glamorous'
import { green, darkBlue } from '../colors'
import { GradienButton } from '../components/generic'

const HeaderContainer = glamorous.div({
  backgroundColor: darkBlue,
  height: '100px',
  minHeight: '100px',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

const Title = glamorous.h1({
  fontSize: '60px',
  color: green,
  margin: '0',
  fontWeight: 100,
})

function mapDispatch(dispatch: Dispatch<WaterChatAction>) {
  return {
    logOut: () => {
      dispatch({
        type: SESSION_ID_CHANGED,
        sessionId: '',
      })
    },
  }
}

const mapState: MapStateToProps<HeaderProps, {}> = (
  state: AppState,
  ownProps
) => ({
  connected: state.chatSocket !== null,
})

type DispatchProps = {
  logOut: () => void
}

type HeaderProps = {
  connected: boolean
}

class HeaderComponent extends PureComponent<HeaderProps & DispatchProps, {}> {
  render() {
    const { connected, logOut } = this.props

    const logOutButton = connected
      ? <GradienButton onClick={logOut}>Logout</GradienButton>
      : null

    return (
      <HeaderContainer>
        <Title>Waterchat</Title>
        {logOutButton}
      </HeaderContainer>
    )
  }
}
export const Header = connect(mapState, mapDispatch)(HeaderComponent)
