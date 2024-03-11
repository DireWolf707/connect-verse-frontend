import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import emojiData from "@emoji-mart/data"
import EmojiPicker from "@emoji-mart/react"
import { SmileIcon } from "lucide-react"
import { useTheme } from "next-themes"

const EmojiPickerButton = ({ setMessage }) => {
  const { theme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SmileIcon className="cursor-pointer stroke-slate-500" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="border-none p-0">
        <EmojiPicker
          data={emojiData}
          maxFrequentRows={0}
          previewPosition="none"
          theme={theme}
          onEmojiSelect={(e) =>
            setMessage(
              (msg) => msg + String.fromCodePoint(parseInt(e.unified, 16))
            )
          }
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default EmojiPickerButton
