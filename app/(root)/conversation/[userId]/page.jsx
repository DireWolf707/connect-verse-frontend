"use client"
import ConversationInput from "@/components/shared/inputs/ConversationInput"
import SpinnerText from "@/components/shared/loading/SpinnerText"
import { useSocket, useUI } from "@/state/store"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

const ConversationPage = () => {
  const { userId } = useParams()
  const socket = useSocket((state) => state.socket)
  const setOtherUser = useUI((state) => state.setOtherUser)
  const resetOtherUser = useUI((state) => state.resetOtherUser)
  const [messages, setMessages] = useState(null)

  useEffect(() => {
    socket
      .emitWithAck("sub_conv_msgs", { otherUserId: userId })
      .then(({ otherUser, messages }) => {
        setOtherUser(otherUser)
        setMessages(messages)
      })

    return () => {
      resetOtherUser()
      // TODO: unsub
    }
  }, [])

  if (!messages) return <SpinnerText text="Loading messages" />

  return (
    <>
      <div className="grow"></div>

      <ConversationInput />
    </>
  )
}

export default ConversationPage
