import * as React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Div } from 'react-native-magnus'
import {
  useFirebase,
  useFirestore,
  ExtendedFirebaseInstance,
  ExtendedFirestoreInstance,
} from 'react-redux-firebase'
import { FormikHelpers } from 'formik'

import MainContainer from '@/Containers/MainContainer'
import {
  PCImage,
  PCIcon,
  PCKeyboardAvoider,
  PCAlert,
  PCActionSheetOpener,
} from '@/Components'
import { PCInput, PCForm, PCSubmitButton } from '@/Components/PCForms'
import { validationSchema } from './validation'
import Logger from '@/Utils/Logger'
import Styles from '@/Utils/Styles'
import { Collections, Keys } from '@/FireNames/Constants'

const { useState } = React
export default function Request({}) {
  const [firebase, firestore]: [
    ExtendedFirebaseInstance,
    ExtendedFirestoreInstance,
  ] = [useFirebase(), useFirestore()]

  // firebase methods
  const { auth } = firebase
  // firestore methods
  const { set, add, get } = firestore

  const [requestKey, setRequestKey] = useState<string>('Email')
  const [notFilledAlert, setNotFilledAlert] = useState<boolean>(false)
  const [notFoundAlert, setNotFoundAlert] = useState<boolean>(false)
  const [alreadyRequestedAlert, setAlreadyRequestedAlert] =
    useState<boolean>(false)
  const [okRequestAlert, setOkRequestAlert] = useState<boolean>(false)

  const [sending, setSending] = useState<boolean>(false)

  const sendRequest = async (
    requestParam: {
      email?: string
      nickname?: string
    },
    actions: FormikHelpers<unknown>,
  ) => {
    Logger.debug('sendRequest', requestParam)
    setSending(true)
    try {
      const [key, val] = Object.entries(requestParam)[0]
      if (val == '') {
        setNotFilledAlert(true)
        return setTimeout(() => setNotFilledAlert(false), 1000)
      }
      const searchKey = key.toLowerCase()
      Logger.debug('key =', key)
      Logger.debug('val =', val)

      const getUser = await get({
        collection: Collections.PUBLIC_USERS,
        where: [searchKey, '==', val],
      })
      if (getUser.docs.length != 1) {
        setNotFoundAlert(true)
        // actions.resetForm()
        // Logger.debug('actions =', actions)
        return setTimeout(() => setNotFoundAlert(false), 1000)
      }

      const gotUser = await getUser.docs.map((doc: any) => doc.data())[0]
      const { uid: requestee } = gotUser
      const { uid: requester } = await auth().currentUser

      const checkIfAlreadyRequested = async () => {
        const firstCheck = await get({
          collection: Collections.CHAT_REQUESTS,
          where: [
            // [Keys.REQUESTER, 'array-contains', [requester, requestee]],
            [Keys.REQUESTER, '==', requester],
            [Keys.REQUESTEE, '==', requestee],
          ],
        })
        const secondCheck = await get({
          collection: Collections.CHAT_REQUESTS,
          where: [
            [Keys.REQUESTER, '==', requestee],
            [Keys.REQUESTEE, '==', requester],
          ],
        })
        const lengthOf = [...firstCheck.docs, ...secondCheck.docs].length
        return lengthOf > 0
      }

      const alreadyRequested = await checkIfAlreadyRequested()

      if (alreadyRequested) {
        setAlreadyRequestedAlert(true)
        return setTimeout(() => setAlreadyRequestedAlert(false))
      }

      await add(Collections.CHAT_REQUESTS, {
        participants: [requestee, requester],
        requester,
        requestee,
        createdAt: new Date(),
        status: 'pending',
        updatedAt: new Date(),
      })
      setOkRequestAlert(true)
      return setTimeout(() => setOkRequestAlert(false), 1000)
    } catch (error) {
      Logger.debug('sendRequest: error =', error)
    } finally {
      setSending(false)
    }
  }

  /**
   *
   * @returns ronnie gave me this idea ( thank goodness )
   */
  const RequestKeyChanger = () => (
    <PCActionSheetOpener
      dropdownOptions={[
        {
          method: () => setRequestKey('Email'),
          text: 'Email',
          prefix: <PCIcon mr="md" name="email-plus-outline" size="5xl" />,
        },
        {
          method: () => setRequestKey('Nickname'),
          text: 'Nickname',
          prefix: <PCIcon mr="md" name="account-plus-outline" size="5xl" />,
        },
      ]}
      dropdownTitle={'Request Type'}>
      <PCIcon
        style={styles.requestSuffix}
        name={
          requestKey == 'Email' ? 'email-plus-outline' : 'account-plus-outline'
        }
        size="5xl"
      />
    </PCActionSheetOpener>
  )

  return (
    <>
      <PCAlert
        visible={notFilledAlert}
        alertTitle={'Request Form'}
        alertMsg={'Fill Out Input Box!'}
      />
      <PCAlert
        visible={notFoundAlert}
        alertTitle={'Not Found'}
        alertMsg={'User Does Not Exist!'}
      />
      <PCAlert
        visible={okRequestAlert}
        alertTitle={'Request Sent'}
        alertMsg={'Request Is Pending...'}
      />
      <PCAlert
        visible={alreadyRequestedAlert}
        alertTitle={'Already Requested'}
        alertMsg={'Please Wait For Response...'}
      />
      <MainContainer
        headerProps={{
          heading: 'Request',
        }}>
        <Div p="md" justifyContent="center" flex={1}>
          <PCKeyboardAvoider offset={150}>
            <Div alignSelf="center">
              <PCImage imgSrc={Styles.images.smallLogo} h={103} w={103} />
            </Div>
            <PCForm
              initialValues={{
                [requestKey]: '',
              }}
              onSubmit={sendRequest}
              validationSchema={validationSchema}>
              <PCInput
                loading={sending}
                autoCapitalize="none"
                autoCorrect={false}
                autoCompleteType={requestKey == 'Email' ? 'email' : 'username'}
                keyboardType={
                  requestKey == 'Email' ? 'email-address' : 'default'
                }
                placeholder={
                  requestKey == 'Email' ? 'user@gideb.com' : 'gidebuser'
                }
                label={requestKey}
                val={requestKey}
                suffix={<RequestKeyChanger />}
              />
              <PCSubmitButton title="Request" />
            </PCForm>
          </PCKeyboardAvoider>
        </Div>
      </MainContainer>
    </>
  )
}

const styles = StyleSheet.create({
  requestSuffix: {
    width: 30,
  },
})
