import React from 'react'
import { storiesOf } from '@storybook/react-native'

// I import the component I want to display here
import { PCInput, PCForm } from '@/Components/PCForms'
import CenterView from '../../CenterView'

// here I define that I want to create stories with the label "Buttons",
// this will be the name in the storybook navigation

storiesOf('PCForms.PCInput', module)
  .addDecorator((getStroy) => (
    <CenterView>
      <PCForm
        initialValues={{}}
        validationSchema={{}}
        onSubmit={() => console.log('here')}>
        {getStroy()}
      </PCForm>
    </CenterView>
  ))
  .add('default Input', () => <PCInput label="test" val="test" />)
// .add('Input with error message', () => (
//   <PCInput

//   // errors={['Email required!']}
//   />
// ))
//   .add('input with title', () => <PCInput label={'Email'} />)
//   .add('input with title props', () => (
//     <PCInput
//       label="Password"
//       // titleProps={{ color: 'blue600', fontSize: 'lg', fontWeight: 'bold' }}
//     />
//   ))
