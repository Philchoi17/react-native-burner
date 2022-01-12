import * as React from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { Div } from 'react-native-magnus'
import { useNavigation } from '@react-navigation/core'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { PCText, PCIcon, PCMisc } from '@/Components'
import Logger from '@/Utils/Logger'
import { AppStackParams } from '@/Navigators/NavStackParams'
import { JournalRoutes } from '@/Screens/SCREENS'
import { handleLongString, dateFormat } from '@/Utils/misc'
// import { emojiType, emoji } from '@/Components/PCMisc'

// emoticon-cry-outline
// emoticon-sad-outline
// emoticon-neutral-outline
// emoticon-happy-outline
// emoticon-outline

type journalNavProp = NativeStackNavigationProp<AppStackParams, JournalRoutes>

interface MoodsProps {
  morning?: number
  afternoon?: number
  evening?: number
}

interface CategoryProps {}

interface Props {
  moods?: MoodsProps
  privateEntry?: boolean
  title: string
  entry: string
  journalDate: any
  category?: CategoryProps
}

// define journal type
// privateEntry: boolean
// journalTitle: string
// journalEntry: string
// journalDate: any
// moods MoodProps
// category: CategoryProps
//

export default function GDJournalListItem({
  moods,
  privateEntry = false,
  title,
  entry,
  journalDate,
  category,
}: Props) {
  const { navigate } = useNavigation<journalNavProp>()
  const [year, month, day] = journalDate.split('-')

  const navigateToWrite = () => {
    navigate(JournalRoutes.ENTRY_WRITE, {
      date: year + '-' + month + '-' + day,
    })
  }
  return (
    <TouchableWithoutFeedback onPress={navigateToWrite}>
      <Div
        rounded="xl"
        m="sm"
        p="sm"
        flex={1}
        borderColor="gray300"
        borderTopWidth={0.5}
        borderLeftWidth={0.5}>
        <Div row flex={1}>
          <Div flex={2} justifyContent="center" alignItems="center">
            <PCText size="3xl">{year}</PCText>
            <PCText size="xl">{`${month}/${day}`}</PCText>
          </Div>
          <Div flex={6.5}>
            <Div row justifyContent="space-around">
              <PCMisc.Emoji mood={moods?.morning ? moods.morning : 3} />
              <PCMisc.Emoji mood={moods?.afternoon ? moods.afternoon : 3} />
              <PCMisc.Emoji mood={moods?.evening ? moods.evening : 3} />
            </Div>
            <Div alignItems="center" pl="md" row m="sm">
              {category && (
                <PCIcon name="folder-star-outline" size="4xl" mr="sm" />
              )}
              <PCText size="2xl">{handleLongString(title, 25)}</PCText>
            </Div>
          </Div>
          <Div flex={1.5} justifyContent="center">
            <PCIcon
              name={privateEntry ? 'lock-outline' : 'lock-open-outline'}
              size="6xl"
            />
          </Div>
        </Div>
      </Div>
    </TouchableWithoutFeedback>
  )
}
