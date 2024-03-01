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

const UserProfileInput = () => (
  <div className="grid grid-cols-4 items-center gap-4">
    <Label className="text-right">Username</Label>
    <Input id="username" defaultValue="@peduarte" className="col-span-3" />
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

        <div className="flex flex-col gap-3">
          <UserProfileInput />
          <UserProfileInput />
          <UserProfileInput />
        </div>

        <DialogFooter>
          <Button>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default UserProfileModal
