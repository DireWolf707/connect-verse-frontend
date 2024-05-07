"use client"
import SpinnerText from "@/components/shared/loading/SpinnerText"
import { key } from "@/lib/utils"
import { useToken } from "@/state/apis/group"
import { useSocket, useUI } from "@/state/store"
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
import { useParams, useRouter } from "next/navigation"
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
  const router = useRouter()
  const queryClient = useQueryClient()
  const { groupId, channelId } = useParams()
  const setChannelName = useUI((state) => state.setChannelName)
  const resetChannelName = useUI((state) => state.setChannelName)
  const socket = useSocket((state) => state.socket)
  const { data } = useToken(groupId, channelId)

  useEffect(() => {
    if (!data) return

    const { channel } = data
    const channelKey = key("channel", channel.id)
    const updateChannelKey = key(channelKey, "channel_update")
    const deleteChannelKey = key(channelKey, "channel_delete")

    const onUpdateChannel = (updatedChannel) =>
      setChannelName(updatedChannel.name)

    const onDeleteChannel = () =>
      router.replace(window.location.origin + "/group/" + groupId)

    setChannelName(channel.name)

    socket.on(updateChannelKey, onUpdateChannel)
    socket.on(deleteChannelKey, onDeleteChannel)

    return () => {
      socket.off(updateChannelKey, onUpdateChannel)
      socket.off(deleteChannelKey, onDeleteChannel)
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
