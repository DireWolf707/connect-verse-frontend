"use client"
import { Separator } from "@/components/ui/separator"
import { key } from "@/lib/utils"
import { useUser } from "@/state/apis/userApi"
import { useSocket } from "@/state/store"
import { useEffect, useState } from "react"
import ConversationCard from "../cards/ConversationCard"
import SpinnerText from "../loading/SpinnerText"
import UserSearchModal from "../modals/UserSearchModal"

const ConversationSidebar = () => {
  const socket = useSocket((state) => state.socket)
  const [conversations, setConversations] = useState(null)
  const { data: user } = useUser()

  useEffect(() => {
    const onNewMsg = (newMsg) =>
      setConversations((pv) => {
        const filteredConversations = pv.filter(
          (conversation) => conversation.id !== newMsg.id
        )
        return [newMsg, ...filteredConversations]
      })

    socket.emitWithAck("sub_user_convs").then((conversations) => {
      setConversations(conversations)

      socket.on(key("new_msg", user.id), onNewMsg)
    })

    return () => {
      socket.emit("unsub_user_convs")
      socket.off(key("new_msg", user.id), onNewMsg)
    }
  }, [])

  return (
    <div className="flex grow flex-col rounded-tl-xl bg-black/15 p-2 dark:bg-white/15">
      <div className="flex items-center justify-between p-1">
        <span className="text-main">MESSAGES</span>

        <UserSearchModal />
      </div>

      <Separator className="my-1 bg-slate-600 dark:bg-slate-300" />

      <div className="grow py-3">
        {conversations ? (
          conversations.map((conversation) => (
            <ConversationCard
              key={conversation.id}
              user={conversation.user}
              message={conversation.message}
            />
          ))
        ) : (
          <SpinnerText text="Loading conversations" />
        )}
      </div>
    </div>
  )
}

export default ConversationSidebar
