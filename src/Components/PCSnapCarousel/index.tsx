import * as React from 'react'
import { StyleSheet } from 'react-native'
import { Div, WINDOW_WIDTH } from 'react-native-magnus'
import Carousel from 'react-native-snap-carousel'
import FastImage from 'react-native-fast-image'
import Logger from '@/Utils/Logger'

interface ImageItemProps {
  uri: string
}

interface Props {
  items: any[]
  onSnapToItem?: () => void
  height?: number
}

export default function PCSnapCarousel({
  height = 275,
  items,
  onSnapToItem = () => {
    Logger.debug('PCSnapCarousel: onSnapToItem: never passed Prop')
  },
}: Props) {
  const {
    priority: { normal },
    resizeMode: { contain },
  } = FastImage
  const Item: React.FC<ImageItemProps> = ({ uri }) => (
    <Div alignSelf="center" bg="light" rounded="md" h={255} w={255}>
      <FastImage
        source={{
          uri,
          priority: normal,
        }}
        style={styles.imageItem}
        resizeMode={contain}
      />
    </Div>
  )

  return (
    <Div p="sm" h={height}>
      <Carousel
        contentContainerStyle={{
          alignItems: 'center',
        }}
        containerCustomStyle={{
          height,
        }}
        sliderHeight={height}
        data={items}
        enableMomentum
        itemWidth={WINDOW_WIDTH * 0.7}
        onSnapToItem={onSnapToItem}
        layout="default"
        sliderWidth={WINDOW_WIDTH}
        renderItem={({ item: { url: uri }, idx }: any) => (
          <Item key={String(idx)} uri={uri} />
        )}
      />
    </Div>
  )
}

const styles = StyleSheet.create({
  imageItem: {
    height: 250,
    width: 250,
  },
})
