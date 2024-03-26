"use client"
import { Separator } from "@/components/ui/separator"
import { key } from "@/lib/utils"
import { useGetConversations } from "@/state/apis/conversationApi"
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
  const { data: _conversations } = useGetConversations()

  useEffect(() => {
    if (!_conversations) return

    const onNewMsg = (newMsg) =>
      setConversations((pv) => {
        const filteredConversations = pv.filter(
          (conversation) => conversation.id !== newMsg.id
        )
        return [newMsg, ...filteredConversations]
      })

    setConversations(_conversations)

    socket.on(key("new_msg", user.id), onNewMsg)

    return () => {
      socket.emit("unsub_user_convs")
      socket.off(key("new_msg", user.id), onNewMsg)
    }
  }, [_conversations])

  return (
    <div className="flex grow flex-col rounded-tl-xl bg-black/15 dark:bg-white/15">
      <div className="flex flex-col gap-1 p-4">
        <div className="flex justify-between">
          <span className="text-main">MESSAGES</span>

          <UserSearchModal />
        </div>

        <Separator className="bg-slate-600 dark:bg-slate-300" />
      </div>

      <div className="flex grow flex-col gap-0.5 pb-1">
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
