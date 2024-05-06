import { FileIcon, ImageIcon } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

const RenderMessage = ({ message }) => {
  const [loading, setLoading] = useState(true)

  if (message.isDeleted)
    return <span className="text-main italic">Message Deleted</span>

  if (message.type === "image")
    return (
      <a
        href={message.media_url}
        target="_blank"
        className="relative block h-[150px] w-[220px] md:h-[240px] md:w-[320px]"
      >
        {loading && <ImageIcon className="absolute size-full stroke-1" />}

        <Image
          src={message.media_url}
          alt="media"
          height={200}
          width={320}
          className="size-full object-cover"
          onLoad={() => setLoading(false)}
        />
      </a>
    )

  if (message.type === "video")
    return (
      <video
        src={message.media_url}
        alt="media"
        className="h-[150px] w-[220px] object-cover md:h-[240px] md:w-[320px]"
        controls
      />
    )

  if (message.type === "file")
    return (
      <a href={message.media_url} target="_blank" download>
        <FileIcon className="size-[80px] fill-white stroke-black md:size-[140px]" />

        <span className="text-main flex justify-center">
          {message.media_url.split(".").pop().toUpperCase()}
        </span>
      </a>
    )

  return (
    <p className="text-main max-w-[220px] break-all text-[12px] leading-5 md:max-w-[340px] md:text-[14px] lg:max-w-[540px]">
      {message.content}
    </p>
  )
}

export default RenderMessage
