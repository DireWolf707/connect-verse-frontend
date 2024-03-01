import { Button } from "@/components/ui/button"
import { Q } from "@/lib/axios_client"
import { requestHandler } from "@/lib/request_handler"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { LogOutIcon } from "lucide-react"

const LogoutButton = () => {
  const queryClient = useQueryClient()
  const { mutateAsync: logout, isPending } = useMutation({
    mutationFn: () => Q.post("/user/logout"),
  })

  const logoutHandler = () =>
    requestHandler({
      reqPromise: logout,
      loadingMsg: "Logging out",
      successMsg: "Logged out",
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["me"] }),
    })

  return (
    <Button
      size="icon"
      disabled={isPending}
      onClick={logoutHandler}
      className="rounded-full"
    >
      <LogOutIcon className="p-[2px]" />
    </Button>
  )
}

export default LogoutButton
