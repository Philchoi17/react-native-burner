import RNFS from '@react-native-firebase/firestore'
import RNFBA from '@react-native-firebase/auth'

export function getFirestoreRef(path: string) {
  return RNFS().doc(path)
}
