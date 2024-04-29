"use client"
import ProtectedRoute from "@/components/wrapper/ProtectedRoute"

const Layout = ({ children }) => {
  return <ProtectedRoute>{children}</ProtectedRoute>
}

export default Layout
