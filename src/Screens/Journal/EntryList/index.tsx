import * as React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { Div, WINDOW_HEIGHT as height } from 'react-native-magnus'
import { useNavigation } from '@react-navigation/core'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import {
  useFirebase,
  useFirestore,
  ExtendedFirebaseInstance,
  ExtendedFirestoreInstance,
  ExtendedAuthInstance,
} from 'react-redux-firebase'

import MainContainer from '@/Containers/MainContainer'
import { PCImage, PCText, PCMisc, PCButton, PCIcon } from '@/Components'
import { GDJournalListItem } from '@/Components/GDJournal'
import Styles from '@/Utils/Styles'
import Logger from '@/Utils/Logger'
import { AppStackParams } from '@/Navigators/NavStackParams'
import { JournalRoutes } from '@/Screens/SCREENS'
import { dateFormat } from '@/Utils/misc'
import { Collections, Keys } from '@/FireNames/Constants'

interface Props {}

const TEMP_ENTRIES: any[] = [{ id: '1' }, { id: '2' }, { id: '3' }]

type journalNavProp = NativeStackNavigationProp<AppStackParams, JournalRoutes>

const { useEffect, useState } = React
export default function EntryList({}: Props) {
  const { navigate } = useNavigation<journalNavProp>()
  const [firebase, firestore]: [
    ExtendedFirebaseInstance,
    ExtendedFirestoreInstance,
  ] = [useFirebase(), useFirestore()]

  // define journal type
  const [journalsToList, setJournalsToList] = useState<any[]>([])

  const { auth } = firebase
  const { uid } = auth().currentUser

  const { get } = firestore

  const getUserJournals = async () => {
    try {
      const getJournals = await get({
        collection: Collections.JOURNALS,
        where: [[Keys.AUTHOR, '==', uid]],
      })
      const gotJournals = await getJournals.docs.map((doc: any) => doc.data())
      Logger.debug('gotJournals =', gotJournals)
      setJournalsToList(gotJournals)
    } catch (error) {
      Logger.debug('getUserJournals: error =', error)
    }
  }

  const journalListUseEffectHandler = () => {
    Logger.debug('use effect from journalList')
    getUserJournals()
    return () => {}
  }

  useEffect(journalListUseEffectHandler, [])

  const goToWrite = () =>
    navigate(JournalRoutes.ENTRY_WRITE, { date: dateFormat(new Date()) })

  const goToFeed = () => navigate(JournalRoutes.COMMUNITY_FEED)

  // moods?: MoodsProps
  // privateEntry?: boolean
  // journalTitle?: string
  // journalDate?: any
  // category?: CategoryProps
  //   category
  // null
  // (null)
  // createdAt
  // November 29, 2021 at 10:56:42 PM UTC+9
  // entry
  // "Sample entry"
  // moods
  // afternoon
  // 4
  // evening
  // 5
  // morning
  // 3
  // owner
  // "6JsIRMsaKkdtOmJIafUH40BL3l43"
  // shareOption
  // "private"
  // title
  // "Sample title"
  // updatedAt
  // November 29, 2021 at 10:56:42 PM UTC+9
  const RenderItem = ({ item }: any) => {
    Logger.debug('EntryList: RenderItem: item =', item)
    const { journalDate, title, entry, shareOption, moods = null } = item
    return (
      <GDJournalListItem
        journalDate={journalDate}
        title={title}
        entry={entry}
        privateEntry={shareOption == 'private'}
        moods={moods}
      />
    )
  }

  return (
    <MainContainer
      headerProps={{
        heading: 'Journal List',
        headerRest: {
          suffix: (
            <Div row>
              <PCButton bg="transparent" onPress={goToWrite}>
                <PCIcon name="pencil-plus-outline" size="6xl" />
              </PCButton>
              <PCButton bg="transparent" onPress={goToFeed}>
                <PCIcon name="account-group-outline" size="6xl" />
              </PCButton>
            </Div>
          ),
        },
      }}>
      <Div p="md">
        <FlatList
          style={{ height }}
          ListEmptyComponent={
            <PCMisc.EmptyList
              emptyText="No Entries"
              moreActions={
                <Div>
                  <PCButton
                    block
                    alignItems="center"
                    justifyContent="center"
                    onPress={goToWrite}>
                    Write First Entry
                  </PCButton>
                </Div>
              }
            />
          }
          ItemSeparatorComponent={PCMisc.Seperator}
          data={journalsToList}
          renderItem={RenderItem}
          keyExtractor={(item, idx) => `${String(idx)}-${item.journalDate}`}
        />
      </Div>
    </MainContainer>
  )
}
