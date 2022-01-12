import * as React from 'react'
import { Div } from 'react-native-magnus'
import Slider from '@react-native-community/slider'

interface Props {
  value: number
  onChange: (val: number) => void
  Emoji?: JSX.Element
}

export default function GDMoodPicker({ value, onChange, Emoji }: Props) {
  return (
    <Div alignItems="center" justifyContent="center" w="100%">
      {Emoji}
      <Slider
        value={value}
        onValueChange={onChange}
        style={{
          width: '100%',
          height: 40,
        }}
        step={1}
        minimumValue={0}
        maximumValue={5}
        minimumTrackTintColor="gray"
        maximumTrackTintColor="white"
      />
    </Div>
  )
}
