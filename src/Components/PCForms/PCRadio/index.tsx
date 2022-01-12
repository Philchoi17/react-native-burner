import * as React from 'react'
import { Radio, RadioProps } from 'react-native-magnus'
import { FormikContextType, FormikValues, useFormikContext } from 'formik'

import { PCText } from '@/Components'
import { PCErrorMsg } from '@/Components/PCForms'

{
  /* <Radio.Group>
<Radio value={1} prefix={<Text flex={1}>Option 1</Text>} />
<Radio value={2} prefix={<Text flex={1}>Option 2</Text>} />
<Radio value={3} prefix={<Text flex={1}>Option 3</Text>} />
</Radio.Group> */
}

interface ShareOptionProp {
  label: string
  value: string
}

interface Props {
  // onChange: (val: string) => void
  options: ShareOptionProp[]
  val: string
}

export default function PCRadio({ options, val }: Props) {
  const { setFieldTouched, handleChange, errors, touched } =
    // FormikContextType
    useFormikContext<FormikValues>()
  return (
    <>
      <Radio.Group
        onChange={handleChange(val)}
        m="sm"
        p="sm"
        defaultValue={options[0].value}>
        {options.map((shareOption: ShareOptionProp, idx: number) => (
          <Radio
            key={String(idx)}
            value={shareOption.value}
            prefix={<PCText flex={1}>{shareOption.label}</PCText>}>
            {/*  */}
          </Radio>
        ))}
      </Radio.Group>
      <PCErrorMsg error={errors[val]} visible={touched[val]} />
    </>
  )
}
