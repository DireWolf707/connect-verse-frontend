"use client"
import { useUI } from "@/state/store"
import MobileNavbar from "./MobileNavbar"

const Navbar = () => {
  const HeaderComponent = useUI((state) => state.HeaderComponent)

  return (
    <div className="flex h-navbar items-center justify-between bg-black/10 px-4 dark:bg-white/10">
      {HeaderComponent}
      <MobileNavbar />
    </div>
  )
}

export default Navbar
