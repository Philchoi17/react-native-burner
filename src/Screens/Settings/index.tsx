import * as React from 'react'
import { StyleSheet } from 'react-native'
import { Div } from 'react-native-magnus'
import { useFirebase, ExtendedFirebaseInstance } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/core'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { request, PERMISSIONS } from 'react-native-permissions'

import MainContainer from '@/Containers/MainContainer'
import { PCButton, PCCard } from '@/Components'
import Logger from '@/Utils/Logger'
import { profileType } from '@/Types'
import { AppStackParams } from '@/Navigators/NavStackParams'
import { AppRoutes, ProfileRoutes } from '@/Screens/SCREENS'
import { imageURI } from '@/Utils/dataConverter'
import Styles from '@/Utils/Styles'

interface Props {}

type appNavType = NativeStackNavigationProp<AppStackParams>

const { useEffect } = React
export default function Settings({}: Props) {
  const firebase: ExtendedFirebaseInstance = useFirebase()

  const { profile } = useSelector(
    (state: { firebase: { profile: profileType } }) => state.firebase,
  )

  const { navigate } = useNavigation<appNavType>()

  const loggingProfile = () => Logger.debug('profile =', profile)

  const goToProfileScreen = () => navigate(ProfileRoutes.EDIT_SCREEN)

  useEffect(loggingProfile, [])

  const { logout } = firebase
  return (
    <MainContainer headerProps={{ heading: 'Settings' }}>
      <Div p="md">
        <PCCard
          profileProps={{
            image: profile.photoURL
              ? imageURI(profile.photoURL)
              : Styles.images.smallLogo,
            firstName: profile.firstName,
            lastName: profile.lastName,
            email: profile.email,
            nickname: profile.nickname,
            editable: true,
            editFunction: () => goToProfileScreen(),
          }}
        />
        <PCButton onPress={logout}>Logout</PCButton>
      </Div>
    </MainContainer>
  )
}

const styles = StyleSheet.create({})
