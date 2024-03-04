"use client"
import { Separator } from "@/components/ui/separator"
import { navLinks } from "@/lib/constants"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import LogoutButton from "../buttons/LogoutButton"
import ThemeToggleButton from "../buttons/ThemeToggleButton"
import UserProfileModal from "../modals/UserProfileModal"

const ServerSidebar = () => {
  const pathname = usePathname()

  return (
    <div className="flex flex-col items-center justify-between px-1 py-2 pt-1">
      <div className="flex flex-col gap-2 overflow-auto px-1">
        {navLinks.map((link) => {
          const isActive = pathname === link.route

          return (
            <Link
              key={link.route}
              href={link.route}
              className={cn("flex gap-2 rounded-lg p-2", {
                "bg-red-500 text-white": isActive,
              })}
            >
              <link.Icon />
            </Link>
          )
        })}
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
