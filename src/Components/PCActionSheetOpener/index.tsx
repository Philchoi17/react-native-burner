import * as React from 'react'
import { TouchableOpacity } from 'react-native'
import { Dropdown, Div, Button } from 'react-native-magnus'

import { PCText } from '@/Components'

interface OptionProps {
  prefix?: JSX.Element
  text: string
  method: () => void
}

interface Props {
  dropdownTitle: string
  dropdownOptions: OptionProps[]
  children: any
}

const { createRef } = React
export default function PCActionSheetOpener({
  children,
  dropdownTitle,
  dropdownOptions,
}: Props) {
  const dropdownRef: any = createRef()
  const open = () => dropdownRef.current.open()
  const close = () => dropdownRef.current.close()

  return (
    <>
      <TouchableOpacity onPress={open}>{children}</TouchableOpacity>
      <Dropdown
        ref={dropdownRef}
        mt="md"
        pb="xl"
        showSwipeIndicator={false}
        roundedTop="xl"
        title={
          <Div row mx="xl" alignItems="center" p="md" pb="lg">
            <Button
              bg="transparent"
              color="gray400"
              position="absolute"
              left={0}
              top={3}
              fontSize="xl"
              zIndex={1}
              onPress={close}>
              Cancel
            </Button>
            <PCText
              color="gray900"
              textAlign="center"
              flex={1}
              fontSize="xl"
              fontWeight="bold">
              {dropdownTitle}
            </PCText>
          </Div>
        }>
        {dropdownOptions.map((dropdownOption, idx) => (
          <Dropdown.Option
            onPress={dropdownOption.method}
            prefix={dropdownOption?.prefix ? dropdownOption.prefix : null}
            py="lg"
            mx="xl"
            px="md"
            block
            value={dropdownOption.text}
            key={String(idx)}>
            {dropdownOption.text}
          </Dropdown.Option>
        ))}
      </Dropdown>
    </>
  )
}
