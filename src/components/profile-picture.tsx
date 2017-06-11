import glamorous from 'glamorous'

export const ProfilePicture = glamorous.div<
  { url?: string, diameter?: number }
>(
  {
    borderRadius: '50%',
    backgroundPosition: 'center',
    backgroundColor: 'black',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
  },
  ({ url = '', diameter = 50 }) => ({
    backgroundImage: `url(${url})`,
    height: `${diameter}px`,
    width: `${diameter}px`,
  })
)
