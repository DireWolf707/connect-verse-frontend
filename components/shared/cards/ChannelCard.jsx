import Link from "next/link"
import DeleteChannelModal from "../modals/DeleteChannelModal"
import UpdateChannelModal from "../modals/UpdateChannelModal"

const ChannelCard = ({ groupId, channel }) => {
  return (
    <div className="group flex items-center justify-between">
      <Link href={"/group/" + groupId + "/channel/" + channel.id}>
        # {channel.name}
      </Link>

      <div className="hidden gap-1 group-hover:flex">
        <UpdateChannelModal groupId={groupId} channel={channel} />
        <DeleteChannelModal groupId={groupId} channel={channel} />
      </div>
    </div>
  )
}

export default ChannelCard
