import { cn, key } from "@/lib/utils"
import { useSocket } from "@/state/store"
import Link from "next/link"
import { useEffect, useState } from "react"
import DeleteChannelModal from "../modals/DeleteChannelModal"
import UpdateChannelModal from "../modals/UpdateChannelModal"

const ChannelCard = ({ group, channel: _channel }) => {
  const socket = useSocket((state) => state.socket)
  const [channel, setChannel] = useState(_channel)
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    const groupKey = key("group", group.id)
    const updateChannelKey = key(groupKey, "channel_update", channel.id)
    const deleteChannelKey = key(groupKey, "channel_delete", channel.id)

    const onUpdateChannel = (updatedChannel) => setChannel(updatedChannel)

    const onDeleteChannel = () => setIsHidden(true)

    socket.on(updateChannelKey, onUpdateChannel)
    socket.on(deleteChannelKey, onDeleteChannel)

    return () => {
      socket.off(updateChannelKey, onUpdateChannel)
      socket.off(deleteChannelKey, onDeleteChannel)
    }
  }, [])

  return (
    <div
      className={cn("group flex items-center justify-between", {
        hidden: isHidden,
      })}
    >
      <Link
        href={
          "/group/" + group.id + "/channel/" + channel.id + "/" + channel.type
        }
      >
        # {channel.name}
      </Link>

      {group.member.role === "admin" && (
        <div className="hidden gap-1 group-hover:flex">
          <UpdateChannelModal groupId={group.id} channel={channel} />
          <DeleteChannelModal groupId={group.id} channel={channel} />
        </div>
      )}
    </div>
  )
}

export default ChannelCard
