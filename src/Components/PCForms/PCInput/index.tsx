import * as React from 'react'
import { Input, InputProps } from 'react-native-magnus'
import { FormikContextType, FormikValues, useFormikContext } from 'formik'

import { PCErrorMsg } from '@/Components/PCForms'
import { PCText } from '@/Components'
import Logger from '@/Utils/Logger'

// interface ProfileFields {
//   email: string
//   password: string
// }

interface Props extends InputProps {
  label?: string
  val: string
  width?: string | number
  rest?: any
}

export default function PCInput({
  label,
  val,
  width = '100%',
  placeholder,
  ...rest
}: Props) {
  const { setFieldTouched, handleChange, errors, touched } =
    // FormikContextType
    useFormikContext<FormikValues>()

  return (
    <>
      {label && (
        <PCText size="xl" ml="sm">
          {label}
        </PCText>
      )}
      <Input
        fontSize="xl"
        placeholder={placeholder}
        focusBorderColor="blue700"
        my="sm"
        onBlur={() => (val ? setFieldTouched(val) : null)}
        onChangeText={handleChange(val)}
        w={width}
        {...rest}
      />
      <PCErrorMsg error={errors[val]} visible={touched[val]} />
    </>
  )
}

// * ---------------------------------------------------------------------------

// import { Div, Text, Input, InputProps, TextProps } from 'react-native-magnus'

// import { Formik } from 'formik'

// import { useState } from 'react'

// interface Props extends InputProps {
//   errors?: string[]
//   title?: string
//   titleProps?: TextProps
// }

// const PCInput = (props: Props) => {
//   const { title, titleProps, errors, ...rest } = props
//   const [validationMessage, setValidationMessage] = useState('')
//   return (
//     <>
//       {title && (
//         <Text fontSize="lg" {...titleProps}>
//           {title}
//         </Text>
//       )}
//       <Input {...rest} />
//       {errors?.map((e) => (
//         <Text color="red500" p="md">
//           {e}
//         </Text>
//       ))}
//     </>
//   )
// }

// export default PCInput
