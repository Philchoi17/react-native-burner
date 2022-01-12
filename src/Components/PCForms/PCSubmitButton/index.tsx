import * as React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { useFormikContext } from 'formik'

import { PCButton, PCIcon } from '@/Components'

interface Props {
  title?: string
  wide?: boolean
  inputSuffix?: boolean
  suffixName?: string
  loading?: boolean
}

export default function PCSubmitButton({
  title,
  wide = false,
  inputSuffix,
  suffixName,
  loading,
}: Props) {
  const { handleSubmit } = useFormikContext()
  if (inputSuffix) {
    return (
      <TouchableOpacity onPress={handleSubmit}>
        <PCIcon name={suffixName ? suffixName : 'add'} />
      </TouchableOpacity>
    )
  }
  return (
    <PCButton block={wide} onPress={handleSubmit} loading={loading}>
      {title}
    </PCButton>
  )
}

const styles = StyleSheet.create({})
