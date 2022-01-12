import * as React from 'react'
import { Div } from 'react-native-magnus'
import { useNavigation } from '@react-navigation/core'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useFirebase, ExtendedFirebaseInstance } from 'react-redux-firebase'

import AuthContainer from '@/Containers/AuthContainer'
import {
  PCButton,
  PCKeyboardAvoider,
  PCImage,
  PCIcon,
  PCAlert,
} from '@/Components'
import { PCInput, PCForm, PCSubmitButton } from '@/Components/PCForms'
import Logger from '@/Utils/Logger'
// import { useLazyGetUsersQuery } from '@/Services/api'
import { AuthRoutes } from '../SCREENS'
import { AuthStackParams } from '@/Navigators/NavStackParams'

import { validationSchema } from './validation'
import Styles from '@/Utils/Styles'
import { set } from '@reduxjs/toolkit/node_modules/immer/dist/internal'

type navSignupProp = NativeStackNavigationProp<
  AuthStackParams,
  AuthRoutes.SIGNUP_SCREEN
>

interface Props {}

const { useState } = React
export default function Login({}: Props) {
  const firebase: ExtendedFirebaseInstance = useFirebase()
  const { login } = firebase

  const [signingIn, setSigningIn] = useState<boolean>(false)
  const [signInAlert, setSignInAlert] = useState<boolean>(false)
  const [loginErr, setLoginErr] = useState<string>('')
  // const [getUsers, { data, isSuccess, isLoading, isFetching, error }] =
  //   useLazyGetUsersQuery()

  // const fetchOneUser = () => {
  //   const user = getUsers(3)
  //   Logger.debug('user =', user, data, isSuccess, isLoading, isFetching, error)
  // }

  const signIn = async (loginCreds: { email: string; password: string }) => {
    setSigningIn(true)
    try {
      await login(loginCreds)
    } catch (error) {
      Logger.debug('signIn: error =', error)
      setLoginErr(String(error))
      setSignInAlert(true)
      setTimeout(() => setSignInAlert(false), 1000)
      return setSigningIn(false)
    }
  }

  const { navigate } = useNavigation<navSignupProp>()
  const navigateToSignup = () => navigate(AuthRoutes.SIGNUP_SCREEN)

  return (
    <>
      <PCAlert
        visible={signInAlert}
        alertTitle={'Unable To Login'}
        alertMsg={loginErr}
      />
      <AuthContainer
        headerProps={{
          heading: 'Login',
        }}>
        <Div p="sm" justifyContent="center" flex={1}>
          <PCKeyboardAvoider>
            <Div alignItems="center">
              <PCImage imgSrc={Styles.images.smallLogo} h={103} w={103} />
            </Div>
            <PCForm
              validationSchema={validationSchema}
              onSubmit={signIn}
              initialValues={{
                email: '',
                password: '',
              }}>
              <PCInput
                loading={signingIn}
                suffix={<PCIcon name="email-outline" size="4xl" />}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                textContentType="emailAddress"
                val="email"
                label="Email"
              />
              <PCInput
                loading={signingIn}
                suffix={<PCIcon name="lock-outline" size="4xl" />}
                autoCapitalize="none"
                autoCorrect={false}
                label="Password"
                textContentType="password"
                val="password"
                secureTextEntry
              />
              <Div row>
                <PCSubmitButton title={'Login'} />
                <PCButton ml="md" onPress={navigateToSignup}>
                  Signup
                </PCButton>
              </Div>
            </PCForm>
          </PCKeyboardAvoider>
        </Div>
      </AuthContainer>
    </>
  )
}
