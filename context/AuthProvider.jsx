"use client"
import Circles from "@/components/shared/loading/Circles"
import { Q } from "@/lib/axios_client"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { toast } from "sonner"

const authToastOptions = { id: "auth-check" }

const AuthProvider = ({ children }) => {
  const [isServerSleeping, setIsServerSleeping] = useState(false)
  const { isLoading, isError, isSuccess } = useQuery({
    queryKey: ["me"],
    queryFn: () => Q.get("/user/me").then((res) => res.data),
  })

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isSuccess, isError])

  if (isLoading || isError) return <Circles />

  return children
}

export default AuthProvider
