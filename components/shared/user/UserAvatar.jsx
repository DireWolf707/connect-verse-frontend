import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const UserAvatar = ({ src, username, size = "size-10" }) => {
  return (
    <Avatar className={size}>
      <AvatarImage src={src} />
      <AvatarFallback className="bg-black/15 text-xl dark:bg-white/15">
        {username[0].toUpperCase()}
      </AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar
