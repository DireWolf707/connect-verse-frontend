import Image from "next/image"
import Link from "next/link"
import { Button } from "../../ui/button"

const LoginButton = ({ text, href, src, alt }) => (
  <Button asChild variant="link" className="bg-white">
    <Link href={href} className="flex gap-2">
      <Image src={src} alt={alt} width={28} height={28} />
      <span className="font-[600] text-black">{text}</span>
    </Link>
  </Button>
)

const UserLogin = () => {
  return (
    <div className="flex grow items-center justify-center bg-black">
      <div className="flex flex-col gap-2">
        <LoginButton
          text="Login with Google"
          href={`${process.env.NEXT_PUBLIC_SERVER_URL}/user/login/google`}
          src="/icons/google.svg"
          alt="google"
        />

        <LoginButton
          text="Login with Github"
          href={`${process.env.NEXT_PUBLIC_SERVER_URL}/user/login/github`}
          src="/icons/github.svg"
          alt="github"
        />
      </div>
    </div>
  )
}

export default UserLogin
