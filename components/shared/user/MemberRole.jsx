import { ShieldHalfIcon, ShieldIcon, ShieldPlusIcon } from "lucide-react"

const MemberRole = ({ role }) => {
  let MemberIcon = ShieldIcon
  if (role === "mod") MemberIcon = ShieldPlusIcon
  if (role === "admin") MemberIcon = ShieldHalfIcon

  return (
    <div className="flex items-center gap-1 text-sm font-bold capitalize text-indigo-300">
      <MemberIcon className="size-4" />
      {role}
    </div>
  )
}

export default MemberRole
