"use client"
import SpinnerText from "@/components/shared/loading/SpinnerText"
import { useToken } from "@/state/apis/group"
import { useUI } from "@/state/store"
import {
  ControlBar,
  GridLayout,
  LiveKitRoom,
  ParticipantTile,
  RoomAudioRenderer,
  useTracks,
} from "@livekit/components-react"
import "@livekit/components-styles"
import { useQueryClient } from "@tanstack/react-query"
import { Track } from "livekit-client"
import { useParams } from "next/navigation"
import { useEffect } from "react"

function VideoConference() {
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false }
  )
  return (
    <GridLayout tracks={tracks}>
      <ParticipantTile />
    </GridLayout>
  )
}

const VideoChannel = () => {
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

  if (!data) return <SpinnerText text="Loading video channel" />

  return (
    <LiveKitRoom
      token={data.token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      data-lk-theme="default"
      className="flex grow flex-col justify-between overflow-auto"
    >
      <VideoConference />
      <RoomAudioRenderer />
      <ControlBar
        variation="minimal"
        controls={{
          leave: false,
        }}
      />
    </LiveKitRoom>
  )
}

export default VideoChannel
