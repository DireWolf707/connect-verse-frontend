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
      <a
        href={message.media}
        target="_blank"
        className="relative block h-[150px] w-[220px] md:h-[240px] md:w-[320px]"
      >
        {loading && <ImageIcon className="absolute size-full stroke-1" />}

        <Image
          src={message.media}
          alt="media"
          height={200}
          width={320}
          className="size-full object-cover"
          onLoad={() => setLoading(false)}
        />
      </a>
    )

  if (message.type === "video")
    return (
      <video
        src={message.media}
        alt="media"
        className="h-[150px] w-[220px] object-cover md:h-[240px] md:w-[320px]"
        controls
      />
    )

  if (message.type === "file")
    return (
      <a href={message.media} target="_blank" download>
        <FileIcon className="size-[80px] fill-white stroke-black md:size-[140px]" />

        <span className="text-main flex justify-center">
          {message.media.split(".").pop().toUpperCase()}
        </span>
      </a>
    )

  return (
    <p className="text-main max-w-[220px] break-all text-[12px] leading-5 md:max-w-[340px] md:text-[14px] lg:max-w-[540px]">
      {message.content}
    </p>
  )
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
        <span className={cn("text-xs font-bold", { "self-end": isMe })}>
          {user.username}
        </span>

        <div
          className={cn(
            "rounded-lg bg-black/10 p-1.5 dark:bg-white/10 self-start",
            { "self-end": isMe }
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
