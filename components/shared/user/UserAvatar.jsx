import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const UserAvatar = ({ user, size = "size-10" }) => {
  return (
    <Avatar className={cn("cursor-pointer", size)}>
      <AvatarImage src={user.avatar} />
      <AvatarFallback className="bg-black/15 text-xl dark:bg-white/15">
        {user.username[0].toUpperCase()}
      </AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar
