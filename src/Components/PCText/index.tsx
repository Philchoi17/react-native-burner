import * as React from 'react'
import { StyleSheet } from 'react-native'
import { Text, TextProps } from 'react-native-magnus'

interface Props extends TextProps {
  children: any
  weight?:
    | 'bold'
    | '400'
    | 'normal'
    | '100'
    | '200'
    | '300'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | undefined
  size?: string | number
  rest?: TextProps
  center?: boolean
}

export default function PCText({
  children,
  weight = '400',
  size = 'md',
  center = false,
  ...rest
}: Props) {
  const font: any = {
    '100': 'sans-serif-thin',
    '300': 'sans-serif-light',
    '400': 'sans-serif',
    '500': 'sans-serif-medium',
  }
  return (
    <Text
      textAlign={center ? 'center' : 'left'}
      fontSize={size}
      fontWeight={weight}
      // fontFamily={font[weight]}
      style={styles.text}
      {...rest}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  text: {
    includeFontPadding: false,
  },
})
