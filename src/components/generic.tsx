import glamorous, { CSSProperties } from 'glamorous'
import { green, lightBlue } from '../colors'
import { Link } from 'react-router-dom'

export const FillContainer = glamorous.div({
  width: '100%',
  height: '100%',
})

const gradientButtonStyle: CSSProperties = {
  background: `linear-gradient(to right, ${green}, ${lightBlue})`,
  height: '50px',
  minWidth: '100px',
  borderRadius: '25px',
  margin: '20px',
  borderWidth: '0',
  outline: 'none',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textDecoration: 'none',
  color: 'white',
  fontWeight: 500,
  fontFamily: 'Raleway,sans-serif',
  fontSize: '16px',
}

export const GradienButton = glamorous.button(gradientButtonStyle)

export const GradienButtonLink = glamorous(Link)(gradientButtonStyle)
export const GradienButtonExternalLink = glamorous.a(gradientButtonStyle)

export const FlexColumnWrapper = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
})

export const FlexRowWrapper = glamorous.div({
  display: 'flex',
  flexDirection: 'row',
  height: '100%',
  width: '100%',
})

export const FlexColumnCenteredWrapper = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%',
})
