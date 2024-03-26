import { formatDate } from "@/lib/utils"
import { useUser } from "@/state/apis/userApi"
import { FileIcon, FileImageIcon, FileVideoIcon } from "lucide-react"
import Link from "next/link"
import UserAvatar from "../user/UserAvatar"

const RenderMessage = ({ message, name }) => {
  const { data: user } = useUser()

  return (
    <div className="flex items-center gap-1.5">
      {user.id === message.userId ? (
        <span className="text-main">Me:</span>
      ) : (
        <span className="text-main">{name}:</span>
      )}

      {message.type === "image" ? (
        <FileImageIcon className="size-[20px] fill-white stroke-black" />
      ) : message.type === "video" ? (
        <FileVideoIcon className="size-[20px] fill-white stroke-black" />
      ) : message.type === "file" ? (
        <FileIcon className="size-[20px] fill-white stroke-black" />
      ) : (
        <p className="text-main line-clamp-1 break-all">{message.content}</p>
      )}
    </div>
  )
}

const ConversationCard = ({ user, message }) => (
  <Link
    className="flex gap-2 p-1.5 hover:bg-black/10 dark:hover:bg-black/30"
    href={`/conversation/${user.id}`}
  >
    <UserAvatar src={user.avatar} username={user.username} />

    <div className="flex grow flex-col gap-0.5">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-bold">{user.username}</span>
      </div>

      <RenderMessage message={message} name={user.name} />

      <span className="self-end text-[9.5px] font-[600]">
        {formatDate(message.createdAt)}
      </span>
    </div>
  </Link>
)

export default ConversationCard
