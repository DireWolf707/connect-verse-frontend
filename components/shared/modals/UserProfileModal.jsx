"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useQueryClient } from "@tanstack/react-query"
import UserAvatar from "../user/UserAvatar"

const UserProfileInput = ({ label, value }) => (
  <div className="flex flex-col gap-2">
    <Label>{label}</Label>
    <Input value={value} className="bg-black/10 dark:bg-white/10" />
  </div>
)

const UserProfileModal = () => {
  const queryClient = useQueryClient()
  const { data: user } = queryClient.getQueryData(["me"])

  return (
    <Dialog>
      <DialogTrigger>
        <UserAvatar user={user} />
      </DialogTrigger>

      <DialogContent className="w-[420px]">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>

          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="flex justify-center">
            <UserAvatar user={user} size="size-36" />
          </div>
          <UserProfileInput label="Email" value={user.email} />
          <UserProfileInput label="Username" value={user.username} />
          <UserProfileInput label="Name" value={user.name} />
        </div>

        <DialogFooter>
          <Button>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default UserProfileModal
