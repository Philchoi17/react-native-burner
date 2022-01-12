import { action } from '@storybook/addon-actions'
import { text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react-native'
import * as React from 'react'
import CenterView from '../../CenterView'
import { PCDropdownPicker } from '@/Components/PCForms'
import Logger from '@/Utils/Logger'
import Styles from '@/Utils/Styles'

// interface ItemProps {
//   label: string
//   value: string | number
// }

const dropdownItems = [
  { label: 'A', value: 0 },
  { label: 'B', value: 1 },
  { label: 'C', value: 2 },
]

// const { useState } = React
storiesOf('PCDropdownPicker', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('default closed dropdownpicker', () => {
    // const [open, setOpen] = useState(false)
    // const [value, setValue] = useState(dropdownItems[0])
    let open = false
    const setOpen = () => {
      open = true
    }
    let value = dropdownItems[0]
    const setValue = (val: any) => {
      value = val
    }
    return (
      <PCDropdownPicker
        open={open}
        setOpen={setOpen}
        value={value}
        setValue={setValue}
        items={dropdownItems}
      />
    )
  })
  .add('default open dropdownpicker', () => {
    // const [open, setOpen] = useState(false)
    // const [value, setValue] = useState(dropdownItems[0])
    let open = true
    const setOpen = () => {
      open = false
    }
    let value = dropdownItems[0]
    const setValue = (val: any) => {
      value = val
    }
    return (
      <PCDropdownPicker
        open={open}
        setOpen={setOpen}
        value={value}
        setValue={setValue}
        items={dropdownItems}
      />
    )
  })
