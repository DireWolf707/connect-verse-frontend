import { RefreshCwIcon } from "lucide-react"

const SpinnerText = ({ text }) => {
  return (
    <div className="flex grow flex-col items-center justify-center">
      <RefreshCwIcon className="text-main animate-spin" />
      <span className="text-main">{text}...</span>
    </div>
  )
}

export default SpinnerText
