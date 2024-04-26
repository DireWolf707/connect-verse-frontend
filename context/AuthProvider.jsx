"use client"
import Circles from "@/components/shared/loading/Circles"
import { useUser } from "@/state/apis/user"
import { useEffect, useState } from "react"
import { toast } from "sonner"

const authToastOptions = { id: "auth-check" }

const AuthProvider = ({ children }) => {
  const [isServerSleeping, setIsServerSleeping] = useState(false)
  const { isLoading, isError, isSuccess } = useUser()

  useEffect(() => {
    let timeout = null

    if (isSuccess && isServerSleeping)
      toast.success("Server is awake!", authToastOptions)
    else if (isError)
      toast.error(
        "Server is sleeping, please try again later...",
        authToastOptions
      )
    else if (isLoading) {
      timeout = setTimeout(() => {
        setIsServerSleeping(true)
        toast.loading(
          "Waking up server 😴!\nNo need to refresh, it usually takes 40s 🔥",
          authToastOptions
        )
      }, 1700)

      return () => clearTimeout(timeout)
    }
  }, [isLoading, isSuccess, isError])

  if (isLoading || isError) return <Circles />

  return children
}

export default AuthProvider
