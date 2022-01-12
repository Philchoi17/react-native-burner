import * as React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Button, Div, Dropdown, DropdownRef } from 'react-native-magnus'
import { Route, useNavigation, useRoute } from '@react-navigation/native'
import {
  GiftedChat,
  GiftedChatProps,
  IMessage,
  InputToolbar,
  InputToolbarProps,
} from 'react-native-gifted-chat'
import {
  useFirebase,
  useFirestore,
  ExtendedFirebaseInstance,
  ExtendedFirestoreInstance,
  useFirestoreConnect,
  isLoaded,
} from 'react-redux-firebase'
import { useSelector } from 'react-redux'
// _id: string | number;
// text: string;
// createdAt: Date | number;
// user: User;
// image?: string;
// video?: string;
// audio?: string;
// system?: boolean;
// sent?: boolean;
// received?: boolean;
// pending?: boolean;
// quickReplies?: QuickReplies;

import Logger from '@/Utils/Logger'
import { chatUser, chatMsg } from '@/Utils/dataConverter'
import { profileType } from '@/Types'
import MainContainer from '@/Containers/MainContainer'
import { Collections, SubCollections, Keys } from '@/FireNames/Constants'
import { PCIcon, PCText, PCAlert, PCVideoChat, PCProgress } from '@/Components'
import Config from '@/Config'
import { RootRouteProps } from '@/Navigators/NavStackParams'
import { ChatRoutes } from '@/Screens/SCREENS'
import { fetchVideoToken } from '@/Services/fetchServices'

interface Props {
  participant?: any
  roomId?: string
}

