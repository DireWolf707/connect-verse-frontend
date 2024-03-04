"use client"
import { HashIcon } from "lucide-react"
import MobileNavbar from "./MobileNavbar"

const Navbar = () => {
  return (
    <div className="flex h-navbar items-center justify-between bg-black/10 px-4 dark:bg-white/10">
      <div className="flex items-center gap-1">
        <HashIcon />
        <span className="text-xl font-medium">general</span>
      </div>

      <MobileNavbar />
    </div>
  )
}

export default Navbar
