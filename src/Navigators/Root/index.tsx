import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { HomeScreen, PracticeScreen } from '@/Screens'
import { AppRoutes } from '@/Screens/SCREENS'

import Settings from '@/Navigators/Settings'
import Chat from '@/Navigators/Chat'
import Journal from '@/Navigators/Journal'
import { StackNames } from '../STACKS'

import { PCIcon } from '@/Components'
import Config from '@/Config'

const { Navigator, Screen } = createBottomTabNavigator()

const tabOptions = (
  tabBarIcon: ({ focused }: { focused: boolean }) => JSX.Element,
) => ({
  lazy: true,
  tabBarIcon,
})

export default function RootTabs() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <Screen
        component={HomeScreen}
        name={AppRoutes.HOME_SCREEN}
        options={tabOptions(({ focused }) => (
          <PCIcon name={focused ? 'home' : 'home-outline'} size="6xl" />
        ))}
      />
      <Screen
        component={Settings}
        name={StackNames.SETTINGS_STACK}
        options={tabOptions(({ focused }) => (
          <PCIcon
            name={focused ? 'account-settings' : 'account-settings-outline'}
            size="6xl"
          />
        ))}
      />
      {Config.chatFeatureOn() && (
        <Screen
          component={Chat}
          name={StackNames.CHAT_STACK}
          options={tabOptions(({ focused }) => (
            <PCIcon name={focused ? 'chat' : 'chat-outline'} size="6xl" />
          ))}
        />
      )}
      {Config.journalFeatureOn() && (
        <Screen
          component={Journal}
          name={StackNames.JOURNAL_STACK}
          options={tabOptions(({ focused }) => (
            <PCIcon
              name={focused ? 'pencil-box' : 'pencil-box-outline'}
              size="6xl"
            />
          ))}
        />
      )}
      {Config.practiceScreenOn() && (
        <Screen
          component={PracticeScreen}
          name={AppRoutes.PRACTICE_SCREEN}
          options={tabOptions(({ focused }) => (
            <PCIcon
              name={focused ? 'play-box' : 'play-box-outline'}
              size="6xl"
            />
          ))}
        />
      )}
    </Navigator>
  )
}
