import { cn, formatDateWithTime } from "@/lib/utils"
import { useUser } from "@/state/apis/userApi"
import { FileIcon, ImageIcon } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import UserAvatar from "../user/UserAvatar"

const RenderMessage = ({ message }) => {
  const [loading, setLoading] = useState(true)

  if (message.type === "image")
    return (
      <div className="relative h-[200px]">
        {loading && <ImageIcon className="absolute size-full stroke-1" />}
        <Image
          src={message.media}
          alt="media"
          height={200}
          width={320}
          className="size-full object-cover"
          loading="lazy"
          onLoad={() => setLoading(false)}
        />
      </div>
    )

  if (message.type === "video")
    return (
      <video
        src={message.media}
        alt="media"
        className="h-[200px] object-cover"
        controls
      />
    )

  if (message.type === "file")
    return (
      <a href={message.media} target="_blank" download>
        <FileIcon className="size-[80px] fill-white stroke-black" />
        <span className="text-main flex justify-center">
          {message.media.split(".").pop().toUpperCase()}
        </span>
      </a>
    )

  return <p className="text-main break-all text-[16px]">{message.content}</p>
}

const MessageCard = ({ user, message }) => {
  const { data: me } = useUser()
  const isMe = me.id == user.id

  return (
    <div
      className={cn("flex gap-3", {
        "flex-row-reverse": isMe,
      })}
    >
      <div className="sticky top-0 self-start">
        <UserAvatar src={user.avatar} username={user.username} />
      </div>

      <div className="flex flex-col gap-1">
        <div
          className={cn("flex items-center justify-between", {
            "self-end": isMe,
          })}
        >
          <span className="text-xs font-bold">{user.username}</span>
        </div>

        <div
          className={cn(
            "max-w-[320px] flex-col rounded-lg bg-black/10 p-2 dark:bg-white/10 self-start",
            {
              "self-end": isMe,
            }
          )}
        >
          <RenderMessage message={message} />
        </div>

        <span
          className={cn("text-[10px] font-[600] self-start", {
            "self-end": isMe,
          })}
        >
          {formatDateWithTime(message.createdAt)}
        </span>
      </div>
    </div>
  )
}

export default MessageCard
