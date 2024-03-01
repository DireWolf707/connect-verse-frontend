"use client"
import UserLogin from "@/components/shared/user/UserLogin"
import { useQueryClient } from "@tanstack/react-query"

const ProtectedRoute = ({ children }) => {
  const queryClient = useQueryClient()
  const { data: user } = queryClient.getQueryData(["me"])

  if (!user) return <UserLogin />
  return children
}

export default ProtectedRoute
