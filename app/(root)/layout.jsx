"use client"
import Navbar from "@/components/shared/navbar/Navbar"
import Sidebar from "@/components/shared/sidebars/Sidebar"
import ProtectedRoute from "@/components/wrapper/ProtectedRoute"
import SocketProvider from "@/context/SocketProvider"

const Layout = ({ children }) => {
  return (
    <ProtectedRoute>
      <SocketProvider>
        <div className="hidden sm:flex">
          <Sidebar />
        </div>

        <div className="flex grow flex-col">
          <Navbar />
          {children}
        </div>
      </SocketProvider>
    </ProtectedRoute>
  )
}

export default Layout
