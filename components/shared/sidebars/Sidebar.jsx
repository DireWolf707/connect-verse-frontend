import Logo from "../navbar/Logo"
import ChannelSidebar from "./ChannelSidebar"
import ServerSidebar from "./ServerSidebar"

const Sidebar = () => (
  <div className="flex w-sidebar flex-col bg-black/10 dark:bg-white/10">
    <Logo />

    <div className="flex grow">
      <ServerSidebar />
      <ChannelSidebar />
    </div>
  </div>
)

export default Sidebar
