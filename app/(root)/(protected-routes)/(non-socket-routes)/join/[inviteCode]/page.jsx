"use client"
import SpinnerText from "@/components/shared/loading/SpinnerText"
import { Button } from "@/components/ui/button"
import { useGroupInfo, useJoinGroup } from "@/state/apis/group"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"

const GroupInfo = () => {
  const { inviteCode } = useParams()
  const router = useRouter()
  const { data: group } = useGroupInfo(inviteCode)
  const { mutateAsync: joinGroup, isPending: isJoinGroupPending } =
    useJoinGroup(inviteCode)

  const joinGroupHandler = () =>
    joinGroup().then(() => router.replace("/group/" + group.id))

  return (
    <div className="flex size-full items-center justify-center">
      {group ? (
        <div className="flex flex-col gap-4 rounded-xl border-4 bg-white/10 p-12 shadow-2xl shadow-slate-600">
          <div className="flex flex-col items-center gap-1">
            <Image
              src={group.imageURL}
              alt="image"
              height={200}
              width={200}
              className="size-[200px] rounded-full"
            />
            {group.name}
          </div>

          <Button onClick={joinGroupHandler} disabled={isJoinGroupPending}>
            Join Group
          </Button>
        </div>
      ) : (
        <SpinnerText text="Loading group info" />
      )}
    </div>
  )
}

export default GroupInfo
