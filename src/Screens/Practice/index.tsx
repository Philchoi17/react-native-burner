import * as React from 'react'
import {
  Button,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  AppState,
  AppStateStatus,
  Platform,
} from 'react-native'
import { Div } from 'react-native-magnus'
import {
  TwilioVideoLocalView,
  TwilioVideoParticipantView,
  TwilioVideo,
} from 'react-native-twilio-video-webrtc'
import {
  check,
  PERMISSIONS,
  request,
  RESULTS,
  requestMultiple,
} from 'react-native-permissions'
import { checkAndRequest } from '@/Utils/permissions'

import MainContainer from '@/Containers/MainContainer'
import {
  PCText,
  PCProgress,
  PCMisc,
  PCCalendar,
  PCVideoChat,
  PCButton,
  PCLoading,
} from '@/Components'
import { GDMoodPicker } from '@/Components/GDJournal'
import Logger from '@/Utils/Logger'
import { fetchVideoToken } from '@/Services/fetchServices'
import { useAppState } from '@react-native-community/hooks'

const { useState, useEffect, useRef } = React
export default ({}) => {
  const [progress, setProgress] = useState<number>(0)
  const progressFill = () => {
    if (progress == 1) return
    setProgress(progress + 0.1)
  }
  const state = useAppState()
  const [isAudioEnabled, setIsAudioEnabled] = useState(true)
  const [isVideoEnabled, setIsVideoEnabled] = useState(true)
  const [status, setStatus] = useState('disconnected')
  const [participants, setParticipants] = useState(new Map())
  const [videoTracks, setVideoTracks] = useState(new Map())
  const [token, setToken] = useState('')
  const twilioRef = useRef(null)
  const [toggle, setToggle] = useState<boolean>(false)

  useEffect(() => {
    Logger.debug('src: App.tsx: state has changed', state)
    const videoCamMicPermissionListener = async (state: AppStateStatus) => {
      Logger.debug('ask for permissions')
      try {
        const permissionRequests =
          Platform.OS == 'ios'
            ? checkAndRequest(['mic', 'camera'])
            : checkAndRequest(['mic', 'camera', 'writeExtStorage'])
        Logger.debug('permissionRequests =', permissionRequests)
        // const ios_permissionRequestArr = [
        //   PERMISSIONS.IOS.MICROPHONE,
        //   PERMISSIONS.IOS.CAMERA,
        // ]
        // const android_permissionRequestArr = [
        //   PERMISSIONS.ANDROID.RECORD_AUDIO,
        //   PERMISSIONS.ANDROID.CAMERA,
        //   PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        // ]
        // const permissions =
        //   Platform.OS == 'android'
        //     ? android_permissionRequestArr
        //     : ios_permissionRequestArr
        // const requestVidCamMic = await requestMultiple(permissions)
        // Logger.debug('requestVidCamMic =', requestVidCamMic)
      } catch (error) {
        Logger.debug('videoCamMicPermissionListener: error =', error)
      }
    }

    const listener = AppState.addEventListener(
      'change',
      videoCamMicPermissionListener,
    )
    // const appPermissionListener = async (status: AppStateStatus) => {
    //   try {
    //     if (Platform.OS == 'ios' && status == 'active') {
    //       const appTrackingTransparency = await request(
    //         PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY,
    //       )
    //       Logger.debug('appTrackingTransparency =', appTrackingTransparency)
    //     }
    //   } catch (error) {
    //     Logger.debug('appPermissionListener: error =', error)
    //   }
    // }
    // const listener = AppState.addEventListener('change', appPermissionListener)

    return listener.remove
  }, [state])

  // const _onConnectButtonPress = async () => {
  //   const { token } = await fetchVideoToken()
  //   await twilioRef.current.connect({ accessToken: token })
  //   setStatus('connecting')
  // }

  // const _onEndButtonPress = () => {
  //   twilioRef.current.disconnect()
  // }

  // const _onMuteButtonPress = () => {
  //   twilioRef.current
  //     .setLocalAudioEnabled(!isAudioEnabled)
  //     .then((isEnabled) => setIsAudioEnabled(isEnabled))
  // }

  // const _onFlipButtonPress = () => {
  //   twilioRef.current.flipCamera()
  // }

  // const _onRoomDidConnect = ({ roomName, error }) => {
  //   console.log('onRoomDidConnect: ', roomName)

  //   setStatus('connected')
  // }

  // const _onRoomDidDisconnect = ({ roomName, error }) => {
  //   console.log('[Disconnect]ERROR: ', error)

  //   setStatus('disconnected')
  // }

  // const _onRoomDidFailToConnect = (error) => {
  //   console.log('[FailToConnect]ERROR: ', error)

  //   setStatus('disconnected')
  // }

  // const _onParticipantAddedVideoTrack = ({ participant, track }) => {
  //   console.log('onParticipantAddedVideoTrack: ', participant, track)

  //   setVideoTracks(
  //     new Map([
  //       ...videoTracks,
  //       [
  //         track.trackSid,
  //         { participantSid: participant.sid, videoTrackSid: track.trackSid },
  //       ],
  //     ]),
  //   )
  // }

  // const _onParticipantRemovedVideoTrack = ({ participant, track }) => {
  //   console.log('onParticipantRemovedVideoTrack: ', participant, track)

  //   const videoTracksLocal = videoTracks
  //   videoTracksLocal.delete(track.trackSid)

  //   setVideoTracks(videoTracksLocal)
  // }

  // setTimeout(progressFill, 100)

  return (
    <MainContainer
      headerProps={{
        heading: 'Practice',
      }}>
      <Div p="md">
        <PCText>Hello there</PCText>
        <PCButton onPress={() => Logger.debug('hello')}>
          <PCText>HELLO</PCText>
        </PCButton>

        {/* <PCText>Practice Screen</PCText>
        <PCProgress type="snail" />
        <PCProgress type="circle" />
        <PCProgress type="pie" />
        <PCProgress progress={0.5} /> */}

        {/* <PCLoading /> */}
        {/* <PCVideoChat visible={toggle} close={() => setToggle(false)} />
        <PCButton onPress={() => setToggle(true)}>open</PCButton> */}
        {/* <View style={styles.container}>
          {status === 'disconnected' && (
            <View>
              <Text style={styles.welcome}>React Native Twilio Video</Text>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                value={token}
                onChangeText={(text) => setToken(text)}></TextInput>
              <Button
                title="Connect"
                // style={styles.button}
                onPress={_onConnectButtonPress}></Button>
            </View>
          )}

          {(status === 'connected' || status === 'connecting') && (
            <View style={styles.callContainer}>
              {status === 'connected' && (
                <View style={styles.remoteGrid}>
                  {Array.from(videoTracks, ([trackSid, trackIdentifier]) => {
                    return (
                      <TwilioVideoParticipantView
                        style={styles.remoteVideo}
                        key={trackSid}
                        trackIdentifier={trackIdentifier}
                      />
                    )
                  })}
                </View>
              )}
              <View style={styles.optionsContainer}>
                <TouchableOpacity
                  style={styles.optionButton}
                  onPress={_onEndButtonPress}>
                  <Text style={{ fontSize: 12 }}>End</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.optionButton}
                  onPress={_onMuteButtonPress}>
                  <Text style={{ fontSize: 12 }}>
                    {isAudioEnabled ? 'Mute' : 'Unmute'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.optionButton}
                  onPress={_onFlipButtonPress}>
                  <Text style={{ fontSize: 12 }}>Flip</Text>
                </TouchableOpacity>
                <TwilioVideoLocalView
                  enabled={true}
                  style={styles.localVideo}
                />
              </View>
            </View>
          )}

          <TwilioVideo
            ref={twilioRef}
            // onRoomDidConnect={_onRoomDidConnect}
            onRoomDidDisconnect={_onRoomDidDisconnect}
            onRoomDidFailToConnect={_onRoomDidFailToConnect}
            onParticipantAddedVideoTrack={_onParticipantAddedVideoTrack}
            onParticipantRemovedVideoTrack={_onParticipantRemovedVideoTrack}
          />
        </View> */}
      </Div>
    </MainContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    color: 'black',
  },
  input: {
    height: 30,
    width: 200,
    borderWidth: 1,
  },
  button: {
    height: 30,
    width: 100,
  },
  callContainer: {
    flex: 1,
  },
  remoteGrid: {
    flex: 1,
  },
  remoteVideo: {
    flex: 1,
  },
  optionsContainer: {
    width: '100%',
  },
  optionButton: {
    height: 50,
    width: 75,
  },
  localVideo: {
    flex: 1,
  },
})
