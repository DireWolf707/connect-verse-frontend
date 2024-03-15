import { formatDate } from "@/lib/utils"
import { useUser } from "@/state/apis/userApi"
import UserAvatar from "../user/UserAvatar"

const RenderMessage = ({ message, name }) => {
  const { data: user } = useUser()

  return (
    <div className="flex gap-1.5">
      {user.id === message.userId ? (
        <span className="text-main">Me:</span>
      ) : (
        <span className="text-main">{name}:</span>
      )}

      <p className="text-main break-all">{message.content}</p>
    </div>
  )
}

const RenderMedia = ({ message }) => "MEDIA"

const ConversationCard = ({ user, message }) => (
  <div className="flex gap-3">
    <UserAvatar src={user.avatar} username={user.username} />

    <div className="flex grow flex-col">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-bold">{user.username}</span>
      </div>

      {message.type === "text" ? (
        <RenderMessage message={message} name={user.name} />
      ) : (
        <RenderMedia message={message} />
      )}

      <span className="self-end text-[9.5px] font-[16px]">
        {formatDate(message.createdAt)}
      </span>
    </div>
  </div>
)

export default ConversationCard
