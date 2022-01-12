import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
  title: Yup.string().min(3).label('Title'),
  entry: Yup.string().min(3).label('Entry'),
  shareOption: Yup.string().label('Share Option'),
})
