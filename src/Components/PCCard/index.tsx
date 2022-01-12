import * as React from 'react'
import { Div, DivProps, Text } from 'react-native-magnus'

import { PCImage, PCText, PCButton } from '@/Components'
import Styles from '@/Utils/Styles'
import Logger from '@/Utils/Logger'

interface ProfileProps {
  image?: any
  email?: string
  nickname: string
  firstName?: string
  lastName?: string
  editable?: boolean
  editFunction?: () => void
}

interface Props extends DivProps {
  type?: string
  profileProps?: ProfileProps
}

export default function PCCard({ type = 'profile', profileProps }: Props) {
  return (
    <Div m="xl">
      {type == 'profile' ? (
        <Div alignItems="center" borderWidth={1} rounded="xl" p="lg">
          <PCImage
            imgSrc={
              profileProps?.image ? profileProps.image : Styles.images.smallLogo
            }
            w={103}
            h={103}
            rounded="circle"
          />
          <Div>
            <PCText my="sm">Email</PCText>
            <PCText fontSize="xl">{profileProps?.email}</PCText>
            <PCText my="sm">Nickname</PCText>
            <PCText fontSize="xl">{profileProps?.nickname}</PCText>
            <PCText my="sm">First Name</PCText>
            <PCText fontSize="xl">{profileProps?.firstName}</PCText>
            <PCText my="sm">Last Name</PCText>
            <PCText fontSize="xl">{profileProps?.lastName}</PCText>
          </Div>
          {profileProps?.editable && (
            <PCButton
              block
              mt="lg"
              p="none"
              h={33}
              m="xs"
              rounded="xl"
              alignSelf="center"
              onPress={
                profileProps?.editFunction
                  ? profileProps.editFunction
                  : () => {}
              }>
              Edit
            </PCButton>
          )}
        </Div>
      ) : (
        <Div>
          <Div
            rounded="xl"
            h={150}
            bgImg={{
              uri: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
            }}>
            <Div
              bg="pink500"
              rounded="md"
              row
              flexWrap="wrap"
              px="md"
              m="lg"
              alignSelf="flex-start">
              <Text color="white" fontSize="sm">
                2 Rooms
              </Text>
            </Div>
          </Div>
          <Div row alignItems="center">
            <Div flex={1}>
              <Text fontWeight="bold" fontSize="xl" mt="sm">
                Sunny Apartment
              </Text>
              <Text color="gray500" fontSize="sm">
                Gurgoan, India
              </Text>
            </Div>
            <Div row alignItems="center">
              <Text color="blue500" fontWeight="bold" fontSize="xl">
                $500
              </Text>
              <Text color="gray500" ml="md">
                / per day
              </Text>
            </Div>
          </Div>
        </Div>
      )}
    </Div>
  )
}
