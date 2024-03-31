"use client"
import Navbar from "@/components/shared/navbar/Navbar"
import Sidebar from "@/components/shared/sidebars/Sidebar"
import ProtectedRoute from "@/components/wrapper/ProtectedRoute"
import SocketProvider from "@/context/SocketProvider"

const Layout = ({ children }) => {
  return (
    <ProtectedRoute>
      <SocketProvider>
        <Sidebar />

        <div className="flex grow flex-col">
          <Navbar />
          {children}
        </div>
      </SocketProvider>
    </ProtectedRoute>
  )
}

export default Layout
