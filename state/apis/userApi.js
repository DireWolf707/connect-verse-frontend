import { useQueryClient } from "@tanstack/react-query"
import { useGeneralMutation, useGeneralQuery } from "./generalApi"

export const useUser = () =>
  useGeneralQuery({
    url: "/user/me",
    queryKey: ["me"],
  })

export const useLogoutUser = () => {
  const queryClient = useQueryClient()

  return useGeneralMutation({
    url: "/user/logout",
    loadingMsg: "Logging out",
    successMsg: "Logged out",
    onSuccess: () => queryClient.setQueryData(["me"], null),
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useGeneralMutation({
    url: "/user/profile",
    loadingMsg: "Updating user",
    successMsg: "User updated",
    onSuccess: (data) => queryClient.setQueryData(["me"], data),
  })
}
