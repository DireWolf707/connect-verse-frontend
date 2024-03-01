"use client"
import LeftSidebar from "@/components/shared/LeftSidebar"
import ProtectedRoute from "@/components/wrapper/ProtectedRoute"
import SocketProvider from "@/context/SocketProvider"

const Layout = ({ children }) => {
  return (
    <ProtectedRoute>
      <SocketProvider>
        <LeftSidebar />

        <div className="grow p-4">{children}</div>
      </SocketProvider>
    </ProtectedRoute>
  )
}

export default Layout
