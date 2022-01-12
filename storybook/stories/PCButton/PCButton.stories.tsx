import { action } from '@storybook/addon-actions'
import { text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react-native'
import React from 'react'
import CenterView from '../CenterView'
import { PCButton } from '@/Components/'
import Logger from '@/Utils/Logger'

storiesOf('PCButton', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('with text and bottomLine', () => (
    <PCButton onPress={() => Logger.debug('PCButton: Log')}>Press</PCButton>
  ))
  .add('with some emoji and wide', () => (
    <PCButton wide onPress={() => Logger.debug('PCButton: Log')}>
      😀 😎 👍 💯
    </PCButton>
  ))
