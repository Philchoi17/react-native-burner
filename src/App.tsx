import * as React from 'react'
import { Platform, StatusBar, AppState, AppStateStatus } from 'react-native'
import { ThemeProvider } from 'react-native-magnus'
import { useAppState } from '@react-native-community/hooks'
import { checkAndRequest } from '@/Utils/permissions'

import Theme from '@/Theme'
import Navigator from '@/Navigators'

import Logger from '@/Utils/Logger'
import RRFProvider from './Store'

const { useEffect } = React
export default function App() {
  const state = useAppState()
  useEffect(() => {
    Logger.debug('src: App.tsx: state has changed', state)
    const appPermissionListener = async (status: AppStateStatus) => {
      try {
        if (Platform.OS == 'ios' && status == 'active') {
          const appTrackingTransparency = await checkAndRequest([
            'transparency',
          ])
          Logger.debug('appTrackingTransparency =', appTrackingTransparency)
          // const appTrackingTransparency = await request(
          //   PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY,
          // )
          // Logger.debug('appTrackingTransparency =', appTrackingTransparency)
        }
      } catch (error) {
        Logger.debug('appPermissionListener: error =', error)
      }
    }
    const listener = AppState.addEventListener('change', appPermissionListener)

    return listener.remove
  }, [state])

  return (
    <RRFProvider>
      <ThemeProvider theme={Theme.default}>
        <StatusBar barStyle="dark-content" />
        <Navigator />
      </ThemeProvider>
    </RRFProvider>
  )
}
