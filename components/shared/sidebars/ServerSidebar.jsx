"use client"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { useGroups } from "@/state/apis/group"
import { MailIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import LogoutButton from "../buttons/LogoutButton"
import ThemeToggleButton from "../buttons/ThemeToggleButton"
import SpinnerText from "../loading/SpinnerText"
import CreateGroupModal from "../modals/CreateGroupModal"
import UserProfileModal from "../modals/UserProfileModal"

const MessageButton = ({ Icon, text, active, href }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Link href={href}>
          <Icon
            className={cn("size-8 p-1 rounded-lg", {
              "bg-violet-600 text-white": active,
            })}
          />
        </Link>
      </TooltipTrigger>

      <TooltipContent side="right">{text}</TooltipContent>
    </Tooltip>
  </TooltipProvider>
)

const GroupButton = ({ group, active }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Link href={"/group/" + group.id}>
          <Image
            src={group.imageURL}
            alt="image"
            height={48}
            width={48}
            className={cn("size-[48px] p-1 rounded-full", {
              "bg-violet-600 text-white": active,
            })}
          />
        </Link>
      </TooltipTrigger>

      <TooltipContent side="right">{group.name}</TooltipContent>
    </Tooltip>
  </TooltipProvider>
)

const ServerSidebar = () => {
  const pathname = usePathname()
  const { data: groups } = useGroups()

  return (
    <div className="flex flex-col px-1 py-2 pt-1">
      <div className="flex flex-col items-center gap-2">
        <MessageButton
          Icon={MailIcon}
          text="Messages"
          href="/conversation"
          active={pathname.startsWith("/conversation")}
        />
        <CreateGroupModal />
        <Separator className="mb-2 h-[2px] bg-black dark:bg-white" />
      </div>

      <div className="flex grow flex-col overflow-auto">
        {groups ? (
          groups.map((group) => (
            <GroupButton
              key={group.id}
              group={group}
              active={pathname.startsWith("/group/" + group.id)}
            />
          ))
        ) : (
          <SpinnerText />
        )}
      </div>

      <div className="flex flex-col items-center gap-3">
        <Separator className="mt-2 h-[2px] bg-black dark:bg-white" />
        <ThemeToggleButton />
        <UserProfileModal />
        <LogoutButton />
      </div>
    </div>
  )
}

export default ServerSidebar
