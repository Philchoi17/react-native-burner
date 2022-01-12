import * as React from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native'

interface Props {
  offset?: number
  children: JSX.Element | any
}

export default function PCKeyboardAvoider({ children, offset = 100 }: Props) {
  return (
    <KeyboardAvoidingView
      // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      behavior="position"
      keyboardVerticalOffset={offset}>
      {children}
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
})
