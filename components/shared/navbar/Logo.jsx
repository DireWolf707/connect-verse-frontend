import { cn } from "@/lib/utils"
import { useUI } from "@/state/store"
import { XIcon } from "lucide-react"
import { Righteous } from "next/font/google"
import Image from "next/image"
import Link from "next/link"

const font = Righteous({
  subsets: ["latin"],
  weight: ["400"],
})

const Logo = () => {
  const closeSidebar = useUI((state) => state.closeSidebar)

  return (
    <div className="relative flex h-navbar justify-center">
      <XIcon
        onClick={closeSidebar}
        className="absolute right-[8px] top-[50%] translate-y-[-50%] cursor-pointer sm:hidden"
      />

      <Link href="/" className="flex items-center">
        <Image src="/logo.svg" width={50} height={50} alt="logo" priority />

        <p
          className={cn(
            font.className,
            "flex justify-center gap-1 text-center text-xl font-bold"
          )}
        >
          <span>Connect</span>
          <span className="text-red-500">Verse</span>
        </p>
      </Link>
    </div>
  )
}

export default Logo
