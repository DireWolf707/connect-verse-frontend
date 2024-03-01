import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const UserAvatar = ({ user }) => {
  return (
    <Avatar className="cursor-pointer">
      <AvatarImage src={user.avatar} />
      <AvatarFallback className="bg-black/15 dark:bg-white/15">
        {user.username[0].toUpperCase()}
      </AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar
