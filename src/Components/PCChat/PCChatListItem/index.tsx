import * as React from 'react'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { Div } from 'react-native-magnus'

import { PCImage, PCText, PCIcon } from '@/Components'
import Styles from '@/Utils/Styles'
import Logger from '@/Utils/Logger'
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { ChatRoutes } from '@/Screens/SCREENS'
import { AppStackParams } from '@/Navigators/NavStackParams'
import { profileType } from '@/Types'
import { dateFormat, handleLongString } from '@/Utils/misc'

interface ParticipantProps extends profileType {
  nickname: string
  uid: string
  img?: string
}

interface Props {
  roomId: string
  participant: ParticipantProps
  lastMsg: string
  lastMsgTime?: FirebaseFirestoreTypes.Timestamp
}

type chatRoomNavProp = NativeStackNavigationProp<
  AppStackParams,
  ChatRoutes.ROOM
>

export default function PCChatListItem({
  roomId,
  participant,
  lastMsg,
  lastMsgTime,
}: Props) {
  Logger.debug('PCChatListItem: roomId =', roomId)
  const { navigate } = useNavigation<chatRoomNavProp>()
  const goTo = () => {
    navigate(ChatRoutes.ROOM, { participant, roomId })
  }
  return (
    <TouchableWithoutFeedback onPress={goTo}>
      <Div style={styles.container}>
        <Div row alignItems="center" p="md" justifyContent="space-between">
          <Div row alignItems="center">
            <PCImage
              h={63}
              w={63}
              imgSrc={Styles.images.smallLogo}
              rounded="circle"
            />
            <PCText size="xl" ml="lg" weight="500">
              {participant.nickname}
            </PCText>
          </Div>
          <Div mr="xl">
            <PCIcon name="new-box" size="6xl" color="red" />
          </Div>
        </Div>
        <Div row justifyContent="space-between" p="md">
          <PCText ml="lg" fontSize="xl" numberOfLines={1}>
            {handleLongString(lastMsg, 33)}
          </PCText>
          <PCText mr="md">{dateFormat(lastMsgTime)}</PCText>
        </Div>
      </Div>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
})
