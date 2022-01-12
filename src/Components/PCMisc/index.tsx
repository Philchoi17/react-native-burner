import * as React from 'react'
import { StyleSheet } from 'react-native'
import {
  Div,
  WINDOW_HEIGHT as height,
  WINDOW_WIDTH as width,
} from 'react-native-magnus'

import { PCImage, PCText, PCIcon } from '@/Components'
import Styles from '@/Utils/Styles'

export enum emoji {
  CRY = 'emoticon-cry-outline',
  SAD = 'emoticon-sad-outline',
  NEU = 'emoticon-neutral-outline',
  HAP = 'emoticon-happy-outline',
  EXC = 'emoticon-outline',
}

export type emojiType =
  | emoji.CRY
  | emoji.SAD
  | emoji.NEU
  | emoji.HAP
  | emoji.EXC

interface SeperatorProps {
  color?: string
}

function Seperator({ color = 'gray300' }: SeperatorProps) {
  return <Div borderBottomWidth={0.5} borderBottomColor={color} rounded="xl" />
}

interface EmptyListProps {
  emptyText?: string
  moreActions?: JSX.Element
}

function EmptyList({ emptyText = 'Empty', moreActions }: EmptyListProps) {
  return (
    <Div style={styles.fullScreen} alignItems="center" justifyContent="center">
      <PCImage imgSrc={Styles.images.smallLogo} h={58} w={58} />
      <PCText size="2xl">{emptyText}</PCText>
      {moreActions && moreActions}
    </Div>
  )
}

interface EmojiProps {
  mood: number
}

function Emoji({ mood }: EmojiProps) {
  let color
  let emojiName
  switch (mood) {
    case 1:
      emojiName = emoji.CRY
      color = 'blue'
      break
    case 2:
      emojiName = emoji.SAD
      color = 'purple'
      break
    case 3:
      emojiName = emoji.NEU
      color = 'darkgrey'
      break
    case 4:
      emojiName = emoji.HAP
      color = 'yellow'
      break
    case 5:
      emojiName = emoji.EXC
      color = 'green'
      break
    default:
      emojiName = emoji.NEU
      color = 'darkgrey'
  }
  return <PCIcon name={emojiName} size={75} color={color} />
}

const styles = StyleSheet.create({
  fullScreen: {
    height,
    width,
  },
})

export default {
  Seperator,
  EmptyList,
  Emoji,
}
