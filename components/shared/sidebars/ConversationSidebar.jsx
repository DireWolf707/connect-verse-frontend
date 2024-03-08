"use client"
import { Separator } from "@/components/ui/separator"
import { useSocket } from "@/state/store"
import UserSearchModal from "../modals/UserSearchModal"

const ConversationSidebar = () => {
  const socket = useSocket((state) => state.socket)

  return (
    <div className="grow rounded-tl-xl bg-black/15 p-2 dark:bg-white/15">
      <div className="flex items-center justify-between p-1">
        <span className="text-main">MESSAGES</span>

        <UserSearchModal />
      </div>

      <Separator className="my-1 bg-slate-600 dark:bg-slate-300" />
    </div>
  )
}

export default ConversationSidebar
