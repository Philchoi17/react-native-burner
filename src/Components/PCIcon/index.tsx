import * as React from 'react'
import { Icon, IconProps } from 'react-native-magnus'

interface Props extends IconProps {
  name: string
  size?: string | number
  rest?: any
}

export default function PCIcon({ name, size = 'xl', ...rest }: Props) {
  return (
    <Icon
      fontFamily="MaterialCommunityIcons"
      name={name}
      fontSize={size}
      {...rest}
    />
  )
}
