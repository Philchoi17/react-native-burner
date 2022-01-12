import * as React from 'react'
import { StyleSheet } from 'react-native'
import { Div } from 'react-native-magnus'
import DropDownPicker, {
  DropDownPickerProps,
} from 'react-native-dropdown-picker'

// items: ItemType[];
//   value: ValueType | ValueType[] | null;
//   open: boolean;
//   placeholder?: string;
//   closeAfterSelecting?: boolean;
//   labelProps?: TextProps;
//   disabled?: boolean;
//   disabledStyle?: StyleProp<ViewStyle>;

interface ItemProps {
  label: string
  value: string | number
}

interface Props extends DropDownPickerProps {
  open: boolean
  // setOpen: () => boolean
  setOpen: any
  // value: ItemProps
  value: any
  // setValue: () => ItemProps
  setValue: any
  items: ItemProps[]
  multiple?: boolean
  placeholder?: string
}

export default function PCDropdownPicker({
  open,
  setOpen,
  items,
  value,
  setValue,
  multiple = false,
  placeholder = '',
  ...rest
}: Props) {
  return (
    <Div p="sm">
      <DropDownPicker
        placeholder={placeholder}
        multiple={multiple}
        open={open}
        setOpen={setOpen}
        items={items}
        value={value}
        setValue={setValue}
        containerStyle={styles.container}
        labelStyle={styles.label}
        dropDownContainerStyle={styles.dropdown}
        {...rest}
      />
    </Div>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 55,
  },
  label: { color: 'black' },
  placeholder: {
    color: 'grey',
  },
  dropdown: {
    zIndex: 10000,
  },
})
