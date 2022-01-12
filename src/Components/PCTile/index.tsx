import * as React from 'react'
import { Button, ButtonProps, Div } from 'react-native-magnus'
import { useNavigation } from '@react-navigation/core'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { PCImage, PCText } from '@/Components'
import { AppStackParams } from '@/Navigators/NavStackParams'

interface Props extends ButtonProps {
  navigateTo: any
  imgSrc: any
  label: string
}

type appNavType = NativeStackNavigationProp<AppStackParams>

export default function PCTile({ imgSrc, navigateTo, label }: Props) {
  const { navigate } = useNavigation<appNavType>()
  const goTo = () => {
    navigate(navigateTo)
  }

  return (
    <Button
      bg="gray"
      onPress={goTo}
      h={144}
      w="45%"
      m="md"
      rounded="xl"
      shadow="lg"
      shadowColor="quarterOpacity">
      <Div alignItems="center">
        <PCImage h={68} w={68} imgSrc={imgSrc} />
        <PCText size="lg" textAlign="center" color="white">
          {label}
        </PCText>
      </Div>
    </Button>
  )
}
