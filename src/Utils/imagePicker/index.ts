import {
  launchCamera,
  CameraOptions,
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker'
import Logger from '@/Utils/Logger'
import { Platform } from 'react-native'

const options: CameraOptions = {
  mediaType: 'photo',
  maxWidth: 200,
  maxHeight: 200,
}

function uploadUriFormatter(uri: string) {
  return Platform.OS == 'ios' ? uri.replace('file://', '') : uri
}

export const imagePickerLaunchCamera = async (
  savingScheme: (image: string) => void,
) => {
  const response: ImagePickerResponse = await launchCamera(options)
  Logger.debug('imagePickerLaunchCamera: response =', response)
  try {
    const { assets }: any = response
    const uploadUri = uploadUriFormatter(assets[0].uri)
    savingScheme(uploadUri)
  } catch (error) {
    Logger.debug('imagePickerLaunchCamera: error =', error)
  }
}

export const imagePickerLaunchLibrary = async (
  savingScheme: (image: string) => void,
) => {
  const response: ImagePickerResponse = await launchImageLibrary(options)
  Logger.debug('imagePickerLaunchLibrary: response =', response)
  try {
    const { assets }: any = response
    const uploadUri = uploadUriFormatter(assets[0].uri)
    savingScheme(uploadUri)
  } catch (error) {
    Logger.debug('imagePickerLaunchLibrary: error =', error)
  }
}
