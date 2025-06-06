import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useResetLink } from "@/state/apis/group"
import { CopyIcon, Share2Icon } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

const getInviteLink = (inviteCode) =>
  window.location.origin + "/join/" + inviteCode

const ShareGroupModal = ({ group }) => {
  const [open, setOpen] = useState(false)
  const [inviteLink, setInviteLink] = useState(null)

  const { handler: resetLink, isPending: isResetLinkPending } = useResetLink(
    group.id
  )

  const copyLinkHandler = async () => {
    await navigator.clipboard.writeText(inviteLink)
    toast.success("Copied link to clipboard successfully!")
  }

  useEffect(() => {
    setInviteLink(getInviteLink(group.inviteCode))
  }, [group])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Share2Icon className="text-indigo-400" />
      </DialogTrigger>

      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Share Invite Link</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Input value={inviteLink} disabled={true} />

            <Button variant="ghost" size="icon" onClick={copyLinkHandler}>
              <CopyIcon />
            </Button>
          </div>

          {group.member.role === "admin" && (
            <Button
              variant="destructive"
              className="self-end"
              onClick={() => resetLink()}
              disabled={isResetLinkPending}
            >
              Reset Link
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ShareGroupModal
