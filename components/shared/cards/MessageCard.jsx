import { Textarea } from "@/components/ui/textarea"
import { cn, formatDateWithTime, key } from "@/lib/utils"
import { useDeleteMessage, useEditMessage } from "@/state/apis/conversationApi"
import { useSocket } from "@/state/store"
import {
  CheckIcon,
  FileIcon,
  ImageIcon,
  SquarePenIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import UserAvatar from "../user/UserAvatar"

const RenderMessage = ({ message }) => {
  const [loading, setLoading] = useState(true)

  if (message.isDeleted)
    return <span className="text-main italic">Message Deleted</span>

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

const MessageCard = ({ me, user, otherUserId, message: _message }) => {
  const socket = useSocket((state) => state.socket)
  const [isMe] = useState(me.id == user.id)
  const [editMode, setEditMode] = useState(false)
  const [message, setMessage] = useState(_message)
  const [content, setContent] = useState(message.content)

  const { handler: deleteMsg } = useDeleteMessage({
    otherUserId,
    messageId: message.id,
  })

  const { handler: editMsg } = useEditMessage({
    otherUserId,
    messageId: message.id,
  })

  const editModeCloseHandler = () => {
    setEditMode(false)
    setContent(message.content)
  }

  const editMessageHandler = () =>
    editMsg({ content }).finally(() => setEditMode(false))

  useEffect(() => {
    socket.on(key("modify_msg", message.id), setMessage)

    return () => socket.off(key("modify_msg", message.id), setMessage)
  }, [])

  return (
    <div
      className={cn("flex gap-3", {
        "flex-row-reverse": isMe,
      })}
    >
      <div className="sticky top-0 self-start">
        <UserAvatar src={user.avatar} username={user.username} />
      </div>

      <div className="group flex flex-col gap-1">
        <span className={cn("text-xs font-bold", { "self-end": isMe })}>
          {user.username}
        </span>

        <div
          className={cn("flex items-center gap-2", {
            "flex-row-reverse": isMe,
          })}
        >
          <div
            className={cn("rounded-lg p-1.5 bg-[#e6f5f6] dark:bg-[#260732]", {
              "self-end": isMe,
            })}
          >
            {editMode ? (
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="text-main w-[220px] break-all text-[12px] leading-5 md:w-[340px] md:text-[14px] lg:w-[540px]"
              />
            ) : (
              <RenderMessage message={message} />
            )}
          </div>

          {isMe && !message.isDeleted && !editMode && (
            <>
              <Trash2Icon
                onClick={() => deleteMsg()}
                className="hidden size-7 cursor-pointer rounded-full stroke-red-400 p-1.5 hover:bg-red-500 hover:stroke-white group-hover:block"
              />

              {message.type === "text" && (
                <SquarePenIcon
                  onClick={() => setEditMode(true)}
                  className="hidden size-7 cursor-pointer rounded-full stroke-violet-400 p-1.5 hover:bg-violet-500 hover:stroke-white group-hover:block"
                />
              )}
            </>
          )}

          {editMode && (
            <>
              <XIcon
                onClick={editModeCloseHandler}
                className="size-7 cursor-pointer rounded-full stroke-red-400 p-1.5 hover:bg-red-500 hover:stroke-white"
              />
              <CheckIcon
                onClick={editMessageHandler}
                className="size-7 cursor-pointer rounded-full stroke-violet-400 p-1.5 hover:bg-violet-500 hover:stroke-white"
              />
            </>
          )}
        </div>

        <div
          className={cn("flex gap-1", {
            "flex-row-reverse self-end": isMe,
          })}
        >
          <span className="text-main">
            {formatDateWithTime(message.createdAt)}
          </span>

          {message.isEdited && (
            <span className="text-main italic">(edited)</span>
          )}

          {message.isDeleted && (
            <span className="text-main italic">(deleted)</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default MessageCard
