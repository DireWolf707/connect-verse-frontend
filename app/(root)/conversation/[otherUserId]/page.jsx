"use client"
import MessageCard from "@/components/shared/cards/MessageCard"
import ConversationInput from "@/components/shared/inputs/ConversationInput"
import SpinnerText from "@/components/shared/loading/SpinnerText"
import { useGetMessages } from "@/state/apis/conversationApi"
import { useUser } from "@/state/apis/userApi"
import { useSocket, useUI } from "@/state/store"
import { useQueryClient } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { useInView } from "react-cool-inview"

const ConversationPage = () => {
  const { otherUserId } = useParams()
  const socket = useSocket((state) => state.socket)
  const setOtherUser = useUI((state) => state.setOtherUser)
  const resetOtherUser = useUI((state) => state.resetOtherUser)
  const bottomRef = useRef(null)
  const [messages, setMessages] = useState(null)
  const [lastMsg, setLastMessage] = useState(null)
  const [stickToBottom, setStickToBottom] = useState(null)

  const { observe } = useInView({
    onEnter: () => setStickToBottom(true),
    onLeave: () => setStickToBottom(false),
  })

  const queryClient = useQueryClient()
  const { data } = useGetMessages({ otherUserId })
  const { data: me } = useUser()

  useEffect(() => {
    if (!data) return

    const onNewMsg = (newMsg) => {
      setMessages((pv) => [...pv, newMsg])
      setLastMessage(newMsg)
    }

    const { otherUser, messages, conversationId } = data
    setOtherUser(otherUser)
    setMessages(messages)

    socket.on("new_msg", onNewMsg)

    return () => {
      resetOtherUser()
      queryClient.removeQueries({ queryKey: ["conversation", otherUserId] })

      socket.emit("unsub_conv", conversationId)
      socket.off("new_msg", onNewMsg)
    }
  }, [data])

  useEffect(() => {
    if (!bottomRef?.current) return

    if (
      // first render
      !lastMsg ||
      // my new message (setLastMessage only on new message)
      lastMsg.user.id === me.id ||
      // user new message (when at bottom)
      (lastMsg.user.id === otherUserId && stickToBottom)
    )
      bottomRef.current.scrollIntoView()
  }, [messages])

  if (!messages) return <SpinnerText text="Loading messages" />

  return (
    <>
      <div className="flex grow flex-col gap-3 overflow-auto p-3">
        {messages.map(({ message, user }) => (
          <MessageCard
            key={message.id}
            me={me}
            user={user}
            otherUserId={otherUserId}
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

      <ConversationInput otherUserId={otherUserId} />
    </>
  )
}

export default ConversationPage
