import * as React from 'react'
import { Div } from 'react-native-magnus'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import Config from '@/Config'
import { PCHeader } from '@/Components'

interface HeaderProps {
  heading?: string
  suffix?: JSX.Element
  headerRest?: any
}

interface Props {
  children: any
  headerProps?: HeaderProps
}

export default function MainContainer({ children, headerProps }: Props) {
  const { top, bottom } = useSafeAreaInsets()
  return (
    <Div bg="light" flex={1} pt={top} pb={bottom}>
      {headerProps && (
        <PCHeader
          bottomLine
          suffix={headerProps.suffix ? headerProps.suffix : null}
          {...headerProps.headerRest}>
          {headerProps.heading}
        </PCHeader>
      )}
      {children}
    </Div>
  )
}
