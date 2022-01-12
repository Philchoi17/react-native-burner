import { Platform } from 'react-native'
import {
  check,
  PERMISSIONS,
  request,
  RESULTS,
  requestMultiple,
  checkMultiple,
} from 'react-native-permissions'
import Logger from '@/Utils/Logger'

type permissionTypes = 'mic' | 'camera' | 'transparency' | 'writeExtStorage'

export async function checkAndRequest(permissions: permissionTypes[]) {
  const IOS__PERMISSIONS: any = {
    transparency: PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY,
    mic: PERMISSIONS.IOS.MICROPHONE,
    camera: PERMISSIONS.IOS.CAMERA,
  }
  const ANDROID_PERMISSIONS: any = {
    mic: PERMISSIONS.ANDROID.RECORD_AUDIO,
    camera: PERMISSIONS.ANDROID.CAMERA,
    writeExtStorage: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
  }
  try {
    const checkingPermissions =
      Platform.OS == 'android'
        ? permissions.map(
            (permission: permissionTypes) => ANDROID_PERMISSIONS[permission],
          )
        : permissions.map(
            (permission: permissionTypes) => IOS__PERMISSIONS[permission],
          )
    const checked = await checkMultiple(checkingPermissions)
    Logger.debug('checked =', checked)
    const requestPermissions = checkingPermissions.filter(
      (checkedPermission) => checked[checkedPermission] != 'granted',
    )
    Logger.debug('requestPermissions =', requestPermissions)
    const requestedPermissions = await requestMultiple(requestPermissions)
    // Logger.debug('requestedPermissions =', requestedPermissions)
    return requestedPermissions
  } catch (error) {
    Logger.debug('checkAndRequest: error =', error)
  }
}
