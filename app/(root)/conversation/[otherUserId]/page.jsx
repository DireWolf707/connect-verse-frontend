"use client"
import ConversationCard from "@/components/shared/cards/ConversationCard"
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
  const [conversationId, setConversationId] = useState(null)
  const bottomRef = useRef(null)

  useEffect(() => {
    const onNewMsg = (newMsg) => setMessages((pv) => [...pv, newMsg])

    socket
      .emitWithAck("sub_conv_msgs", { otherUserId })
      .then(({ otherUser, messages, conversationId }) => {
        setOtherUser(otherUser)
        setMessages(messages)
        setConversationId(conversationId)
        socket.on(key("new_msg", conversationId), onNewMsg)
      })

    return () => {
      resetOtherUser()
      if (conversationId) socket.off(key("new_msg", conversationId))
      // TODO: unsub
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
          <ConversationCard key={message.id} message={message} user={user} />
        ))}

        <div ref={bottomRef} />
      </div>

      <ConversationInput otherUserId={otherUserId} />
    </>
  )
}

export default ConversationPage
