"use client"
import { useUI } from "@/state/store"
import { MenuIcon } from "lucide-react"
import Header from "./Header"

const Navbar = () => {
  const openSidebar = useUI((state) => state.openSidebar)

  return (
    <div className="flex h-navbar shrink-0 items-center justify-end gap-1 bg-[#e6f5f6] px-4 dark:bg-[#260732]">
      <Header />

      <MenuIcon onClick={openSidebar} className="cursor-pointer sm:hidden" />
    </div>
  )
}

export default Navbar
