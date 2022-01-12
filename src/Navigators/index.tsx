import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {
  useFirebase,
  ExtendedFirebaseInstance,
  useFirestore,
  ExtendedFirestoreInstance,
} from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'

import AuthStack from './Auth'
import RootTabs from './Root'
import Logger from '@/Utils/Logger'
import { PCLoading } from '@/Components'

const { useEffect, useState } = React
export default function Navigator() {
  const [firebase, firestore]: [
    ExtendedFirebaseInstance,
    ExtendedFirestoreInstance,
  ] = [useFirebase(), useFirestore()]
  const { profile } = useSelector((state: any) => state.firebase)

  const [user, setUser] = useState<any>()
  const [initializing, setInitializing] = useState<boolean>(false)

  const onAuthStateChanged = async (user: any) => {
    setInitializing(true)
    setUser(user)
    try {
      if (user) {
        // const lastSeenAt = await firestore.FieldValue.serverTimeStamp()
        const lastSeenAt = new Date()
        await firebase.updateProfile({
          lastSeenAt,
        })
      }
    } catch (error) {
      Logger.debug('Navigator: onAuthStateChanged: error =', error)
    } finally {
      setInitializing(false)
    }
  }

  const navigatorUseEffectHandler = () => {
    Logger.debug(
      'navigator useEffect invoked: profile =',
      profile,
      firestore.FieldValue.serverTimestamp(),
      // firebase.firestore.FieldValue().serverTimeStamp(),
    )
    const unsubscribe = auth().onAuthStateChanged(onAuthStateChanged)
    return () => unsubscribe()
  }
  useEffect(navigatorUseEffectHandler, [])

  return initializing ? (
    <PCLoading />
  ) : (
    <NavigationContainer>
      {profile.email ? <RootTabs /> : <AuthStack />}
    </NavigationContainer>
  )
}
