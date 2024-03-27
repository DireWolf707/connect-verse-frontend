"use client"
import MessageCard from "@/components/shared/cards/MessageCard"
import ConversationInput from "@/components/shared/inputs/ConversationInput"
import SpinnerText from "@/components/shared/loading/SpinnerText"
import { key } from "@/lib/utils"
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

    const onDeleteMsg = (deletedMsg) => {
      setMessages((pv) =>
        pv.map((msg) => {
          if (msg.message.id === deletedMsg.message.id) return deletedMsg
          return msg
        })
      )
      setLastMessage(deletedMsg)
    }

    const { otherUser, messages, conversationId } = data
    setOtherUser(otherUser)
    setMessages(messages)

    socket.on(key("new_msg", conversationId), onNewMsg)
    socket.on(key("delete_msg", conversationId), onDeleteMsg)

    return () => {
      resetOtherUser()
      queryClient.removeQueries({ queryKey: ["conversation", otherUserId] })
      socket.emit("unsub_conv_msgs", { conversationId })
      socket.off(key("new_msg", conversationId), onNewMsg)
      socket.off(key("delete_msg", conversationId), onDeleteMsg)
    }
  }, [data])

  useEffect(() => {
    if (!bottomRef?.current) return

    if (
      !lastMsg ||
      (lastMsg.user.id === me.id &&
        !lastMsg.message.isEdited &&
        !lastMsg.message.isDeleted) ||
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
            message={message}
            user={user}
            otherUserId={otherUserId}
            me={me}
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
