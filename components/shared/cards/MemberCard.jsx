import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useUpdateMember } from "@/state/apis/group"
import { BanIcon, CheckCircle2Icon, CircleEllipsisIcon } from "lucide-react"
import { useState } from "react"
import UserCard from "../cards/UserCard"
import MemberRole from "../user/MemberRole"

const MemberCard = ({ member: _member }) => {
  const [member, setMember] = useState(_member)
  const { handler: updateMember, isPending: isUpdateUserPending } =
    useUpdateMember(member.groupId, member.id)

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
              <CircleEllipsisIcon className="text-main" />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="flex flex-col gap-1">
              {member.role === "guest" ? (
                <Button
                  variant="secondary"
                  onClick={() => updateMemberHandler({ role: "mod" })}
                  disabled={isUpdateUserPending}
                >
                  <MemberRole role="mod" />
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  onClick={() => updateMemberHandler({ role: "guest" })}
                  disabled={isUpdateUserPending}
                >
                  <MemberRole role="guest" />
                </Button>
              )}

              {member.isBanned ? (
                <Button
                  onClick={() => updateMemberHandler({ isBanned: false })}
                  disabled={isUpdateUserPending}
                >
                  <CheckCircle2Icon className="mr-1 size-4" />
                  Un-Ban
                </Button>
              ) : (
                <Button
                  variant="destructive"
                  onClick={() => updateMemberHandler({ isBanned: true })}
                  disabled={isUpdateUserPending}
                >
                  <BanIcon className="mr-1 size-4" />
                  Ban
                </Button>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  )
}

export default MemberCard
