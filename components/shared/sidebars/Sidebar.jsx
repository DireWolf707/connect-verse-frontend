import { cn } from "@/lib/utils"
import { useUI } from "@/state/store"
import { usePathname } from "next/navigation"
import { useMediaQuery } from "react-responsive"
import Logo from "../navbar/Logo"
import ChannelSidebar from "./ChannelSidebar"
import ConversationSidebar from "./ConversationSidebar"
import ServerSidebar from "./ServerSidebar"

const Sidebar = () => {
  const pathname = usePathname()
  const sidebarOpen = useUI((state) => state.sidebarOpen)
  const isMobile = useMediaQuery({
    maxWidth: "640px",
  })

  return (
    <div
      className={cn(
        "translate-x-[-100%] fixed inset-0 z-10 flex w-screen flex-col bg-[#e6f5f6] dark:bg-[#260732] sm:static sm:w-sidebar sm:translate-x-0 duration-300 sm:duration-0 shrink-0",
        { "translate-x-0": isMobile && sidebarOpen }
      )}
    >
      <Logo />

      <div className="flex grow overflow-auto">
        <ServerSidebar />
        {pathname.startsWith("/conversation") && <ConversationSidebar />}
        {pathname.startsWith("/group") && <ChannelSidebar />}
      </div>
    </div>
  )
}

export default Sidebar
