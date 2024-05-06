"use client"
import ChannelMessageCard from "@/components/shared/cards/ChannelMessageCard"
import ChannelInput from "@/components/shared/inputs/ChannelInput"
import SpinnerText from "@/components/shared/loading/SpinnerText"
import { key } from "@/lib/utils"
import { useChannel } from "@/state/apis/group"
import { useSocket, useUI } from "@/state/store"
import { useQueryClient } from "@tanstack/react-query"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { useInView } from "react-cool-inview"

const Channel = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { groupId, channelId } = useParams()
  const socket = useSocket((state) => state.socket)
  const setChannelName = useUI((state) => state.setChannelName)
  const resetChannelName = useUI((state) => state.setChannelName)
  const bottomRef = useRef(null)
  const [messages, setMessages] = useState(null)
  const [channel, setChannel] = useState(null)
  const [lastMsg, setLastMessage] = useState(null)
  const [stickToBottom, setStickToBottom] = useState(null)
  const { observe } = useInView({
    onEnter: () => setStickToBottom(true),
    onLeave: () => setStickToBottom(false),
  })
  const { data: _channel } = useChannel(groupId, channelId)

  useEffect(() => {
    if (!_channel) return

    const channelKey = key("channel", _channel.id)
    const newMessageKey = key(channelKey, "new_message")
    const updateChannelKey = key(channelKey, "channel_update")
    const deleteChannelKey = key(channelKey, "channel_delete")

    const onNewMsg = (newMsg) => {
      setMessages((pv) => [...pv, newMsg])
      setLastMessage(newMsg)
    }

    const onUpdateChannel = (updatedChannel) =>
      setChannel((pv) => ({ ...pv, ...updatedChannel }))

    const onDeleteChannel = () => router.replace("../")

    setMessages(_channel.messages)
    setChannel(_channel)

    socket.on(newMessageKey, onNewMsg)
    socket.on(updateChannelKey, onUpdateChannel)
    socket.on(deleteChannelKey, onDeleteChannel)

    return () => {
      resetChannelName()
      socket.off(newMessageKey, onNewMsg)
      socket.off(updateChannelKey, onUpdateChannel)
      socket.off(deleteChannelKey, onDeleteChannel)
      queryClient.removeQueries({ queryKey: ["channel", channelId] })
      socket.emit("unsub_channel", channelId)
    }
  }, [_channel])

  useEffect(() => {
    if (!channel) return

    setChannelName(channel.name)
  }, [channel])

  useEffect(() => {
    if (!bottomRef?.current) return

    if (
      // first render
      !lastMsg ||
      // my new message (setLastMessage only on new message)
      lastMsg.user.id === channel.member.userId ||
      // when at bottom
      stickToBottom
    )
      bottomRef.current.scrollIntoView()
  }, [messages])

  if (!messages) return <SpinnerText text="Loading messages" />

  return (
    <>
      <div className="flex grow flex-col gap-3 overflow-auto p-3">
        {messages.map((message) => (
          <ChannelMessageCard
            key={message.id}
            channel={channel}
            message={message}
          />
        ))}

        <div
          ref={(ele) => {
            observe(ele)
            bottomRef.current = ele
          }}
        />
      </div>

      <ChannelInput channel={channel} />
    </>
  )
}

export default Channel
