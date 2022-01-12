import * as React from 'react'
import { Formik, FormikProps } from 'formik'

interface Props {
  initialValues: any
  onSubmit: any
  validationSchema: object
  children: any
}

export default function ({
  initialValues,
  onSubmit,
  validationSchema,
  children,
}: Props) {
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {() => <>{children}</>}
    </Formik>
  )
}
