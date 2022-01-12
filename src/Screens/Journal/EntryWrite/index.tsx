import * as React from 'react'
import { ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import {
  Button,
  Div,
  Dropdown,
  WINDOW_WIDTH as width,
} from 'react-native-magnus'
import {
  useFirebase,
  useFirestore,
  ExtendedFirebaseInstance,
  ExtendedFirestoreInstance,
} from 'react-redux-firebase'
import { useNavigation, useRoute } from '@react-navigation/native'

import MainContainer from '@/Containers/MainContainer'
import { PCText, PCMisc, PCCalendar, PCButton, PCIcon } from '@/Components'
import { PCRadio, PCForm, PCSubmitButton } from '@/Components/PCForms'
import {
  GDJournalEntryInput,
  GDJournalTitleInput,
  GDMoodPicker,
} from '@/Components/GDJournal'
import Logger from '@/Utils/Logger'
import { validationSchema } from './validation'
import { Collections, Keys } from '@/FireNames/Constants'
import { RootRouteProps } from '@/Navigators/NavStackParams'
import { JournalRoutes } from '@/Screens/SCREENS'

interface Props {}

const { useState, createRef, useEffect } = React
export default function EntryWrite({}: Props) {
  const [firebase, firestore]: [
    ExtendedFirebaseInstance,
    ExtendedFirestoreInstance,
  ] = [useFirebase(), useFirestore()]
  const { goBack } = useNavigation()
  const { params } = useRoute<RootRouteProps<JournalRoutes.ENTRY_WRITE>>()

  Logger.debug('params =', params)

  const { auth } = firebase
  const { add, set, update, get } = firestore

  const { uid } = auth().currentUser

  const moodPickerRef: any = createRef()
  const openMoodPicker = async (timeOfDay: string) => {
    try {
      Logger.debug('timeOfDay =', timeOfDay)
      moodPickerRef.current.open()
      setTimeOfDayMood({ ...timeOfDayMood, timeOfDay })
    } catch (error) {
      Logger.debug('openMoodPicker: error =', error)
    }
  }
  const closeMoodPicker = () => moodPickerRef.current.close()

  const calendarPickerRef: any = createRef()
  const openCalendarPicker = () => calendarPickerRef.current.open()
  const closeCalendarPicker = () => calendarPickerRef.current.close()

  // const [pickedShareOption, setPickedShareOption] = useState<
  //   'private' | 'share' | 'post'
  // >('private')
  const [pickedShareOption, setPickedShareOption] = useState<string>('private')
  const [moods, setMoods] = useState<{
    morning: number | null
    afternoon: number | null
    evening: number | null
  }>({ morning: null, afternoon: null, evening: null })
  const [timeOfDayMood, setTimeOfDayMood] = useState<{
    timeOfDay: string | null
    mood: number | null
  }>({
    timeOfDay: null,
    mood: null,
  })

  const [category, setCateogry] = useState<{
    theme: string
    title: string
  } | null>(null)
  const [uploading, setUploading] = useState<boolean>(false)
  const journalShareOptions = [
    { label: 'Private', value: 'private' },
    { label: 'Share With Provider', value: 'share' },
    { label: 'Post To Feed', value: 'post' },
  ]
  const [existingJournal, setExistingJournal] = useState<any>({})

  const ifExistingdEntry = async (journalDate: string) => {
    Logger.debug('if existedEntry', journalDate)
    const getJournal = await get({
      collection: Collections.JOURNALS,
      where: [
        [Keys.JOURNAL_DATE, '==', journalDate],
        [Keys.AUTHOR, '==', uid],
      ],
    })
    const gotJournal = await getJournal.docs.map((doc: any) => doc.data())
    Logger.debug('gotJournal =', gotJournal)
    if (gotJournal.length == 1) {
      setExistingJournal(gotJournal[0])
    }
    return (await gotJournal.length) > 1
  }

  const entryWriteUseEffectHandler = () => {
    ifExistingdEntry(params.date)
    return () => {}
  }

  useEffect(entryWriteUseEffectHandler, [])

  // define journal type
  const saveJournalEntry = async ({ entry, title, shareOption }: any) => {
    try {
      setUploading(true)
      let updatedAt
      const createdAt = (updatedAt = new Date())
      let journalToAdd = {
        journalDate: params.date,
        moods,
        author: uid,
        entry,
        title,
        shareOption,
        category,
        createdAt,
        updatedAt,
      }
      const addedJournalToFirestoreSnapshot = await add(
        {
          collection: Collections.JOURNALS,
        },
        journalToAdd,
      )
      Logger.debug(
        'addedJournalToFirestoreSnapshot =',
        addedJournalToFirestoreSnapshot,
      )
      // would like to get public_user data and store it in the public_journal data for easier viewing**
      // if (shareOption == 'post') {
      //   const publicJournalSetDoc = set(
      //     `${Collections.PUBLIC_JOURNALS}/${savedJournalToFirestoreSnapshot.id}`,
      //     journalToAdd,
      //   )
      // }
    } catch (error) {
      Logger.debug('saveJournalEntry: error =', error)
    } finally {
      setUploading(false)
      goBack()
    }
  }

  const DropdownTitle = ({
    title,
    close,
  }: {
    title: string
    close: () => void
  }) => (
    <Div row mx="xl" alignItems="center" p="md" pb="lg">
      <Button
        bg="transparent"
        color="gray400"
        position="absolute"
        left={0}
        top={3}
        fontSize="xl"
        zIndex={1}
        onPress={close}>
        Cancel
      </Button>
      <PCText
        color="gray900"
        textAlign="center"
        flex={1}
        fontSize="xl"
        fontWeight="bold">
        {title}
      </PCText>
    </Div>
  )

  // const MoodPicker: React.FC = () => (
  const MoodPicker = (
    <Dropdown
      onDismiss={() => {
        setMoods({
          ...moods,
          [String(timeOfDayMood.timeOfDay)]: timeOfDayMood.mood,
        })
      }}
      w="100%"
      ref={moodPickerRef}
      mt="md"
      pb="xl"
      showSwipeIndicator={false}
      roundedTop="xl"
      title={<DropdownTitle title="Choose Mood" close={closeMoodPicker} />}>
      <Div justifyContent="center" alignItems="center" p="md" w={width} row>
        <GDMoodPicker
          onChange={(mood) => {
            setTimeOfDayMood({ ...timeOfDayMood, mood })
            Logger.debug('timeOfDayMood =', timeOfDayMood)
          }}
          value={timeOfDayMood.mood || 0}
          Emoji={<PCMisc.Emoji mood={3} />}
        />
        {/* <PCMisc.Emoji mood={emoji.CRY} />
        <PCMisc.Emoji mood={emoji.SAD} />
        <PCMisc.Emoji mood={emoji.NEU} />
        <PCMisc.Emoji mood={emoji.HAP} />
        <PCMisc.Emoji mood={emoji.EXC} /> */}
      </Div>
    </Dropdown>
  )

  const CalendarPicker: React.FC = () => (
    <Dropdown
      w="100%"
      ref={calendarPickerRef}
      mt="md"
      pb="xl"
      showSwipeIndicator={false}
      roundedTop="xl"
      title={<DropdownTitle title="Calendar" close={closeCalendarPicker} />}>
      <PCCalendar chosenDate={new Date()} />
    </Dropdown>
  )

  return (
    <>
      <MainContainer
        headerProps={{
          heading: 'Journal Write',
          headerRest: {
            suffix: (
              <Div row>
                <PCButton bg="transparent" onPress={openCalendarPicker}>
                  <PCIcon name="calendar-month-outline" size="6xl" />
                </PCButton>
              </Div>
            ),
          },
        }}>
        <ScrollView>
          <Div p="lg">
            <PCText size="xl">{params.date}</PCText>
            <PCForm
              onSubmit={saveJournalEntry}
              validationSchema={validationSchema}
              initialValues={{
                title: '',
                entry: '',
                shareOption: 'private',
              }}>
              <Div pt="sm" px="2xl">
                <Div
                  pb="md"
                  row
                  justifyContent="space-around"
                  borderBottomWidth={0.5}
                  borderBottomColor="gray300">
                  <TouchableOpacity
                    onPress={() => openMoodPicker('morning')}
                    style={styles.moodPicker}>
                    <PCMisc.Emoji mood={3} />
                    <PCText>{'Morning'}</PCText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => openMoodPicker('afternoon')}
                    style={styles.moodPicker}>
                    <PCMisc.Emoji mood={3} />
                    <PCText>{'Afternoon'}</PCText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => openMoodPicker('evening')}
                    style={styles.moodPicker}>
                    <PCMisc.Emoji mood={3} />
                    <PCText>{'Evening'}</PCText>
                  </TouchableOpacity>
                </Div>
              </Div>
              <GDJournalTitleInput
                val="title"
                borderWidth={0}
                borderBottomWidth={1}
                m="sm"
                focusBorderColor="blue"
                placeholder="Journal Title"
              />
              <GDJournalEntryInput
                val="entry"
                extraInputStyle={{}}
                onFocus={() => Logger.debug('GDJournalEntryInput: onFocus')}
                placeholder={'Journal Entry'}
              />
              <PCRadio
                val="shareOption"
                // onChange={() => Logger.debug('is this needed?')}
                options={journalShareOptions}
              />
              <PCSubmitButton loading={uploading} wide title="Save Journal" />
            </PCForm>
          </Div>
        </ScrollView>
      </MainContainer>
      {/* <MoodPicker /> */}
      {MoodPicker}
      <CalendarPicker />
    </>
  )
}

const styles = StyleSheet.create({
  moodPicker: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})
