import * as React from 'react'
import { Div } from 'react-native-magnus'
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'

import { PCText, PCImage, PCButton, PCIcon } from '@/Components'
import Styles from '@/Utils/Styles'
import Logger from '@/Utils/Logger'
import { imageURI } from '@/Utils/dataConverter'
import { dateFormat } from '@/Utils/misc'

interface ProfileProp {
  createdAt: FirebaseFirestoreTypes.Timestamp
  email: string
  firstName: string
  lastName: string
  nickname: string
  photoURL?: string
}

interface Props {
  profile: ProfileProp
  status?: string
  sentAt?: any
  accept?: () => void
  decline?: () => void
  type: 'sent' | 'received'
}

export default function PCPendingRequestItem({
  profile,
  status,
  sentAt,
  accept = () => {},
  decline = () => {},
  type,
}: Props) {
  const { nickname, photoURL = null } = profile
  return (
    <Div w="100%" row borderBottomColor="gray400" borderBottomWidth={1}>
      <Div flex={3} alignItems="center" justifyContent="center">
        <PCImage
          imgSrc={photoURL ? imageURI(photoURL) : Styles.images.smallLogo}
          h={58}
          w={58}
          rounded="circle"
        />
      </Div>
      <Div
        flex={7}
        alignItems="center"
        justifyContent="space-between"
        p="sm"
        row>
        <PCText size="xl">{nickname}</PCText>
        {type == 'received' ? (
          <Div row alignItems="center" justifyContent="center">
            <PCButton onPress={accept} w={35} p="none" bg="transparent">
              <PCIcon color="green" name="check" size="4xl" />
            </PCButton>
            <PCButton onPress={decline} w={35} p="none" bg="transparent">
              <PCIcon color="red" name="cancel" size="4xl" />
            </PCButton>
          </Div>
        ) : (
          <Div>
            <PCText>{`${status} since \n ${dateFormat(sentAt)}`}</PCText>
          </Div>
        )}
      </Div>
    </Div>
  )
}
