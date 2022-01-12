import { action } from '@storybook/addon-actions'
import { text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react-native'
import React from 'react'
import CenterView from '../CenterView'
import { PCText } from '@/Components/'
import Logger from '@/Utils/Logger'

storiesOf('PCText', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('default md size prop', () => <PCText>default size</PCText>)
  .add('with xl size prop', () => <PCText size="xl">text</PCText>)
  .add('with some emojis and xl size prop', () => (
    <PCText size="xl">😀 😎 👍 💯</PCText>
  ))
