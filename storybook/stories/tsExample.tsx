import * as React from 'react'
import { Text, View } from 'react-native'
import { storiesOf } from '@storybook/react-native'

interface Props {
  text: string
}

const Simple: React.FC<Props> = ({ text }) => (
  <View
    style={{
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    }}>
    <Text>{text}</Text>
  </View>
)

storiesOf('Test', module).add('default', () => (
  <Simple text={'Typescript works!'} />
))
