import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useUpdateMember } from "@/state/apis/group"
import { BanIcon, CheckCircle2Icon, CircleEllipsisIcon } from "lucide-react"
import { useState } from "react"
import UserCard from "../cards/UserCard"
import MemberRole from "../user/MemberRole"

const MemberCard = ({ member: _member }) => {
  const [member, setMember] = useState(_member)
  const { handler: updateMember } = useUpdateMember(member.groupId, member.id)

  const updateMemberHandler = async (data) => {
    const updatedMember = await updateMember(data)
    setMember((pv) => ({ ...pv, ...updatedMember }))
  }

  return (
    <div className="flex items-center">
      <UserCard user={member} showJoined={false} />

      <div className="flex items-center gap-2">
        <MemberRole role={member.role} />

        {member.role !== "admin" && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <CircleEllipsisIcon />
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              {member.role === "guest" ? (
                <DropdownMenuItem
                  onClick={() => updateMemberHandler({ role: "mod" })}
                >
                  <MemberRole role="mod" />
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  onClick={() => updateMemberHandler({ role: "guest" })}
                >
                  <MemberRole role="guest" />
                </DropdownMenuItem>
              )}

              {member.isBanned ? (
                <DropdownMenuItem
                  className="gap-1 text-green-500"
                  onClick={() => updateMemberHandler({ isBanned: false })}
                >
                  <CheckCircle2Icon className="size-4" />
                  Un-Ban
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  className="gap-1 text-red-500"
                  onClick={() => updateMemberHandler({ isBanned: true })}
                >
                  <BanIcon className="size-4" />
                  Ban
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  )
}

export default MemberCard
