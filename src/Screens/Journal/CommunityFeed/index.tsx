import * as React from 'react'
import { Div } from 'react-native-magnus'

import MainContainer from '@/Containers/MainContainer'
import { PCText } from '@/Components'

interface Props {}

export default function CommunityFeed({}: Props) {
  return (
    <MainContainer
      headerProps={{
        heading: 'Community Feed',
      }}>
      <Div p="md">
        <PCText>Community feed [ need Flatlist ]</PCText>
      </Div>
    </MainContainer>
  )
}
