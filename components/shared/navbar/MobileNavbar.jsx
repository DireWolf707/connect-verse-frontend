"use client"
import { Menu } from "lucide-react"
import { Button } from "../../ui/button"
import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet"
import Sidebar from "../sidebars/Sidebar"

const MobileNavbar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild className="sm:hidden">
        <Button variant="ghost" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="flex w-auto p-0">
        <Sidebar />
      </SheetContent>
    </Sheet>
  )
}

export default MobileNavbar
