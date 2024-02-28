"use client"
import { navLinks } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "../../ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "../../ui/sheet"
import Logo from "./Logo"

const MobileNavbar = () => {
  const pathname = usePathname()

  return (
    <Sheet>
      <SheetTrigger asChild className="xs:hidden">
        <Button variant="ghost" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="flex flex-col justify-between border-r-2 border-red-500"
      >
        <SheetHeader className="flex items-center">
          <Logo />
        </SheetHeader>

        <div className="flex flex-col gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.route

            return (
              <SheetClose asChild key={link.route}>
                <Link
                  href={link.route}
                  className={cn("flex gap-2 rounded-lg p-4", {
                    "bg-red-500 text-white": isActive,
                  })}
                >
                  <link.Icon />
                  <span>{link.label}</span>
                </Link>
              </SheetClose>
            )
          })}
        </div>

        <div className="flex flex-col gap-2">
          <SheetClose asChild>
            <Button variant="outline" className="border-2">
              Log In
            </Button>
          </SheetClose>

          <SheetClose asChild>
            <Button>Sign Up</Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNavbar
