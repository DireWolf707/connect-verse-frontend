import Image from "next/image"
import Link from "next/link"

const Logo = () => {
  return (
    <Link
      href="/"
      className="flex items-center justify-center bg-black/10 dark:bg-white/10"
    >
      <Image src="/logo.svg" width={50} height={50} alt="logo" priority />

      <p className="flex justify-center gap-1 text-center text-xl font-bold">
        <span>Connect</span>
        <span className="text-red-500">Verse</span>
      </p>
    </Link>
  )
}

export default Logo
