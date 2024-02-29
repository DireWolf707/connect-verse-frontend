import Image from "next/image"
import Link from "next/link"

const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center">
        <Image src="/logo.svg" width={56} height={56} alt="logo" />

        <p className="flex gap-0.5 text-xl">
          <span>Wolf</span>
          <span className="text-red-500">Overflow</span>
        </p>
      </div>
    </Link>
  )
}

export default Logo
