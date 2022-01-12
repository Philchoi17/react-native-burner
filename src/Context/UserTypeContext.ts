import * as React from 'react'

export interface UserTypeContextType {
  userType: string
  lang: string
  setUserType: (userType: string) => void
  switchLang: (lang: string) => void
}

export const UserTypeContext: React.Context<UserTypeContextType> =
  React.createContext({
    userType: '',
    lang: '',
    setUserType: (_userType: string) => {},
    switchLang: (_lang: string) => {},
  })
