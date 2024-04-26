import { RefreshCwIcon } from "lucide-react"

const SpinnerText = ({ text }) => {
  return (
    <div className="flex grow flex-col items-center justify-center">
      <RefreshCwIcon className="text-main size-5 animate-spin" />
      {text && <span className="text-main">{text}...</span>}
    </div>
  )
}

export default SpinnerText
