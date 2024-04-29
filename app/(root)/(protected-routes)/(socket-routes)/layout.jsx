"use client"
import Navbar from "@/components/shared/navbar/Navbar"
import Sidebar from "@/components/shared/sidebars/Sidebar"
import SocketProvider from "@/context/SocketProvider"

const Layout = ({ children }) => {
  return (
    <SocketProvider>
      <Sidebar />

      <div className="flex grow flex-col">
        <Navbar />
        {children}
      </div>
    </SocketProvider>
  )
}

export default Layout
