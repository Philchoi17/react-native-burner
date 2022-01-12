import * as React from 'react'
import { Div, Modal } from 'react-native-magnus'
import {
  TwilioVideoLocalView,
  TwilioVideoParticipantView,
  TwilioVideo,
  TrackEventCbArgs,
  RoomErrorEventArgs,
  TrackIdentifier,
} from 'react-native-twilio-video-webrtc'

interface VideoTrackProps extends TrackIdentifier {
  identity: string
}

import { PCText, PCHeader, PCButton, PCIcon, PCProgress } from '@/Components'
import Logger from '@/Utils/Logger'

interface Props {
  visible: boolean
  close: () => void
  accessToken?: string
}

type videoTrackStatusType = 'connecting' | 'disconnected' | 'connected'

const { useState, useRef, useEffect } = React
export default function PCVideoChat({ visible, close, accessToken }: Props) {
  const twilioRef = useRef<any>(null)

  const [videoTracks, setVideoTracks] = useState<VideoTrackProps[]>([])
  const [videoCallStatus, setVideoCallStatus] =
    useState<videoTrackStatusType>('connecting')

  const connectToRoom = () => {
    try {
      const connect = twilioRef.current.connect({
        accessToken,
        region: 'gll',
      })
      Logger.debug('connect =', connect)
    } catch (error) {
      Logger.debug('connectToRoom: error =', error)
    }
  }

  const PCVideoChatUseEffectHandler = () => {
    connectToRoom()
    Logger.debug('PCVideoChat use effect')
  }

  useEffect(PCVideoChatUseEffectHandler, [])

  const _onEndButtonPress = () => {
    twilioRef.current.disconnect()
    close()
  }

  const handleVideoStreamStream = () => {
    Logger.debug('handleVideoStream')
  }
  const handleAudioStream = () => {
    Logger.debug('handleAudioStream')
  }

  const _onRoomDidConnect = () => {
    Logger.debug('_onRoomDidConnect: connected')
    setVideoCallStatus('connected')
  }

  const _onRoomDidDisconnect = ({ error }: RoomErrorEventArgs) => {
    Logger.debug('_onRoomDidDisconnect: disconnected: error =', error)
    setVideoCallStatus('disconnected')
  }

  const _onRoomDidFailToConnect = ({ error }: RoomErrorEventArgs) => {
    Logger.debug('_onRoomDidFailToConnect: error =', error)
    setVideoCallStatus('disconnected')
  }

  const _onParticipantAddedVideoTrack = ({
    participant,
    track,
  }: TrackEventCbArgs) => {
    Logger.debug('_onParticipantAddedVideoTrack:', participant, track)
    const addedTrack = {
      participantSid: participant.sid,
      videoTrackSid: track.trackSid,
      identity: participant.identity,
    }
    setVideoTracks([...videoTracks, addedTrack])
  }

  const _onParticipantRemovedVideoTrack = ({
    participant,
    track,
  }: TrackEventCbArgs) => {
    Logger.debug(
      '_onParticipantRemovedVideoTrack: participant =',
      participant,
      'track =',
      track,
    )
  }

  return (
    <Modal isVisible={visible}>
      <PCHeader
        prefix={
          <Div row pl="sm">
            <PCButton bg="transparent" onPress={_onEndButtonPress}>
              <PCIcon name="close-outline" size="6xl" />
            </PCButton>
          </Div>
        }
        suffix={
          <Div row justifyContent="center" alignItems="center" pr="sm">
            <PCButton bg="transparent" onPress={handleAudioStream}>
              {/* microphone-outline microphone-off */}
              <PCIcon name={'microphone-outline'} size="6xl" />
            </PCButton>
            <PCButton bg="transparent" onPress={handleVideoStreamStream}>
              {/* video-outline video-off-outline */}
              <PCIcon name={'video-outline'} size="6xl" />
            </PCButton>
          </Div>
        }>
        Video Chat
      </PCHeader>
      <Div p="sm">
        {videoCallStatus == 'connecting' ? (
          <Div flex={1} justifyContent="center" alignItems="center">
            <PCProgress type="circle" />
            <PCText pt="sm">Connecting...</PCText>
          </Div>
        ) : (
          <Div borderWidth={1}>
            {videoTracks.map((videoTrack: VideoTrackProps) => (
              <TwilioVideoParticipantView
                key={videoTrack.videoTrackSid}
                trackIdentifier={videoTrack}
              />
            ))}
          </Div>
        )}
        <TwilioVideoLocalView enabled={true} />
        <TwilioVideo
          ref={twilioRef}
          onRoomDidConnect={_onRoomDidConnect}
          onRoomDidDisconnect={_onRoomDidDisconnect}
          onRoomDidFailToConnect={_onRoomDidFailToConnect}
          onParticipantAddedVideoTrack={_onParticipantAddedVideoTrack}
          onParticipantRemovedVideoTrack={_onParticipantRemovedVideoTrack}
        />
      </Div>
    </Modal>
  )
}
