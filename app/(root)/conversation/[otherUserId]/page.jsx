"use client"
import MessageCard from "@/components/shared/cards/MessageCard"
import ConversationInput from "@/components/shared/inputs/ConversationInput"
import SpinnerText from "@/components/shared/loading/SpinnerText"
import { key } from "@/lib/utils"
import { useGetMessages } from "@/state/apis/conversationApi"
import { useSocket, useUI } from "@/state/store"
import { useQueryClient } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"

const ConversationPage = () => {
  const { otherUserId } = useParams()
  const socket = useSocket((state) => state.socket)
  const setOtherUser = useUI((state) => state.setOtherUser)
  const resetOtherUser = useUI((state) => state.resetOtherUser)
  const [messages, setMessages] = useState(null)
  const bottomRef = useRef(null)

  const queryClient = useQueryClient()
  const { data } = useGetMessages({ otherUserId })

  useEffect(() => {
    if (!data) return

    const onNewMsg = (newMsg) => setMessages((pv) => [...pv, newMsg])

    const { otherUser, messages, conversationId } = data
    setOtherUser(otherUser)
    setMessages(messages)

    socket.on(key("new_msg", conversationId), onNewMsg)

    return () => {
      resetOtherUser()
      queryClient.removeQueries({ queryKey: ["conversation", otherUserId] })
      socket.emit("unsub_conv_msgs", { conversationId })
      socket.off(key("new_msg", conversationId), onNewMsg)
    }
  }, [data])

  useEffect(() => {
    bottomRef.current?.scrollIntoView()
  }, [messages])

  if (!messages) return <SpinnerText text="Loading messages" />

  return (
    <>
      <div className="flex grow flex-col gap-3 overflow-auto p-3">
        {messages.map(({ message, user }) => (
          <MessageCard key={message.id} message={message} user={user} />
        ))}

        <div ref={bottomRef} />
      </div>

      <ConversationInput otherUserId={otherUserId} />
    </>
  )
}

export default ConversationPage
