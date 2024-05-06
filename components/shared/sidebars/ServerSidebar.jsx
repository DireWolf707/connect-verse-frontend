"use client"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn, key } from "@/lib/utils"
import { useGroups } from "@/state/apis/group"
import { useUser } from "@/state/apis/user"
import { useSocket } from "@/state/store"
import { MailIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
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

const GroupButton = ({ group: _group, active }) => {
  const socket = useSocket((state) => state.socket)
  const [group, setGroup] = useState(_group)
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    const memberGroupUpdateKey = key("member_group_update", group.id)
    const memberGroupDeleteKey = key("member_group_delete", group.id)

    const onGroupUpdate = (updatedGroup) => setGroup(updatedGroup)

    const onGroupDelete = () => setIsHidden(true)

    socket.on(memberGroupUpdateKey, onGroupUpdate)
    socket.on(memberGroupDeleteKey, onGroupDelete)

    return () => {
      socket.off(memberGroupUpdateKey, onGroupUpdate)
      socket.off(memberGroupDeleteKey, onGroupDelete)
    }
  }, [])

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={"/group/" + group.id}
            className={cn({ hidden: isHidden })}
          >
            <Image
              src={group.imageURL}
              alt="image"
              height={48}
              width={48}
              className={cn("size-[48px] p-1 rounded-full", {
                "bg-violet-600": active,
              })}
            />
          </Link>
        </TooltipTrigger>

        <TooltipContent side="right">{group.name}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

const ServerSidebar = () => {
  const pathname = usePathname()
  const socket = useSocket((state) => state.socket)
  const { data: groups } = useGroups()
  const { data: me } = useUser()

  useEffect(() => {
    return () => socket.emit("unsub_member_group", me.id)
  }, [])

  return (
    <div className="flex shrink-0 flex-col px-1 py-2 pt-1">
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
