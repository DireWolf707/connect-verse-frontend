import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import { useBlock, useUnblock } from "@/state/apis/conversationApi"
import { UserRoundCheckIcon, UserRoundXIcon } from "lucide-react"
import { useState } from "react"
import UserAvatar from "../user/UserAvatar"

const BlockButton = ({ otherUserId, setIsBlocked }) => {
  const { handler: block } = useBlock({ otherUserId })

  const blockHandler = () => block().then(() => setIsBlocked(true))

  return (
    <Button onClick={blockHandler} variant="destructive" size="link">
      <UserRoundXIcon className="size-8 p-1" />
    </Button>
  )
}

const UnblockButton = ({ otherUserId, setIsBlocked }) => {
  const { handler: unblock } = useUnblock({ otherUserId })

  const unblockHandler = () => unblock().then(() => setIsBlocked(false))

  return (
    <Button onClick={unblockHandler} size="link">
      <UserRoundCheckIcon className="size-8 p-1" />
    </Button>
  )
}

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
          <UnblockButton otherUserId={user.id} setIsBlocked={setIsBlocked} />
        ) : (
          <BlockButton otherUserId={user.id} setIsBlocked={setIsBlocked} />
        )
      ) : (
        <></>
      )}
    </div>
  )
}

export default UserCard
