import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { InitialScreen, LoginScreen, SignupScreen, QuizScreen } from '@/Screens'
// import SCREENS from '@/Screens/SCREENS'
import { AuthRoutes } from '@/Screens/SCREENS'

const { Navigator, Screen } = createNativeStackNavigator()

export default function AuthStack() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen component={InitialScreen} name={AuthRoutes.INITIAL_SCREEN} />
      <Screen component={LoginScreen} name={AuthRoutes.LOGIN_SCREEN} />
      <Screen component={SignupScreen} name={AuthRoutes.SIGNUP_SCREEN} />
      {/* temp */}
      <Screen component={QuizScreen} name={AuthRoutes.QUIZ_SCREEN} />
    </Navigator>
  )
}
