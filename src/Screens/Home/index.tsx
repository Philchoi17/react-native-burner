import * as React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { Div, Button, Icon } from 'react-native-magnus'
import { useFirebase, ExtendedFirebaseInstance } from 'react-redux-firebase'

import MainContainer from '@/Containers/MainContainer'
import { PCText, PCTile, PCAlert, PCButton, PCIcon } from '@/Components'
import Styles from '@/Utils/Styles'
// import { AppRoutes } from '@/Screens/SCREENS'
import { StackNames } from '@/Navigators/STACKS'
import Logger from '@/Utils/Logger'
// import { fetchVideoToken } from '@/Services/fetchServices'
// import { useLazyGetTokenQuery } from '@/Services/api'

interface Props {}

interface ClientScreenProps {
  navigateTo: string
  imgSrc: any
  label: string
}

const clientScreens: ClientScreenProps[] = [
  {
    navigateTo: StackNames.SETTINGS_STACK,
    imgSrc: Styles.images.smallLogo,
    label: 'Test',
  },
  {
    navigateTo: StackNames.SETTINGS_STACK,
    imgSrc: Styles.images.smallLogo,
    label: 'Test',
  },
  {
    navigateTo: StackNames.SETTINGS_STACK,
    imgSrc: Styles.images.smallLogo,
    label: 'Test',
  },
  {
    navigateTo: StackNames.SETTINGS_STACK,
    imgSrc: Styles.images.smallLogo,
    label: 'Test',
  },
  {
    navigateTo: StackNames.SETTINGS_STACK,
    imgSrc: Styles.images.smallLogo,
    label: 'Test',
  },
  {
    navigateTo: StackNames.SETTINGS_STACK,
    imgSrc: Styles.images.smallLogo,
    label: 'Test',
  },
  {
    navigateTo: StackNames.SETTINGS_STACK,
    imgSrc: Styles.images.smallLogo,
    label: 'Test',
  },
  {
    navigateTo: StackNames.SETTINGS_STACK,
    imgSrc: Styles.images.smallLogo,
    label: 'Test',
  },
]

const { useState, useEffect } = React
export default function Home({}: Props) {
  const firebase: ExtendedFirebaseInstance = useFirebase()
  const { logout } = firebase

  const [logoutAlert, setLogoutAlert] = useState<boolean>(false)
  const toggleLogoutAlert = () => setLogoutAlert(!logoutAlert)

  // const [useReq, data] = useLazyGetTokenQuery()

  // const fetchToken = async () => {
  //   try {
  //     const videoToken = await fetchVideoToken()
  //     Logger.debug('videoToken =', videoToken)
  //   } catch (error) {
  //     Logger.debug('fetchToken: error =', error)
  //   }
  // }

  return (
    <>
      <PCAlert
        actionButtons
        alertMsg={'are your sure you want to logout?'}
        visible={logoutAlert}
        confirmAction={logout}
        cancelAction={toggleLogoutAlert}
      />
      <MainContainer
        headerProps={{
          heading: 'Home',
          headerRest: {
            prefix: null,
            suffix: (
              <Div pr="sm">
                <PCButton bg="transparent" left={3} onPress={toggleLogoutAlert}>
                  <PCIcon size="6xl" name="logout" />
                </PCButton>
              </Div>
            ),
          },
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Div row flexWrap="wrap">
            {clientScreens.map(
              (clientScreen: ClientScreenProps, idx: number) => (
                <PCTile
                  key={String(idx)}
                  label={clientScreen.label}
                  imgSrc={clientScreen.imgSrc}
                  navigateTo={clientScreen.navigateTo}
                />
              ),
            )}
          </Div>
        </ScrollView>
      </MainContainer>
    </>
  )
}
