import { Button } from "@/components/ui/button"
import { useLogoutUser } from "@/state/apis/user"
import { LogOutIcon } from "lucide-react"

const LogoutButton = () => {
  const { handler: logout, isPending } = useLogoutUser()

  return (
    <Button
      size="icon"
      disabled={isPending}
      onClick={() => logout()}
      className="rounded-full"
    >
      <LogOutIcon className="p-[2px]" />
    </Button>
  )
}

export default LogoutButton
