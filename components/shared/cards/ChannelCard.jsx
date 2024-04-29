import Link from "next/link"
import DeleteChannelModal from "../modals/DeleteChannelModal"
import UpdateChannelModal from "../modals/UpdateChannelModal"

const ChannelCard = ({ group, channel }) => {
  return (
    <div className="group flex items-center justify-between">
      <Link href={"/group/" + group.id + "/channel/" + channel.id}>
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
