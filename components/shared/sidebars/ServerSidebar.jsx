"use client"
import { Separator } from "@/components/ui/separator"
import LogoutButton from "../buttons/LogoutButton"
import ThemeToggleButton from "../buttons/ThemeToggleButton"
import UserProfileModal from "../modals/UserProfileModal"

const ServerSidebar = () => {
  return (
    <div className="flex flex-col items-center justify-between px-1 py-2 pt-1">
      <div className="flex flex-col gap-2 overflow-auto"></div>

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
