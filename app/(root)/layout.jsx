"use client"
import LeftSidebar from "@/components/shared/LeftSidebar"
import ProtectedRoute from "@/components/wrapper/ProtectedRoute"
import SocketProvider from "@/context/SocketProvider"

const Layout = ({ children }) => {
  return (
    <ProtectedRoute>
      <SocketProvider>
        <div className="flex grow overflow-auto">
          <LeftSidebar />

          <div className="grow p-4">{children}</div>
        </div>
      </SocketProvider>
    </ProtectedRoute>
  )
}

export default Layout
