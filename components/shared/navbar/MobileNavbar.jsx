"use client"
import { useUI } from "@/state/store"
import { Menu } from "lucide-react"
import { Button } from "../../ui/button"
import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet"
import Sidebar from "../sidebars/Sidebar"

const MobileNavbar = () => {
  const sidebar = useUI((state) => state.sidebar)
  const setSidebar = useUI((state) => state.setSidebar)

  return (
    <Sheet open={sidebar} onOpenChange={setSidebar}>
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
