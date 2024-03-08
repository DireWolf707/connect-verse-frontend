import { usePathname } from "next/navigation"
import Logo from "../navbar/Logo"
import ChannelSidebar from "./ChannelSidebar"
import ConversationSidebar from "./ConversationSidebar"
import ServerSidebar from "./ServerSidebar"

const Sidebar = () => {
  const pathname = usePathname()

  return (
    <div className="flex w-sidebar flex-col bg-black/10 dark:bg-white/10">
      <Logo />

      <div className="flex grow">
        <ServerSidebar />
        {pathname.startsWith("/conversation") && <ConversationSidebar />}
        {pathname.startsWith("/server") && <ChannelSidebar />}
      </div>
    </div>
  )
}

export default Sidebar
