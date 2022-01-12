import { action } from '@storybook/addon-actions'
import { text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'
import PCHeader from '@/Components/PCHeader'
import { NavigationContainer } from '@react-navigation/native'

storiesOf('PCHeader', module)
  .addDecorator((getStory) => (
    <NavigationContainer>
      <SafeAreaView>{getStory()}</SafeAreaView>
    </NavigationContainer>
  ))
  .add('with text and bottomLine', () => (
    <PCHeader bottomLine>heading</PCHeader>
  ))
  .add('with some emoji', () => <PCHeader>😀 😎 👍 💯</PCHeader>)
