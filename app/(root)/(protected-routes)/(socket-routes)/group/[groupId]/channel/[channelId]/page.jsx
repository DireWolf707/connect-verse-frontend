"use client"
import { useChannel } from "@/state/apis/group"
import { useUI } from "@/state/store"
import { useParams } from "next/navigation"
import { useEffect } from "react"

const Channel = () => {
  const { groupId, channelId } = useParams()
  const setChannelName = useUI((state) => state.setChannelName)
  const resetChannelName = useUI((state) => state.setChannelName)
  const { data: channel } = useChannel(groupId, channelId)

  useEffect(() => {
    if (channel) setChannelName(channel.name)
  }, [channel])

  useEffect(() => resetChannelName, [])

  return <div></div>
}

export default Channel
