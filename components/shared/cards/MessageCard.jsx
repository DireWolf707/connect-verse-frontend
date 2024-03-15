import { formatDateWithTime } from "@/lib/utils"
import UserAvatar from "../user/UserAvatar"

const RenderMessage = ({ message }) => (
  <p className="text-main break-all">{message.content}</p>
)

const RenderMedia = ({ message }) => "MEDIA"

const MessageCard = ({ user, message }) => {
  return (
    <div className="flex gap-3">
      <UserAvatar src={user.avatar} username={user.username} />

      <div className="flex grow flex-col">
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-bold">{user.username}</span>

          <span className="text-main">
            {formatDateWithTime(message.createdAt)}
          </span>
        </div>

        {message.type === "text" ? (
          <RenderMessage message={message} />
        ) : (
          <RenderMedia message={message} />
        )}
      </div>
    </div>
  )
}

export default MessageCard
