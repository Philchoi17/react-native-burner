import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
  firstName: Yup.string().required().min(3).label('First Name'),
  lastName: Yup.string().required().min(1).label('Last Name'),
  nickname: Yup.string().required().min(4).label('Nickname'),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(6).label('Password'),
  confirmPassword: Yup.string()
    .required('Passwords must match.')
    .oneOf([Yup.ref('password'), null], 'Passwords must match.'),
})
