import { Separator } from "@/components/ui/separator"
import { key } from "@/lib/utils"
import { useGroup } from "@/state/apis/group"
import { useSocket } from "@/state/store"
import { useQueryClient } from "@tanstack/react-query"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import ChannelCard from "../cards/ChannelCard"
import SpinnerText from "../loading/SpinnerText"
import CreateChannelModal from "../modals/CreateChannelModal"
import DeleteGroupModal from "../modals/DeleteGroupModal"
import ShareGroupModal from "../modals/ShareGroupModal"
import UpdateGroupModal from "../modals/UpdateGroupModal"
import UpdateMemberModal from "../modals/UpdateMemberModal"
import MemberRole from "../user/MemberRole"

const RenderChannels = ({ group, channels, type }) => (
  <div className="flex flex-col gap-1">
    <div className="flex items-center justify-between">
      <span className="text-sm font-bold">{type.toUpperCase()} CHANNELS</span>

      {group.member.role === "admin" && (
        <CreateChannelModal groupId={group.id} type={type} />
      )}
    </div>

    <div className="text-main flex flex-col gap-0.5 pl-4 text-sm">
      {channels.map((channel) => (
        <ChannelCard key={channel.id} group={group} channel={channel} />
      ))}
    </div>
  </div>
)

const ChannelSidebar = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [group, setGroup] = useState(null)
  const [member, setMember] = useState(null)
  const socket = useSocket((state) => state.socket)
  const { groupId } = useParams()
  const { data: _group } = useGroup(groupId)

  useEffect(() => {
    if (!_group) return

    const groupKey = key("group", groupId)
    const newChannelKey = key(groupKey, "new_channel")
    const updateGroupKey = key(groupKey, "group_update")
    const deleteGroupKey = key(groupKey, "group_delete")
    const groupSelfMemberUpdateKey = key(
      "group",
      groupId,
      "self_member_update",
      _group.member.userId
    )

    const onNewChannel = (newChannel) => {
      switch (newChannel.type) {
        case "text":
          return setGroup((pv) => ({
            ...pv,
            textChannels: [...pv.textChannels, newChannel],
          }))
        case "audio":
          return setGroup((pv) => ({
            ...pv,
            audioChannels: [...pv.audioChannels, newChannel],
          }))
        case "video":
          return setGroup((pv) => ({
            ...pv,
            videoChannels: [...pv.videoChannels, newChannel],
          }))
      }
    }

    const onUpdateGroup = (updatedGroup) =>
      setGroup((pv) => ({ ...pv, ...updatedGroup }))

    const onDeleteGroup = () => router.replace("/")

    const onSelfMemberUpdate = (updatedMember) => {
      if (updatedMember.isBanned) window.location.replace("/")
      else setMember(updatedMember)
    }

    setGroup(_group)
    setMember(_group.member)

    socket.on(newChannelKey, onNewChannel)
    socket.on(updateGroupKey, onUpdateGroup)
    socket.on(deleteGroupKey, onDeleteGroup)
    socket.on(groupSelfMemberUpdateKey, onSelfMemberUpdate)

    return () => {
      queryClient.removeQueries({ queryKey: ["group", groupId] })
      socket.off(newChannelKey, onNewChannel)
      socket.off(updateGroupKey, onUpdateGroup)
      socket.off(deleteGroupKey, onDeleteGroup)
      socket.off(groupSelfMemberUpdateKey, onSelfMemberUpdate)
      socket.emit("unsub_group", groupId)
      socket.emit("unsub_self_member_update", groupId, _group.member.id)
    }
  }, [_group])

  return (
    <div className="flex grow flex-col rounded-tl-xl bg-[#dfe7e8] dark:bg-[#403544]">
      {group ? (
        <div className="flex flex-col gap-3 p-4">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center">
              <Image
                src={group.imageURL}
                alt="image"
                height={120}
                width={120}
                className="size-[120px] rounded-full p-1"
              />

              <span className="text-main text-2xl">{group.name}</span>

              <MemberRole role={member.role} />
            </div>

            <div className="flex gap-4">
              <ShareGroupModal group={group} />
              {group.member.role === "admin" && (
                <>
                  <UpdateMemberModal group={group} />
                  <UpdateGroupModal group={group} />
                </>
              )}
              <DeleteGroupModal group={group} />
            </div>
          </div>

          <Separator className="bg-black dark:bg-white" />

          <RenderChannels
            group={group}
            channels={group.textChannels}
            type="text"
          />

          <RenderChannels
            group={group}
            channels={group.audioChannels}
            type="audio"
          />

          <RenderChannels
            group={group}
            channels={group.videoChannels}
            type="video"
          />
        </div>
      ) : (
        <SpinnerText text="Loading group" />
      )}
    </div>
  )
}

export default ChannelSidebar
