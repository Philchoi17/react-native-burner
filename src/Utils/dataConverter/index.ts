import { profileType } from '@/Types'
import Styles from '@/Utils/Styles'
import { IMessage } from 'react-native-gifted-chat'

export function imageURI(uri: string) {
  return { uri }
}

export function chatUser(profile: profileType, _id: string) {
  return {
    _id,
    name: profile.nickname,
    avatar: profile?.photoURL ? profile.photoURL : Styles.images.smallLogo,
  }
}

interface ChatMsgProps extends IMessage {
  uid: string
}

export function chatMsg(message: ChatMsgProps) {
  const { _id, createdAt, text, user, uid } = message
  return {
    uid,
    _id,
    createdAt,
    text,
    user,
  }
}
