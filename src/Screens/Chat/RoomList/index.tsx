import * as React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import {
  Div,
  WINDOW_HEIGHT as height,
  WINDOW_WIDTH as width,
} from 'react-native-magnus'
import {
  useFirebase,
  useFirestore,
  ExtendedFirebaseInstance,
  ExtendedFirestoreInstance,
} from 'react-redux-firebase'
import { useNavigation } from '@react-navigation/core'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import MainContainer from '@/Containers/MainContainer'
import { PCText, PCImage, PCButton, PCIcon, PCMisc } from '@/Components'
import { PCChatListItem } from '@/Components/PCChat'
import Logger from '@/Utils/Logger'
import Styles from '@/Utils/Styles'
import { AppStackParams } from '@/Navigators/NavStackParams'
import { ChatRoutes } from '@/Screens/SCREENS'
import { Collections, Keys } from '@/FireNames/Constants'
import { chatRoomType, profileType } from '@/Types'

interface ChatRoomsProp extends chatRoomType {
  id: string
}

type chatRoomNavProp = NativeStackNavigationProp<AppStackParams, ChatRoutes>

const { useState, useEffect } = React
export default function RoomList({}) {
  const [firebase, firestore]: [
    ExtendedFirebaseInstance,
    ExtendedFirestoreInstance,
  ] = [useFirebase(), useFirestore()]
  const { navigate } = useNavigation<chatRoomNavProp>()
  const [chatrooms, setChatrooms] = useState<ChatRoomsProp[]>([])

  const { auth } = firebase
  const { get } = firestore

  const { uid } = auth().currentUser

  const getChatrooms = async () => {
    const rooms = await get({
      collection: Collections.CHATROOMS,
      where: [[Keys.PARTICIPANTS, 'array-contains', uid]],
    })

    const gotRooms = await rooms.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }))
    // Logger.debug('gotRooms =', gotRooms)
    setChatrooms(gotRooms)
  }

  const roomListUseEffectHandler = () => {
    getChatrooms()
    Logger.debug('roomListUseEffectHandler')
  }

  useEffect(roomListUseEffectHandler, [])

  const RenderItem = ({ item }: any) => {
    const { lastMessage = null, profileDetails, id } = item
    const entries = Object.entries(profileDetails)
    const participant: any = entries.filter(
      ([key, val]: [string, any]) => key != uid,
    )[0][1]
    return (
      <PCChatListItem
        roomId={id}
        participant={participant}
        lastMsg={lastMessage.text}
        lastMsgTime={lastMessage.time.toDate()}
      />
    )
  }

  const goToRequest = () => {
    navigate(ChatRoutes.REQUEST)
  }

  const RequestButton = () => (
    <PCButton bg="transparent" onPress={goToRequest} w={55} p="none">
      <PCIcon name="account-plus-outline" size="6xl" />
    </PCButton>
  )

  const goToPending = () => {
    navigate(ChatRoutes.PENDING)
  }

  const PendingButton = () => (
    <PCButton bg="transparent" onPress={goToPending} w={55} p="none">
      <PCIcon name="account-question-outline" size="6xl" />
    </PCButton>
  )

  return (
    <MainContainer
      headerProps={{
        heading: 'Chatrooms',
        headerRest: {
          suffix: (
            <Div row>
              <PendingButton />
              <RequestButton />
            </Div>
          ),
        },
      }}>
      <Div p="md">
        <FlatList
          style={{ height }}
          ListEmptyComponent={<PCMisc.EmptyList emptyText={'No Chats...'} />}
          ItemSeparatorComponent={PCMisc.Seperator}
          data={chatrooms}
          renderItem={RenderItem}
          keyExtractor={({ id }) => id}
        />
      </Div>
    </MainContainer>
  )
}

const styles = StyleSheet.create({
  fullScreen: {
    height,
    width,
  },
})
