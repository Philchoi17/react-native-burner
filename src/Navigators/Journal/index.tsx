import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { JournalRoutes } from '@/Screens/SCREENS'
import {
  JournalEntryListScreen,
  JournalEntryWriteScreen,
  JournalCommunityFeedScreen,
} from '@/Screens'

const { Navigator, Screen, Group } = createNativeStackNavigator()

export default function JournalStack({}) {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        component={JournalEntryListScreen}
        name={JournalRoutes.ENTRY_LIST}
      />
      <Screen
        component={JournalCommunityFeedScreen}
        name={JournalRoutes.COMMUNITY_FEED}
      />
      <Group screenOptions={{ presentation: 'fullScreenModal' }}>
        <Screen
          component={JournalEntryWriteScreen}
          name={JournalRoutes.ENTRY_WRITE}
        />
      </Group>
    </Navigator>
  )
}
