import { SearchIcon } from "lucide-react"
import { Input } from "../../ui/input"

const GlobalSearch = () => {
  return (
    <div className="flex max-w-2xl flex-1 items-center justify-center gap-2 overflow-hidden rounded-full border-2 border-red-500 bg-red-500 pl-2.5">
      <SearchIcon className="cursor-pointer stroke-white" />
      <Input type="text" placeholder="Search..." className="rounded-none" />
    </div>
  )
}

export default GlobalSearch
