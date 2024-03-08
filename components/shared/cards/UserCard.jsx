import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { formatDate } from "@/lib/utils"
import { UserRoundCheckIcon, UserRoundXIcon } from "lucide-react"
import { useState } from "react"
import UserAvatar from "../user/UserAvatar"

const BlockButton = ({ text, Icon }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="destructive" size="link">
          <Icon className="size-8 p-1" />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">{text}</TooltipContent>
    </Tooltip>
  </TooltipProvider>
)

const UserCard = ({ user, showJoined = true, showBlock = false }) => {
  const [isBlocked, setIsBlocked] = useState(user.isBlocked)

  return (
    <div className="flex grow items-center justify-between px-1">
      <div className="flex gap-3">
        <UserAvatar src={user.avatar} username={user.username} />

        <div className="flex flex-col">
          <span className="text-sm font-semibold">{user.username}</span>

          <span className="text-main">({user.name})</span>
        </div>
      </div>

      {showJoined && (
        <span className="text-main">Joined: {formatDate(user.createdAt)}</span>
      )}

      {showBlock ? (
        isBlocked ? (
          <BlockButton Icon={UserRoundCheckIcon} text="Unblock user" />
        ) : (
          <BlockButton Icon={UserRoundXIcon} text="Block user" />
        )
      ) : (
        <></>
      )}
    </div>
  )
}

export default UserCard
