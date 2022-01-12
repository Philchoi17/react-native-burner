import * as React from 'react'
import { StyleSheet, TextInput, TextInputProps } from 'react-native'
import { Div, DivProps } from 'react-native-magnus'
import { FormikContextType, FormikValues, useFormikContext } from 'formik'

import { PCText } from '@/Components'
import { PCErrorMsg } from '@/Components/PCForms'
import Logger from '@/Utils/Logger'

interface Props {
  divRest?: DivProps
  inputRest?: TextInputProps
  onFocus?: () => void
  onBlur?: () => void
  extraInputStyle?: object
  val: string
  placeholder?: string
}

export default function GDJournalEntryInput({
  onFocus,
  onBlur,
  extraInputStyle,
  divRest,
  inputRest,
  val,
  placeholder,
}: Props) {
  const { setFieldTouched, handleChange, errors, touched } =
    useFormikContext<FormikValues>()
  return (
    <Div {...divRest}>
      <PCText m="sm" size="xl">
        Entry
      </PCText>
      <TextInput
        placeholder={placeholder}
        onBlur={() => (val ? setFieldTouched(val) : null)}
        onChangeText={handleChange(val)}
        style={[styles.entryInput, extraInputStyle]}
        numberOfLines={20}
        multiline
        // onFocus={onFocus}
        // onBlur={() => (val ? setFieldTouched(val) : null)}
        // placeholder={placeholder}
        {...inputRest}
      />
      <PCErrorMsg error={errors[val]} visible={touched[val]} />
    </Div>
  )
}

const styles = StyleSheet.create({
  entryInput: {
    height: 300,
    width: '100%',
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    paddingTop: 10,
  },
})
