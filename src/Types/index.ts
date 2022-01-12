import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'

export type profileType = {
  createdAt: FirebaseFirestoreTypes.Timestamp
  email: string
  firstName: string
  isEmpty: boolean
  isLoaded: boolean
  lastName: string
  lastSeenAt: FirebaseFirestoreTypes.Timestamp
  nickname: string
  // optional keys
  photoURL?: string
}

// type used in usage examples
export type PermissionStatus =
  | 'unavailable'
  | 'denied'
  | 'limited'
  | 'granted'
  | 'blocked'

export type pendingRequestType = {
  createdAt: FirebaseFirestoreTypes.Timestamp
  participants: string[]
  requestee: string
  requester: string
  status: 'pending' | 'approved' | 'declined'
  updatedAt: FirebaseFirestoreTypes.Timestamp
}

export type chatRoomType = {
  createdAt: FirebaseFirestoreTypes.Timestamp
  updatedAt: FirebaseFirestoreTypes.Timestamp
  lastMessage?: {
    text: string
    from: string
    time: FirebaseFirestoreTypes.Timestamp
  }
  participants: string[]
  id?: string
  profileDetails: any
}
