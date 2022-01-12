import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { SettingsScreen, EditProfileScreen } from '@/Screens'
import { AppRoutes, ProfileRoutes } from '@/Screens/SCREENS'

const { Navigator, Screen } = createNativeStackNavigator()

export default function SettingsStack({}) {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen component={SettingsScreen} name={AppRoutes.SETTINGS_SCREEN} />
      <Screen component={EditProfileScreen} name={ProfileRoutes.EDIT_SCREEN} />
    </Navigator>
  )
}
