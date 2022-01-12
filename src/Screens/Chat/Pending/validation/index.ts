import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
  sendMsg: Yup.string().min(1).required().label('Message'),
})
