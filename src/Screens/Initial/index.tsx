import * as React from 'react'
import { Div, Icon } from 'react-native-magnus'
import { useNavigation } from '@react-navigation/core'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import AuthContainer from '@/Containers/AuthContainer'
import { PCAlert, PCImage, PCText, PCButton } from '@/Components'
import { AuthRoutes } from '../SCREENS'
import Styles from '@/Utils/Styles'
import Logger from '@/Utils/Logger'
import { AuthStackParams } from '@/Navigators/NavStackParams'

type authScreenProp = NativeStackNavigationProp<
  AuthStackParams,
  AuthRoutes.LOGIN_SCREEN
>

interface Props {}

export default function Initial({}: Props) {
  const navigation = useNavigation<authScreenProp>()

  const navigateToLoginScreen = () => {
    navigation.navigate(AuthRoutes.LOGIN_SCREEN)
  }

  return (
    <AuthContainer>
      <Div alignItems="center" flex={1} justifyContent="center" px="sm">
        <PCImage imgSrc={Styles.images.smallLogo} h={50} w={50} />
        <PCText>Initial Screen</PCText>
        <PCButton block onPress={navigateToLoginScreen} mb="xs">
          Press
        </PCButton>
      </Div>
    </AuthContainer>
  )
}
