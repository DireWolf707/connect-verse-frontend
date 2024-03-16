import { cn, formatDateWithTime } from "@/lib/utils"
import { useUser } from "@/state/apis/userApi"
import UserAvatar from "../user/UserAvatar"

const RenderMessage = ({ message }) => (
  <p className="text-main break-all text-[14px]">{message.content}</p>
)

const RenderMedia = ({ message }) => "MEDIA"

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
            "max-w-[300px] flex-col rounded-lg bg-black/10 p-2 dark:bg-white/10 self-start",
            {
              "self-end": isMe,
            }
          )}
        >
          {message.type === "text" ? (
            <RenderMessage message={message} />
          ) : (
            <RenderMedia message={message} />
          )}
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
