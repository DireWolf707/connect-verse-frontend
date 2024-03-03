"use client"
import UserLogin from "@/components/shared/user/UserLogin"
import { useUser } from "@/state/apis/userApi"

const ProtectedRoute = ({ children }) => {
  const { data: user } = useUser()

  if (!user) return <UserLogin />
  return children
}

export default ProtectedRoute
