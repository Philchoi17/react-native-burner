import * as React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { Div, WINDOW_HEIGHT as height } from 'react-native-magnus'
import {
  useFirebase,
  useFirestore,
  ExtendedFirebaseInstance,
  ExtendedFirestoreInstance,
} from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/core'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import MainContainer from '@/Containers/MainContainer'
import { PCText, PCAlert, PCButton } from '@/Components'
import { PCPendingRequestItem } from '@/Components/PCChat'
import { PCForm, PCInput, PCSubmitButton } from '@/Components/PCForms'
import Logger from '@/Utils/Logger'
import { pendingRequestType, profileType } from '@/Types'
import { Collections, Keys } from '@/FireNames/Constants'
import { ChatRoutes } from '@/Screens/SCREENS'
import { AppStackParams } from '@/Navigators/NavStackParams'
import { validationSchema } from './validation'
import { getFirestoreRef } from '@/Utils/fire'

interface PendingRequestProp extends pendingRequestType {
  profile: profileType
  id: string
}

interface Props {}

type chatRoomNavProp = NativeStackNavigationProp<AppStackParams, ChatRoutes>

const { useEffect, useState } = React
export default function Pending({}: Props) {
  const [firebase, firestore]: [
    ExtendedFirebaseInstance,
    ExtendedFirestoreInstance,
  ] = [useFirebase(), useFirestore()]

  const { navigate } = useNavigation<chatRoomNavProp>()

  const [pendingRequests, setPendingRequests] = useState<PendingRequestProp[]>(
    [],
  )
  const [acceptedUser, setAcceptedUser] = useState<any | null>(null)
  const [sendMsgAlert, setSendMsgAlert] = useState<boolean>(false)
  const [creatingChatroom, setCreatingChatroom] = useState<boolean>(false)

  // const [sentRequests, setSentRequests] = useState<pendingRequestType[]>([])
  // const [receivedRequests, setReceivedRequests] =
  //   useState<pendingRequestType[]>()

  const { profile } = useSelector(
    (state: { firebase: { profile: profileType } }) => state.firebase,
  )

  // methods from firestore
  const { get, update, add, runTransaction } = firestore
  // methods from firebase
  const { auth } = firebase
  const { uid } = auth().currentUser

  const counterTransaction = async (
    collection: string,
    docPath: string,
    options: {
      method: string
      // condition:
    },
    data?: object,
  ) => {
    try {
      const path = `${collection}/${docPath}`
      const ref = getFirestoreRef(path)
      Logger.debug('ref =', ref)
      const tryTransaction = await runTransaction((transaction: any) => {
        transaction[options.method](ref)
          .then((doc: any) => {
            // condition here
            transaction.create(ref, data)
            return Promise.resolve(data)
          })
          .catch((err: any) => Logger.debug('counterTransaction: err =', err))
      })
      Logger.debug('tryTransaction =', tryTransaction)
    } catch (error) {
      Logger.debug('counterTransaction: error =', error)
    }
  }

  const publicUserHandler = async (otherUid: string) => {
    const getUser = await get({
      collection: Collections.PUBLIC_USERS,
      where: [Keys.UID, '==', otherUid],
    })
    Logger.debug('getUser =', getUser)
    const gotUser = await getUser.docs.map((doc: any) => doc.data())[0]
    Logger.debug('gotUser =', gotUser)
    return gotUser
  }

  const getPendingRequests = async () => {
    try {
      const getRequests = await get({
        collection: Collections.CHAT_REQUESTS,
        where: [
          [Keys.PARTICIPANTS, 'array-contains', uid],
          [Keys.STATUS, '==', 'pending'],
        ],
      })
      Logger.debug('getRequests =', getRequests)
      const requestsPending = await getRequests.docs.map(async (doc: any) => {
        const pendingRequest: pendingRequestType = await doc.data()
        const { id } = doc
        if (pendingRequest.participants[0] == uid) {
          const profile = await publicUserHandler(
            pendingRequest.participants[1],
          )
          return {
            ...pendingRequest,
            profile,
            id,
          }
        } else {
          const profile = await publicUserHandler(
            pendingRequest.participants[0],
          )
          return {
            ...pendingRequest,
            profile,
            id,
          }
        }
      })
      const promiseResolver: any = await Promise.all(requestsPending)
      Logger.debug('requestsPending =', promiseResolver)
      setPendingRequests(promiseResolver)
    } catch (error) {
      Logger.debug('getPendingRequests: error =', error)
    }
  }

  const pendingScreenUseEffectHandler = () => {
    Logger.debug('pendingScreenUserEffectHandler')
    getPendingRequests()
  }

  const requestHandler = async (
    requestId: string,
    requester: string,
    requestee: string,
    accepted: boolean,
  ) => {
    Logger.debug('requester =', requester)
    Logger.debug('requestee =', requestee)
    try {
      await update(`${Collections.CHAT_REQUESTS}/${requestId}`, {
        [Keys.STATUS]: accepted ? 'accepted' : 'declined',
        [Keys.UPDATED_AT]: new Date(),
      })
      if (accepted) setSendMsgAlert(true)
    } catch (error) {
      Logger.debug('acceptRequestHandler: error =', error)
    }
  }

  useEffect(pendingScreenUseEffectHandler, [])

  const createChatRoom = async (
    requester: string,
    requestee: any,
    sendMsg: string,
    requesterInfo?: profileType,
    // requesteeInfo?: profileType,
  ) => {
    setCreatingChatroom(true)
    try {
      const makeChatroomRef = await add(Collections.CHATROOMS, {
        createdAt: new Date(),
        updatedAt: new Date(),
        lastMessage: {
          text: sendMsg,
          from: requester,
          time: new Date(),
        },
        participants: [requester, requestee?.uid],
        profileDetails: {
          [requester]: requesterInfo,
          [requestee?.uid ?? '--']: requestee,
        },
      })

      setCreatingChatroom(false)
      if (makeChatroomRef) {
        const makeMessagesSubCollection = await add(
          `${Collections.CHATROOMS}/${makeChatroomRef.id}/chats`,
          {
            uid,
            _id: 1,
            text: sendMsg,
            createdAt: new Date(),
            user: {
              _id: uid,
              name: profile.nickname,
              avatar: profile.photoURL || null,
            },
          },
        )
        Logger.debug('makeMessagesSubCollection =', makeMessagesSubCollection)
        const participant: any = requestee
        setSendMsgAlert(false)
        navigate(ChatRoutes.ROOM, { participant, roomId: makeChatroomRef.id })
      }
    } catch (error) {
      Logger.debug('createChatroom: error =', error)
    }
  }

  const InputActions = () => (
    <PCForm
      onSubmit={({ sendMsg }: { sendMsg: string }) => {
        try {
          createChatRoom(uid, acceptedUser, sendMsg, profile)
        } catch (error) {
          Logger.debug('InputActions: onSubmit: error =', error)
        }
      }}
      validationSchema={validationSchema}
      initialValues={{
        sendMsg: '',
      }}>
      <PCInput
        loading={creatingChatroom}
        val={'sendMsg'}
        suffix={<PCSubmitButton inputSuffix suffixName="send-outline" />}
      />
    </PCForm>
  )

  return (
    <>
      <PCAlert
        alertTitle={'Send Message'}
        alertMsg={`To: ${acceptedUser?.nickname}`}
        visible={sendMsgAlert}
        withInput
        inputActions={<InputActions />}
      />
      <MainContainer
        headerProps={{
          heading: 'Pending Requests',
        }}>
        <ScrollView style={styles.scrollViewContainer}>
          <Div p="md" h={height / 2} flex={1} borderWidth={1}>
            <PCText size="xl">Sent Requests</PCText>
            {pendingRequests
              .filter((req: PendingRequestProp) => req.requester == uid)
              .map((request, idx) => (
                <PCPendingRequestItem
                  key={String(idx)}
                  profile={request.profile}
                  type="sent"
                  status={request.status}
                  sentAt={request.createdAt.toDate()}
                />
              ))}
          </Div>
          <Div p="md" flex={1} borderWidth={1} h={height / 2}>
            <PCText size="xl">Received Requests</PCText>
            {pendingRequests
              .filter((req) => req.requester != uid)
              .map((request, idx) => (
                <PCPendingRequestItem
                  key={String(idx)}
                  accept={() => {
                    const { id, requester, requestee } = request
                    setAcceptedUser({
                      ...request.profile,
                      uid: requester,
                    })
                    requestHandler(id, requester, requestee, true)
                  }}
                  decline={() => {
                    const { id, requester, requestee } = request
                    requestHandler(id, requester, requestee, false)
                  }}
                  profile={request.profile}
                  type="received"
                />
              ))}
          </Div>
        </ScrollView>
      </MainContainer>
    </>
  )
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    height,
  },
})
