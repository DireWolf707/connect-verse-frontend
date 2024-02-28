"use client"
import GlobalSearch from "../search/GlobalSearch"
import Logo from "./Logo"
import MobileNavbar from "./MobileNavbar"
import ThemeToggleButton from "./ThemeToggleButton"

const Navbar = () => {
  return (
    <div className="flex items-center justify-between gap-8 border-b-4 border-red-500 bg-[rgba(0,0,0,0.05)] px-4 py-2 dark:bg-[rgba(255,255,255,0.05)]">
      <Logo />

      <GlobalSearch />

      <div className="flex items-center gap-2">
        <ThemeToggleButton />

        <MobileNavbar />
      </div>
    </div>
  )
}

export default Navbar
