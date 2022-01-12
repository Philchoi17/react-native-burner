import * as React from 'react'
import { Input, InputProps } from 'react-native-magnus'
import { FormikContextType, FormikValues, useFormikContext } from 'formik'

import { PCText } from '@/Components'
import { PCErrorMsg } from '@/Components/PCForms'

interface Props extends InputProps {
  val: string
}

export default function GDJournalTitleInput({ val, ...rest }: Props) {
  const { setFieldTouched, handleChange, errors, touched } =
    useFormikContext<FormikValues>()
  return (
    <>
      <PCText size="xl" m="sm">
        Title
      </PCText>
      <Input
        fontSize="xl"
        focusBorderColor="blue700"
        mb="sm"
        onBlur={() => (val ? setFieldTouched(val) : null)}
        onChangeText={handleChange(val)}
        {...rest}
      />
      <PCErrorMsg error={errors[val]} visible={touched[val]} />
    </>
  )
}
