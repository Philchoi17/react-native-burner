import * as React from 'react'
import { StyleSheet } from 'react-native'
import { Div } from 'react-native-magnus'
import {
  useFirebase,
  ExtendedFirebaseInstance,
  useFirestore,
  ExtendedFirestoreInstance,
  authIsReady,
} from 'react-redux-firebase'

import { PCKeyboardAvoider } from '@/Components'
import { PCInput, PCForm, PCSubmitButton } from '@/Components/PCForms'
import AuthContainer from '@/Containers/AuthContainer'
import Logger from '@/Utils/Logger'
import Styles from '@/Utils/Styles'
import { validationSchema } from './validation'
import { profileType } from '@/Types'

interface Props {}

// autoCapitalize="none"
// autoCorrect={false}
// label="Password"
// textContentType="password"
// value="password"
// secureTextEntry

const { useEffect, useState } = React
export default function Signup({}: Props) {
  const [firebase, firestore]: [
    ExtendedFirebaseInstance,
    ExtendedFirestoreInstance,
  ] = [useFirebase(), useFirestore()]

  const { set } = firestore
  const { auth, updateProfile } = firebase

  const signupUseEffectHandler = () => {
    Logger.debug('use effect invoked')

    return () => {}
  }

  useEffect(signupUseEffectHandler, [])

  const signupUserHandler = async (userPkg: any) => {
    Logger.debug('userPkg =', userPkg)
    try {
      // 1. pick of email and password to create creds to createUser
      const { email, password } = userPkg
      // 2. createUser in firebase authentication
      delete userPkg.password
      delete userPkg.confirmPassword
      // userPkg.createdAt = await firestore.FieldValue.serverTimeStamp()
      userPkg.createdAt = new Date()
      await firebase.createUser({ email, password }, userPkg)
      // 3. set publicUser profile
      const { uid } = await auth().currentUser
      await set(`publicUsers/${uid}`, {
        ...userPkg,
        uid,
      })
      // 4. update profile in firestore
      await updateProfile(userPkg)
    } catch (error) {
      Logger.debug('signupUserHandler: error =', error)
    } finally {
      Logger.debug('finally finished')
    }
  }

  return (
    <AuthContainer
      headerProps={{
        heading: 'Signup',
      }}>
      <Div p="sm">
        <PCForm
          validationSchema={validationSchema}
          onSubmit={signupUserHandler}
          initialValues={{
            firstName: '',
            lastName: '',
            nickname: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}>
          <PCInput
            label="First name"
            val="firstName"
            autoCorrect={false}
            textContentType="givenName"
          />
          <PCInput
            label="Last name"
            val="lastName"
            autoCorrect={false}
            textContentType="name"
          />
          <PCInput
            label="Nickname"
            val="nickname"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="nickname"
          />
          <PCInput
            label="Email"
            val="email"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            textContentType="emailAddress"
          />
          <PCInput
            label="Password"
            val="password"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="password"
            secureTextEntry
          />
          <PCInput
            label="Confirm Password"
            val="confirmPassword"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="password"
            secureTextEntry
          />
          <Div row>
            <PCSubmitButton title="Signup" />
            {/* <PCButton onPress={firebase.logout}>Logout</PCButton> */}
          </Div>
        </PCForm>
      </Div>
    </AuthContainer>
  )
}
