import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useDeleteChannel } from "@/state/apis/group"
import { Trash2Icon } from "lucide-react"
import { useState } from "react"

const DeleteChannelModal = ({ groupId, channel }) => {
  const [open, setOpen] = useState(false)
  const { handler: deleteChannel, isPending: isDeleteChannelPending } =
    useDeleteChannel(groupId, channel.id)

  const deleteChannelHandler = () => deleteChannel().then(() => setOpen(false))

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Trash2Icon className="size-4 fill-red-500 stroke-red-300" />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="capitalize">
            Delete {channel.type} Channel
          </DialogTitle>

          <DialogDescription className="flex gap-1">
            Are you absolutely sure you want to delete channel:
            <span className="font-bold text-white">{channel.name}</span>?
          </DialogDescription>
        </DialogHeader>

        <Button
          variant="destructive"
          onClick={deleteChannelHandler}
          disabled={isDeleteChannelPending}
        >
          Confirm
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteChannelModal
