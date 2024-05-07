"use client"
import SpinnerText from "@/components/shared/loading/SpinnerText"
import { useToken } from "@/state/apis/group"
import { useUI } from "@/state/store"
import {
  ControlBar,
  GridLayout,
  LiveKitRoom,
  ParticipantAudioTile,
  RoomAudioRenderer,
  useTracks,
} from "@livekit/components-react"
import "@livekit/components-styles"
import { useQueryClient } from "@tanstack/react-query"
import { Track } from "livekit-client"
import { useParams } from "next/navigation"
import { useEffect } from "react"

function AudioConference() {
  const tracks = useTracks(
    [{ source: Track.Source.Microphone, withPlaceholder: true }],
    { onlySubscribed: false }
  )
  return (
    <GridLayout tracks={tracks}>
      <ParticipantAudioTile />
    </GridLayout>
  )
}

const AudioChannel = () => {
  const queryClient = useQueryClient()
  const { groupId, channelId } = useParams()
  const setChannelName = useUI((state) => state.setChannelName)
  const resetChannelName = useUI((state) => state.setChannelName)
  const { data } = useToken(groupId, channelId)

  useEffect(() => {
    if (!data) return

    setChannelName(data.channel.name)

    return () => {
      queryClient.removeQueries({ queryKey: ["channel", channelId] })
      resetChannelName()
    }
  }, [data])

  if (!data) return <SpinnerText text="Loading audio channel" />

  return (
    <LiveKitRoom
      token={data.token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      data-lk-theme="default"
      className="flex grow flex-col justify-between overflow-auto"
    >
      <AudioConference />
      <RoomAudioRenderer />
      <ControlBar
        variation="minimal"
        controls={{
          camera: false,
          screenShare: false,
          leave: false,
        }}
      />
    </LiveKitRoom>
  )
}

export default AudioChannel
