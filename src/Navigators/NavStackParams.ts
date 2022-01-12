import {
  AuthRoutes,
  AppRoutes,
  ProfileRoutes,
  ChatRoutes,
  JournalRoutes,
} from '@/Screens/SCREENS'
import { RouteProp } from '@react-navigation/native'

export type AuthStackParams = {
  [AuthRoutes.INITIAL_SCREEN]: undefined
  [AuthRoutes.LOGIN_SCREEN]: undefined
  [AuthRoutes.SIGNUP_SCREEN]: undefined
  // TEMP
  [AuthRoutes.QUIZ_SCREEN]: undefined
}

export type AppStackParams = {
  [AppRoutes.HOME_SCREEN]: undefined
  [AppRoutes.QUIZ_SCREEN]: undefined
  [AppRoutes.SETTINGS_SCREEN]: undefined
  [ProfileRoutes.EDIT_SCREEN]: undefined
  // chat screens
  [ChatRoutes.ROOM_LIST]: undefined
  [ChatRoutes.ROOM]: {
    participant: {
      nickname: string
      uid: string
      img?: string
    }
    roomId: string
  }
  [ChatRoutes.REQUEST]: undefined
  [ChatRoutes.PENDING]: undefined
  // journal screens
  [JournalRoutes.ENTRY_LIST]: undefined
  [JournalRoutes.ENTRY_WRITE]: { date: string }
  [JournalRoutes.COMMUNITY_FEED]: undefined
}

export type RootRouteProps<RouteName extends keyof AppStackParams> = RouteProp<
  AppStackParams,
  RouteName
>
