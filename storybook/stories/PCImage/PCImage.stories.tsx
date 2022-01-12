import { action } from '@storybook/addon-actions'
import { text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react-native'
import React from 'react'
import CenterView from '../CenterView'
import { PCImage } from '@/Components/'
import Logger from '@/Utils/Logger'
import Styles from '@/Utils/Styles'

storiesOf('PCImage', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('default img props imgSrc, h, w', () => (
    <PCImage imgSrc={Styles.images.smallLogo} h={55} w={55} />
  ))
  .add('rounded prop', () => (
    <PCImage imgSrc={Styles.images.smallLogo} h={55} w={55} rounded="circle" />
  ))
