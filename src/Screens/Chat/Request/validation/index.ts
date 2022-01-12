import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
  Email: Yup.string().email().label('Email'),
  Nickname: Yup.string().min(3).label('Nickname'),
})
