import { Input } from "@/components/ui/input"
import { useState } from "react"
import EmojiPickerButton from "../buttons/EmojiPickerButton"
import FileUploadModal from "../modals/FileUploadModal"

const ConversationInput = () => {
  const [message, setMessage] = useState("")

  return (
    <div className="mx-4 my-3 flex items-center rounded-lg bg-black/10 px-3 dark:bg-white/20">
      <FileUploadModal />
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type Message"
        className="text-main border-none bg-transparent"
      />
      <EmojiPickerButton setMessage={setMessage} />
    </div>
  )
}

export default ConversationInput
