import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
  firstName: Yup.string().required().min(3).label('First Name'),
  lastName: Yup.string().required().min(1).label('Last Name'),
  nickname: Yup.string().required().min(4).label('Nickname'),
})
