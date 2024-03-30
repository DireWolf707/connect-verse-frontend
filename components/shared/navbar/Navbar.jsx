"use client"
import Header from "./Header"
import MobileNavbar from "./MobileNavbar"

const Navbar = () => {
  return (
    <div className="flex h-navbar shrink-0 items-center justify-end bg-black/10 px-4 dark:bg-white/10 ">
      <Header />
      <MobileNavbar />
    </div>
  )
}

export default Navbar
