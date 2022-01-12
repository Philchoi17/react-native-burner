import * as React from 'react'
import { StyleSheet, ActivityIndicator } from 'react-native'
import { Div } from 'react-native-magnus'
import {
  useFirebase,
  ExtendedFirebaseInstance,
  useFirestore,
  ExtendedFirestoreInstance,
} from 'react-redux-firebase'
import { useSelector } from 'react-redux'

import MainContainer from '@/Containers/MainContainer'
import {
  PCText,
  PCCard,
  PCButton,
  PCAlert,
  PCImage,
  PCActionSheetOpener,
  PCIcon,
  PCProgress,
} from '@/Components'
import { PCForm, PCInput, PCSubmitButton } from '@/Components/PCForms'
import { profileType } from '@/Types'
import { validationSchema } from './validation'
import Logger from '@/Utils/Logger'
import Styles from '@/Utils/Styles'
import {
  imagePickerLaunchCamera,
  imagePickerLaunchLibrary,
} from '@/Utils/imagePicker'
import { imageURI } from '@/Utils/dataConverter'
import { FilePaths } from '@/FireNames/Constants'

interface Props {}

const { useEffect, useState } = React
export default function EditProfile({}: Props) {
  const [firebase, firestore]: [
    ExtendedFirebaseInstance,
    ExtendedFirestoreInstance,
  ] = [useFirebase(), useFirestore()]

  const { profile } = useSelector(
    (state: { firebase: { profile: profileType } }) => state.firebase,
  )
  const [editProfile, setEditProfile] = useState<boolean>(false)
  const toggleEdit = () => setEditProfile(!editProfile)
  const [imagePickerType, setimagePickerType] = useState<string | null>(null)
  const [activity, setActivity] = useState<boolean>(false)
  const [uploading, setUploading] = useState<boolean>(false)
  const [transferred, setTransferred] = useState<number>(0)

  // define methods needed from firebase
  const { updateProfile, storage, auth } = firebase
  // define methods from firestore
  const { update } = firestore

  const onSubmit = (values: {
    firstName: string
    lastName: string
    nickname: string
  }) => {
    Logger.debug('onSubmit: values =', values)
    const { firstName, lastName, nickname } = values
    updateProfile({
      firstName,
      lastName,
      nickname,
    })
  }

  const uploadToServer = async (image: string) => {
    setUploading(true)
    try {
      Logger.debug('uploadToServer: image =', image)
      const path = FilePaths.PROFILE_PHOTO
      const { uid } = await auth().currentUser
      const ref = `${path}/${uid}.jpg`
      const task = await storage().ref(ref).putFile(image)
      Logger.debug('task =', task)
      const uploadSnapshot = await storage().ref(ref)
      const photoURL = await uploadSnapshot.getDownloadURL()
      await updateProfile({ photoURL })
      await update(`publicUsers/${uid}`, { photoURL })
    } catch (error) {
      Logger.debug('uploadToServer: error =', error)
    } finally {
      setUploading(false)
    }
  }

  const openImagePicker = () => {
    Logger.debug('openImagePicker: openImagePicker =', imagePickerType)
    setActivity(true)
    try {
      switch (imagePickerType) {
        case 'Camera':
          setTimeout(() => imagePickerLaunchCamera(uploadToServer), 1000)
          break
        case 'Library':
          setTimeout(() => imagePickerLaunchLibrary(uploadToServer), 1000)
          break
        default:
          Logger.debug('is null')
          break
      }
    } catch (error) {
      Logger.debug('openImagePicker: error =', error)
    } finally {
      setimagePickerType(null)
      setActivity(false)
    }
  }

  // handling change of imagePickerType for uploading photo
  useEffect(openImagePicker, [imagePickerType])

  return (
    <>
      {activity && <ActivityIndicator size="large" />}
      <MainContainer headerProps={{ heading: 'Edit Profile' }}>
        <Div p="md">
          <PCText>edit profile</PCText>
          <PCText>{JSON.stringify(profile)}</PCText>
          {editProfile ? (
            <PCForm
              initialValues={{
                firstName: '',
                lastName: '',
                nickname: '',
              }}
              onSubmit={onSubmit}
              validationSchema={validationSchema}>
              <Div alignItems="center">
                <PCActionSheetOpener
                  dropdownTitle="Upload a Photo"
                  dropdownOptions={[
                    {
                      method: () => setimagePickerType('Camera'),
                      text: 'Camera',
                      prefix: (
                        <PCIcon
                          name="add-a-photo"
                          size="4xl"
                          mr="lg"
                          fontFamily="MaterialIcons"
                        />
                      ),
                    },
                    {
                      method: () => setimagePickerType('Library'),
                      text: 'Choose From Library',
                      prefix: (
                        <PCIcon
                          name="add-photo-alternate"
                          size="4xl"
                          mr="lg"
                          fontFamily="MaterialIcons"
                        />
                      ),
                    },
                  ]}>
                  {uploading ? (
                    <Div
                      h={103}
                      w={103}
                      alignSelf="center"
                      alignItems="center"
                      justifyContent="center">
                      <PCProgress
                        type="circle"
                        progress={transferred}
                        thickness={5}
                      />
                    </Div>
                  ) : (
                    <PCImage
                      h={103}
                      w={103}
                      imgSrc={
                        profile?.photoURL
                          ? imageURI(profile.photoURL)
                          : Styles.images.smallLogo
                      }
                      rounded="circle"
                    />
                  )}
                </PCActionSheetOpener>
              </Div>
              <PCInput label="First Name" val="firstName" autoCorrect={false} />
              <PCInput label="Last Name" val="lastName" autoCorrect={false} />
              <PCInput
                label="Nickname"
                val="nickname"
                autoCorrect={false}
                autoCapitalize="none"
              />
              <Div row>
                <PCSubmitButton title="Update" />
                <PCButton onPress={toggleEdit} mx="xs">
                  Cancel
                </PCButton>
              </Div>
            </PCForm>
          ) : (
            <Div>
              <PCCard
                profileProps={{
                  image: profile?.photoURL
                    ? imageURI(profile.photoURL)
                    : Styles.images.smallLogo,
                  editable: true,
                  editFunction: () => toggleEdit(),
                  email: profile.email,
                  firstName: profile.firstName,
                  lastName: profile.lastName,
                  nickname: profile.nickname,
                }}
              />
            </Div>
          )}
        </Div>
      </MainContainer>
    </>
  )
}

const styles = StyleSheet.create({})
