import * as React from 'react'
import { Div } from 'react-native-magnus'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import Config from '@/Config'
import { PCHeader, PCKeyboardAvoider } from '@/Components'

interface HeaderProps {
  heading: string
  suffix?: JSX.Element
}

interface Props {
  children: any
  headerProps?: HeaderProps
}

export default function AuthContainer({ children, headerProps }: Props) {
  const { top, bottom } = useSafeAreaInsets()
  return (
    <Div bg="light" flex={1} pb={bottom} pt={top}>
      {headerProps && (
        <PCHeader
          bottomLine
          suffix={headerProps.suffix ? headerProps.suffix : null}>
          {headerProps.heading}
        </PCHeader>
      )}
      {children}
    </Div>
  )
}
