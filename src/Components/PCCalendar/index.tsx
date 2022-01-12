import * as React from 'react'
import { Div } from 'react-native-magnus'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars'
import Logger from '@/Utils/Logger'
import { dateFormat } from '@/Utils/misc'

interface Props {
  chosenDate: any
  onDayPress?: (date: string) => void
  list?: boolean
}

export default function PCCalendar({
  chosenDate,
  onDayPress,
  list,
  ...rest
}: Props) {
  if (list) {
    return <CalendarList {...rest} />
  }
  return (
    <Div p="xl" justifyContent="center" w="100%">
      <Calendar
        {...rest}
        current={dateFormat(chosenDate)}
        onDayPress={({ dateString }: any) => {
          Logger.debug('dateString =', dateString)
          onDayPress && onDayPress(dateString)
        }}
      />
      {/* <Agenda onDayPress={() => Logger.debug('something')} /> */}
    </Div>
  )
}
