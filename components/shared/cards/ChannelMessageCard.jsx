import { Textarea } from "@/components/ui/textarea"
import { cn, formatDateWithTime, key } from "@/lib/utils"
import { useDeleteMessage, useUpdateMessage } from "@/state/apis/group"
import { useSocket } from "@/state/store"
import { CheckIcon, SquarePenIcon, Trash2Icon, XIcon } from "lucide-react"
import { useEffect, useState } from "react"
import UserAvatar from "../user/UserAvatar"
import RenderMessage from "./RenderMessage"

const ChannelMessageCard = ({ channel, message: _message }) => {
  const socket = useSocket((state) => state.socket)
  const [isMe] = useState(channel.member.userId == _message.user.id)
  const [editMode, setEditMode] = useState(false)
  const [message, setMessage] = useState(_message)
  const [content, setContent] = useState(message.content)

  const { handler: deleteMsg } = useDeleteMessage(
    channel.groupId,
    channel.id,
    _message.id
  )

  const { handler: editMsg } = useUpdateMessage(
    channel.groupId,
    channel.id,
    _message.id
  )

  const editModeCloseHandler = () => {
    setEditMode(false)
    setContent(message.content)
  }

  const editMessageHandler = () =>
    editMsg({ content }).finally(() => setEditMode(false))

  useEffect(() => {
    const channelKey = key("channel", channel.id)
    const updateMessageKey = key(channelKey, "update_message", message.id)
    const deleteMessageKey = key(channelKey, "delete_message", message.id)

    socket.on(updateMessageKey, setMessage)
    socket.on(deleteMessageKey, () =>
      setMessage((pv) => ({ ...pv, isDeleted: true, isEdited: false }))
    )

    return () => {
      socket.off(updateMessageKey, setMessage)
      socket.off(deleteMessageKey, setMessage)
    }
  }, [])

  return (
    <div
      className={cn("flex gap-3", {
        "flex-row-reverse": isMe,
      })}
    >
      <div className="sticky top-0 self-start">
        <UserAvatar
          src={message.user.avatar}
          username={message.user.username}
        />
      </div>

      <div className="group flex flex-col gap-1">
        <span className={cn("text-xs font-bold", { "self-end": isMe })}>
          {message.user.username}
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

          {(isMe || channel.member.role != "guest") &&
            !message.isDeleted &&
            !editMode && (
              <>
                <Trash2Icon
                  onClick={() => deleteMsg()}
                  className="hidden size-7 cursor-pointer rounded-full stroke-red-400 p-1.5 hover:bg-red-500 hover:stroke-white group-hover:block"
                />

                {isMe && message.type === "text" && (
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

export default ChannelMessageCard
