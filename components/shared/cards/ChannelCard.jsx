import { Pencil, TrashIcon } from "lucide-react"
import Link from "next/link"

const ChannelCard = ({ groupId, channel }) => {
  return (
    <div className="group flex items-center justify-between">
      <Link href={"/group/" + groupId + "/channel/" + channel.id}>
        # {channel.name}
      </Link>

      <div className="flex gap-1">
        <Pencil className="hidden size-4 cursor-pointer group-hover:block" />
        <TrashIcon className="hidden size-4 cursor-pointer group-hover:block" />
      </div>
    </div>
  )
}

export default ChannelCard
