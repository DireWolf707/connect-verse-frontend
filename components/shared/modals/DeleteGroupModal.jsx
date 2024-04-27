import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useDeleteGroup } from "@/state/apis/group"
import { DoorOpenIcon, Trash2Icon } from "lucide-react"
import { useState } from "react"

const DeleteGroupModal = ({ group }) => {
  const [open, setOpen] = useState(false)
  const [isAdmin] = useState(group.member.role === "admin")
  const { handler: deleteGroup } = useDeleteGroup(group.id, { isAdmin })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {isAdmin ? (
          <Trash2Icon className="text-red-400" />
        ) : (
          <DoorOpenIcon className="text-red-400" />
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isAdmin ? <span>Delete Group</span> : <span>Leave Group</span>}
          </DialogTitle>
          <DialogDescription>Are you absolutely sure?</DialogDescription>
        </DialogHeader>

        <Button variant="destructive" onClick={() => deleteGroup()}>
          Confirm
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteGroupModal
