import * as React from 'react'
import { Image, Div, ImageProps } from 'react-native-magnus'

interface Props {
  borderWidth?: number
  imgSrc: any
  h: number
  w: number
  rounded?: string
  rest?: ImageProps
}

export default function PCImage({
  borderWidth,
  imgSrc,
  h,
  w,
  rounded = 'none',
  ...rest
}: Props) {
  return (
    <Div alignItems="center" justifyContent="center" h={h} w={w}>
      <Image
        source={imgSrc}
        h={h - 3}
        w={w - 3}
        resizeMode="contain"
        rounded={rounded}
        {...rest}
      />
    </Div>
  )
}
