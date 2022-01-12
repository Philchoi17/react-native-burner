import * as React from 'react'
// import { FormikErrors } from 'formik'

import { PCText } from '@/Components'

interface Props {
  error: string | null | undefined | any
  visible: boolean | null | undefined | any
}

export default function PCErrorMsg({ error, visible }: Props) {
  if (!visible || !error) return null
  return (
    <PCText color="error" mb="xs">
      {error}
    </PCText>
  )
}
