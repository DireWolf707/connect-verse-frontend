import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useMembers } from "@/state/apis/group"
import { useQueryClient } from "@tanstack/react-query"
import { UsersIcon } from "lucide-react"
import { useEffect, useState } from "react"
import MemberCard from "../cards/MemberCard"
import SpinnerText from "../loading/SpinnerText"

const UpdateMemberModal = ({ group }) => {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const { data: members } = useMembers(group.id, { enabled: open })

  useEffect(() => {
    if (!open)
      queryClient.removeQueries({
        queryKey: ["members", group.id],
      })
  }, [open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <UsersIcon className="text-green-400" />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Member</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col">
          {members ? (
            members.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))
          ) : (
            <SpinnerText text="Loading members" />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateMemberModal
