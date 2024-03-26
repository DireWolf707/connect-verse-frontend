import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCreateMessage } from "@/state/apis/conversationApi"
import { SendHorizonalIcon } from "lucide-react"
import { useState } from "react"
import EmojiPickerButton from "../buttons/EmojiPickerButton"
import AttachmentUploadModal from "../modals/AttachmentUploadModal"

const ConversationInput = ({ otherUserId }) => {
  const [message, setMessage] = useState("")

  const { mutateAsync: createMessage } = useCreateMessage({ otherUserId })

  const handleSendMessage = (e) => {
    e.preventDefault()
    createMessage({ content: message })
    setMessage("")
  }

  return (
    <form
      onSubmit={handleSendMessage}
      className="mx-4 mb-3 mt-1.5 flex items-center gap-2 rounded-lg bg-black/10 px-3 dark:bg-white/20"
    >
      <div className="flex grow items-center">
        <AttachmentUploadModal otherUserId={otherUserId} />
        <Input
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type Message"
          className="text-main border-none bg-transparent"
        />
        <EmojiPickerButton setMessage={setMessage} />
      </div>
      <Button type="submit" variant="ghost" size="link">
        <SendHorizonalIcon
          type="submit"
          className="size-8 cursor-pointer stroke-slate-500 p-1"
        />
      </Button>
    </form>
  )
}

export default ConversationInput
