"use client"
import Logo from "@/components/shared/navbar/Logo"
import ChannelSidebar from "@/components/shared/sidebars/ChannelSidebar"
import ServerSidebar from "@/components/shared/sidebars/ServerSidebar"
import ProtectedRoute from "@/components/wrapper/ProtectedRoute"
import SocketProvider from "@/context/SocketProvider"

const Layout = ({ children }) => {
  return (
    <ProtectedRoute>
      <SocketProvider>
        <div className="flex">
          <div className="flex flex-col">
            <Logo />

            <div className="flex grow">
              <ServerSidebar />
              <ChannelSidebar />
            </div>
          </div>

          <div className="grow p-4">{children}</div>
        </div>
      </SocketProvider>
    </ProtectedRoute>
  )
}

export default Layout
