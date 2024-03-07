import { RefreshCwIcon } from "lucide-react"

const SpinnerText = ({ text }) => {
  return (
    <div className="flex grow flex-col items-center justify-center">
      <RefreshCwIcon className="animate-spin" />
      <span>{text}...</span>
    </div>
  )
}

export default SpinnerText
