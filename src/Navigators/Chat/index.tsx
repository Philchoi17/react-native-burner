import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { ChatRoutes } from '@/Screens/SCREENS'
import {
  ChatroomListScreen,
  ChatroomScreen,
  ChatRequestScreen,
  ChatRequestPendingScreen,
} from '@/Screens'

const { Navigator, Screen, Group } = createNativeStackNavigator()

export default function ChatStack({}) {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen component={ChatroomListScreen} name={ChatRoutes.ROOM_LIST} />
      <Screen component={ChatRequestScreen} name={ChatRoutes.REQUEST} />
      <Screen component={ChatRequestPendingScreen} name={ChatRoutes.PENDING} />
      <Group screenOptions={{ presentation: 'fullScreenModal' }}>
        <Screen component={ChatroomScreen} name={ChatRoutes.ROOM} />
      </Group>
    </Navigator>
  )
}
