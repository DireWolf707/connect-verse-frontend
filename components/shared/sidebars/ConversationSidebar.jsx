"use client"
import { Separator } from "@/components/ui/separator"
import { useGetConversations } from "@/state/apis/conversationApi"
import { useSocket } from "@/state/store"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import ConversationCard from "../cards/ConversationCard"
import SpinnerText from "../loading/SpinnerText"
import UserSearchModal from "../modals/UserSearchModal"

const ConversationSidebar = () => {
  const queryClient = useQueryClient()
  const socket = useSocket((state) => state.socket)
  const [conversations, setConversations] = useState(null)

  const { data: _conversations } = useGetConversations()

  useEffect(() => {
    if (!_conversations) return

    const onNewConv = (newConv) =>
      setConversations((pv) => {
        const filteredConversations = pv.filter(
          (conversation) => conversation.id !== newConv.id
        )
        return [newConv, ...filteredConversations]
      })

    setConversations(_conversations)

    socket.on("new_conv", onNewConv)

    return () => {
      queryClient.removeQueries({ queryKey: ["conversations"] })
      socket.emit("unsub_user_convs")
      socket.off("new_conv", onNewConv)
    }
  }, [_conversations])

  return (
    <div className="flex grow flex-col rounded-tl-xl bg-[#dfe7e8] dark:bg-[#403544]">
      <div className="flex flex-col gap-1 p-4">
        <div className="flex justify-between">
          <span className="text-main">MESSAGES</span>
          <UserSearchModal />
        </div>

        <Separator className="bg-black dark:bg-white" />
      </div>

      <div className="flex grow flex-col gap-0.5 pb-1">
        {conversations ? (
          conversations.map((conversation) => (
            <ConversationCard
              key={conversation.message.id} // for re-rendering issue
              user={conversation.user}
              message={conversation.message}
              conversationId={conversation.id}
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
