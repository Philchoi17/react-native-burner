import { AppRegistry } from 'react-native'
import App from './src/App'
import { name as appName } from './app.json'
import Config from '@/Config'

AppRegistry.registerComponent(appName, () =>
  Config.storybookOn() ? require('./storybook').default : App,
)
