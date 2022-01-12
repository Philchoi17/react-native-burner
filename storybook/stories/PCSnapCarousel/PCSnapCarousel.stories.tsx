import { action } from '@storybook/addon-actions'
import { text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react-native'
import React from 'react'
import CenterView from '../CenterView'
import { PCSnapCarousel } from '@/Components/'
import Logger from '@/Utils/Logger'
import Styles from '@/Utils/Styles'
import { Div } from 'react-native-magnus'

const items = [
  {
    id: 0,
    url: 'https://firebasestorage.googleapis.com/v0/b/gideb-firebase.appspot.com/o/awh%2FfoodPics%2Favacado.png?alt=media&token=cc5d19fd-9774-4072-a460-db0d49515fa2',
  },
  {
    id: 1,
    url: 'https://firebasestorage.googleapis.com/v0/b/gideb-firebase.appspot.com/o/awh%2FfoodPics%2Fbibimbap.png?alt=media&token=6641561c-2a06-44a4-ae45-e51ba5917f3e',
  },
  {
    id: 2,
    url: 'https://firebasestorage.googleapis.com/v0/b/gideb-firebase.appspot.com/o/awh%2FfoodPics%2Fblueberries.png?alt=media&token=cb510984-f846-4852-8509-c5f1ab7a4b79',
  },
  {
    id: 3,
    url: 'https://firebasestorage.googleapis.com/v0/b/gideb-firebase.appspot.com/o/awh%2FfoodPics%2Fbutter.png?alt=media&token=61065dd3-a6ae-4605-b9dc-b4b99f700aa2',
  },
  {
    id: 4,
    url: 'https://firebasestorage.googleapis.com/v0/b/gideb-firebase.appspot.com/o/awh%2FfoodPics%2Fchocolate.png?alt=media&token=3f55de48-b4de-46b5-aaf2-55ebb6ac715a',
  },
  {
    id: 5,
    url: 'https://firebasestorage.googleapis.com/v0/b/gideb-firebase.appspot.com/o/awh%2FfoodPics%2Fcoffee.png?alt=media&token=a7f18d36-9e2f-4d7e-96e0-463fad496eb5',
  },
  {
    id: 6,
    url: 'https://firebasestorage.googleapis.com/v0/b/gideb-firebase.appspot.com/o/awh%2FfoodPics%2Fdak_galbi.png?alt=media&token=6f57aee8-f492-4cab-a75f-d0c34d2e2dc0',
  },
  {
    id: 7,
    url: 'https://firebasestorage.googleapis.com/v0/b/gideb-firebase.appspot.com/o/awh%2FfoodPics%2Fdeokbokki.png?alt=media&token=70464e8f-2120-4cd2-8677-b10de69b7929',
  },
]

storiesOf('PCSnapCarousel', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('default carousel', () => (
    <Div>
      <PCSnapCarousel items={items} />
    </Div>
  ))
  .add('multiple carousels', () => (
    <Div>
      <PCSnapCarousel
        items={items}
        onSnapToItem={() => Logger.debug('my own custom function')}
      />
      <PCSnapCarousel items={items} />
    </Div>
  ))
  .add('added height prop', () => (
    // aligns to top of screen
    <Div borderWidth={1}>
      <PCSnapCarousel items={items} height={500} />
    </Div>
  ))
