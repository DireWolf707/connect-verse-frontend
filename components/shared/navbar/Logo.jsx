import { cn } from "@/lib/utils"
import { Righteous } from "next/font/google"
import Image from "next/image"
import Link from "next/link"

const font = Righteous({
  subsets: ["latin"],
  weight: ["400"],
})

const Logo = () => {
  return (
    <Link href="/" className="flex items-center justify-center">
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
  )
}

export default Logo
