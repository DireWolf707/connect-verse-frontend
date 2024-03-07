"use client"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { MailIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import LogoutButton from "../buttons/LogoutButton"
import ThemeToggleButton from "../buttons/ThemeToggleButton"
import UserProfileModal from "../modals/UserProfileModal"

const ServerIcon = ({ text, Icon, active }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Icon
          className={cn("size-8 p-1 rounded-lg", {
            "bg-violet-600 text-white": active,
          })}
        />
      </TooltipTrigger>
      <TooltipContent side="right">{text}</TooltipContent>
    </Tooltip>
  </TooltipProvider>
)

const ServerSidebar = () => {
  const pathname = usePathname()

  return (
    <div className="flex flex-col items-center justify-between px-1 py-2 pt-1">
      <div className="flex flex-col gap-2 overflow-auto">
        <ServerIcon
          text="Messages"
          Icon={MailIcon}
          active={pathname.startsWith("/conversation")}
        />
      </div>

      <div className="flex flex-col gap-3">
        <Separator className="mt-2 h-[2px] bg-black dark:bg-white" />
        <ThemeToggleButton />
        <UserProfileModal />
        <LogoutButton />
      </div>
    </div>
  )
}

export default ServerSidebar