const { useState, useCallback, useEffect, createRef } = React
export default function Room({}: Props) {
  const { params } = useRoute<RootRouteProps<ChatRoutes.ROOM>>()
  Logger.debug('participant =', params)
  const [firebase, firestore]: [
    ExtendedFirebaseInstance,
    ExtendedFirestoreInstance,
  ] = [useFirebase(), useFirestore()]

  const dropdownRef = createRef<any>()
  const openDropdown = () => dropdownRef.current.open()
  const closeDropdown = () => dropdownRef.current.close()

  const loaded = isLoaded()

  const [messages, setMessages] = useState<IMessage[]>([])
  const [gettingVideoCall, setGettingVideoCall] = useState<boolean>(false)
  const [videoChatPressed, setVideoChatPressed] = useState<boolean>(false)
  const [openVideoChat, setOpenVideoChat] = useState<boolean>(false)
  const [videoChatToken, setVideoChatToken] = useState<string>('')

  // pick off firestore methods needed
  const { add, get, update } = firestore
  // pick off firebase methods
  const { auth } = firebase

  const { profile } = useSelector(
    (state: { firebase: { profile: profileType } }) => state.firebase,
  )
  const { uid } = auth().currentUser

  useFirestoreConnect([
    {
      collection: Collections.CHATROOMS,
      doc: params.roomId,
      subcollections: [
        {
          collection: SubCollections.CHATS,
          // orderBy: [Keys.CREATED_AT, 'desc'],
          limit: 50,
        },
      ],
      storeAs: params.roomId,
    },
    {
      collection: Collections.CHATROOMS,
      doc: params.roomId,
    },
  ])

  const currentChat = useSelector(
    (state: any) => state.firestore.ordered[params.roomId],
  )

  const chatroom = useSelector(
    (state: any) => state.firestore.data.chatrooms[params.roomId],
  )

  const getToken = async () => {
    const gotToken = await fetchVideoToken()
    Logger.debug('gotToken =', gotToken)
    setVideoChatToken(gotToken.token)
  }

  const chatroomUseEffectHandler = () => {
    Logger.debug('chatroom =', chatroom)
    Logger.debug('chatroomUseEffectHandler')
    if (chatroom?.videoChatStatus) {
      if (chatroom.videoChatStatus.status == 'accepted') {
        getToken()
        setVideoChatPressed(false)
        setOpenVideoChat(true)
      }
      if (chatroom.videoChatStatus.requester != uid) {
        if (chatroom.videoChatStatus.status == 'ringing')
          setGettingVideoCall(true)
      }
    }
    return () => {}
  }

  useEffect(chatroomUseEffectHandler, [loaded, messages, currentChat, chatroom])

  const addMessageToFirestore = async (chatMsg: IMessage) => {
    try {
      const addMsg = await add(
        `${Collections.CHATROOMS}/${params.roomId}/chats`,
        chatMsg,
      )
      Logger.debug('addMsg =', addMsg)
      const updateLastMessage = update(
        `${Collections.CHATROOMS}/${params.roomId}`,
        {
          lastMessage: {
            from: uid,
            text: chatMsg.text,
            time: new Date(),
          },
        },
      )
      Logger.debug('updateLastMessage =', updateLastMessage)
    } catch (error) {
      Logger.debug('addMessageToFirestore: error =', error)
    }
  }

  const UploadImageToChatPicker = () => (
    <Dropdown
      ref={dropdownRef}
      mt="md"
      pb="xl"
      showSwipeIndicator={false}
      roundedTop="xl"
      title={
        <Div row mx="xl" alignItems="center" p="md" pb="lg">
          <Button
            bg="transparent"
            color="gray400"
            position="absolute"
            left={0}
            top={3}
            fontSize="xl"
            zIndex={1}
            onPress={closeDropdown}>
            Cancel
          </Button>
          <PCText
            color="gray900"
            textAlign="center"
            flex={1}
            fontSize="xl"
            fontWeight="bold">
            {'Upload a Photo'}
          </PCText>
        </Div>
      }>
      <Dropdown.Option
        onPress={() => Logger.debug('something')}
        prefix={
          <PCIcon
            name="add-a-photo"
            size="4xl"
            mr="lg"
            fontFamily="MaterialIcons"
          />
        }
        py="lg"
        mx="xl"
        px="md"
        block
        value={'Camera'}
        key={'camera-chat'}>
        {'Camera'}
      </Dropdown.Option>
      <Dropdown.Option
        onPress={() => Logger.debug('something')}
        prefix={
          <PCIcon
            name="add-photo-alternate"
            size="4xl"
            mr="lg"
            fontFamily="MaterialIcons"
          />
        }
        py="lg"
        mx="xl"
        px="md"
        block
        value={'Camera'}
        key={'library-chat'}>
        {'Library'}
      </Dropdown.Option>
    </Dropdown>
  )

  const videoChatHandler = async () => {
    setVideoChatPressed(true)
    try {
      await update(
        {
          collection: Collections.CHATROOMS,
          doc: params.roomId,
        },
        {
          videoChatStatus: {
            status: 'ringing',
            requester: uid,
            requesterName: profile.nickname,
          },
        },
      )
    } catch (error) {
      Logger.debug('videoChatHandler: error =', error)
    }
  }

  const handleIncomingVideoCall = async (accept: boolean) => {
    try {
      await update(
        {
          collection: Collections.CHATROOMS,
          doc: params.roomId,
        },
        {
          videoChatStatus: {
            status: accept ? 'accepted' : 'declined',
            requestee: uid,
            requester: chatroom?.videoChatStatus?.requester,
          },
        },
      )
      setGettingVideoCall(false)
      // if (accept) {
      //   setTimeout(() => {
      //     getToken()
      //     setOpenVideoChat(true)
      //   }, 1000)
      // }
    } catch (error) {
      Logger.debug('handleIncomingCall: error =', error)
    }
  }

  const RenderInputToolbar = (props: InputToolbarProps) =>
    Config.chatFeatureMediaUploadOn() ? (
      <InputToolbar {...props} onPressActionButton={openDropdown} />
    ) : (
      <InputToolbar {...props} />
    )

  const onSend = useCallback((messages = []) => {
    setMessages((prevMsgs) => GiftedChat.append(prevMsgs, messages))
    addMessageToFirestore(chatMsg({ ...messages[0], uid }))
  }, [])

  return (
    <>
      <PCVideoChat
        visible={openVideoChat}
        close={() => setOpenVideoChat(false)}
        accessToken={videoChatToken}
      />
      <PCAlert
        visible={gettingVideoCall}
        alertTitle={'getting phone call'}
        alertMsg={`From: ${chatroom?.videoChatStatus?.requesterName}`}
        actionButtons
        confirmAction={() => handleIncomingVideoCall(true)}
        cancelAction={() => handleIncomingVideoCall(false)}
      />
      {videoChatPressed ? (
        <Div flex={1} alignItems="center" justifyContent="center">
          <PCProgress type="circle" />
        </Div>
      ) : (
        <MainContainer
          headerProps={{
            heading: 'Chatroom',
            headerRest: {
              suffix: Config.chatFeatureVideoChatOn() ? (
                <Div row p="md">
                  <TouchableOpacity onPress={videoChatHandler}>
                    <PCIcon name="video-outline" size="6xl" />
                  </TouchableOpacity>
                </Div>
              ) : null,
            },
          }}>
          <GiftedChat
            placeholder={'Say Hi...'}
            inverted
            messages={currentChat
              ?.map((chat: any) => {
                return { ...chat, createdAt: new Date(chat.createdAt.toDate()) }
              })
              .sort((a: any, b: any) => b.createdAt - a.createdAt)}
            showAvatarForEveryMessage
            onSend={onSend}
            user={chatUser(profile, uid)}
            renderInputToolbar={RenderInputToolbar}
          />
        </MainContainer>
      )}
      <UploadImageToChatPicker />
    </>
  )
}

const styles = StyleSheet.create({})
