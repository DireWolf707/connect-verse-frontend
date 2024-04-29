import { useUI } from "@/state/store"
import { HashIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import UserCard from "../cards/UserCard"

const Header = () => {
  const pathname = usePathname()
  const otherUser = useUI((state) => state.otherUser)
  const channelName = useUI((state) => state.channelName)

  if (pathname.startsWith("/conversation") && otherUser)
    return <UserCard user={otherUser} showJoined={false} showBlock={true} />

  if (pathname.startsWith("/group") && channelName)
    return (
      <div className="ml-2 flex w-full items-center gap-1">
        <HashIcon />
        <span className="text-xl font-medium">{channelName}</span>
      </div>
    )
}

export default Header
