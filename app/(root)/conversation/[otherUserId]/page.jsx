"use client"
import MessageCard from "@/components/shared/cards/MessageCard"
import ConversationInput from "@/components/shared/inputs/ConversationInput"
import SpinnerText from "@/components/shared/loading/SpinnerText"
import { key } from "@/lib/utils"
import { useSocket, useUI } from "@/state/store"
import { useParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"

const ConversationPage = () => {
  const { otherUserId } = useParams()
  const socket = useSocket((state) => state.socket)
  const setOtherUser = useUI((state) => state.setOtherUser)
  const resetOtherUser = useUI((state) => state.resetOtherUser)
  const [messages, setMessages] = useState(null)
  const [conversation, setConversation] = useState(null)
  const bottomRef = useRef(null)

  useEffect(() => {
    const onNewMsg = (newMsg) => setMessages((pv) => [...pv, newMsg])

    socket
      .emitWithAck("sub_conv_msgs", { otherUserId })
      .then(({ otherUser, messages, conversation }) => {
        setOtherUser(otherUser)
        setMessages(messages)
        setConversation(conversation)

        socket.on(key("new_msg", conversation.id), onNewMsg)
      })

    return () => {
      resetOtherUser()

      const conversationId = conversation.id
      socket.emit("unsub_conv_msgs", { conversationId })
      socket.off(key("new_msg", conversationId), onNewMsg)
    }
  }, [])

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
