"use client"
import { navLinks } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { LogInIcon, UserRoundPlusIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "../ui/button"

const LeftSidebar = () => {
  const pathname = usePathname()

  return (
    <div className="hidden flex-col items-center justify-between bg-[rgba(0,0,0,0.05)] px-2 py-4 dark:bg-[rgba(255,255,255,0.05)] xs:flex sm:px-4">
      <div className="flex flex-col gap-2">
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
              <span className="hidden sm:block">{link.label}</span>
            </Link>
          )
        })}
      </div>

      <div className="flex w-full flex-col gap-2">
        <Button variant="outline" className="border-2">
          <span className="hidden sm:block">Log In</span>
          <LogInIcon className="sm:hidden" />
        </Button>

        <Button>
          <span className="hidden sm:block">Sign Up</span>
          <UserRoundPlusIcon className="sm:hidden" />
        </Button>
      </div>
    </div>
  )
}

export default LeftSidebar
