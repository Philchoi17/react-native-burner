import React from 'react'
import { Provider } from 'react-redux'
// import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
// import Reducer from '@reduxjs/toolkit'

// firebase
import '@react-native-firebase/storage'
import '@react-native-firebase/auth'
import '@react-native-firebase/firestore'
import RNFirebase from '@react-native-firebase/app'
import '@react-native-firebase/database'
import '@react-native-firebase/functions'
import '@react-native-firebase/messaging'

// redux firebase
import {
  ReactReduxFirebaseProvider,
  firebaseReducer,
} from 'react-redux-firebase'
// needed if using firestore
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore'

// redux thunk
import { getFirebase } from 'react-redux-firebase'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { api } from '@/Services/api'
// import * as modules from '@/Services/modules'

// redux debug
import { composeWithDevTools } from 'redux-devtools-extension'

interface RRFProviderProps {
  children: any
}

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
}

// const reducer = combineReducers({
//   firebase: firebaseReducer,
//   firestore: firestoreReducer,
//   [api.reducerPath]: api.reducer,
// })
const reducer: any = {
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  [api.reducerPath]: api.reducer,
  // ...Object.values(modules).reduce(
  //   (acc, module) => ({
  //     ...acc,
  //     [module.reducerPath]: module.reducer,
  //   }),
  //   {},
  // ),
}

// const initialState = {}
const preloadedState = {}

const middlewares = [thunk.withExtraArgument(getFirebase) /*logger*/]

const composeEnhancers = composeWithDevTools({})

// const store = createStore(
//   rootReducer,
//   initialState,
//   composeEnhancers(applyMiddleware(...middlewares)),
// )
const store = configureStore({
  reducer,
  preloadedState,
  middleware: (getDefaultMiddleware: any) => [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
    ...middlewares,
    api.middleware,
  ],
  enhancers: [],
})

const rrfProps = {
  firebase: RNFirebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
}

const RRFProvider: React.FC<RRFProviderProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        {children}
      </ReactReduxFirebaseProvider>
    </Provider>
  )
}

export default RRFProvider
