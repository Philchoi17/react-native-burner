import * as React from 'react'
import { Button, ButtonProps } from 'react-native-magnus'

import PCText from '../PCText'

interface Props extends ButtonProps {
  onPress: () => void
  children?: any
  wide?: boolean
}

export default function PCButton({
  onPress,
  children,
  wide = false,
  ...rest
}: Props) {
  return (
    <Button onPress={onPress} {...rest}>
      {children}
    </Button>
  )
}
