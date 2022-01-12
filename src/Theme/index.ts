import { ThemeType } from 'react-native-magnus'

interface MyTheme extends ThemeType {}

const themes = {
  default: <MyTheme>{
    name: 'default',
    colors: {
      light: '#FFF',
      dark: '#000',
      gray900: '#121212',
      gray300: '#DFDFDF',
      error: '#c53030',
      quarterOpacity: 'rgba(0, 0, 0, 0.25)',
    },
    fontSize: {
      bigText100: 40,
    },
  },
  // other user types
}

export default themes
