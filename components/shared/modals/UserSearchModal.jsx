"use client"
import { CommandDialog, CommandInput } from "@/components/ui/command"
import { useSearchUser } from "@/state/apis/userApi"
import { PlusIcon } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import SpinnerText from "../loading/SpinnerText"
import UserAvatar from "../user/UserAvatar"

const UserSearchModal = () => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState(null)
  const { data, mutate, isPending, isSuccess, isError, reset } = useSearchUser()

  useEffect(() => {
    let timeoutId
    if (search) timeoutId = setTimeout(() => mutate({ q: search }), 500)

    return () => clearTimeout(timeoutId)
  }, [search])

  const onCloseHandler = () => {
    setOpen(false)
    reset()
  }

  return (
    <>
      <PlusIcon
        onClick={() => setOpen(true)}
        className="size-4 cursor-pointer"
      />

      <CommandDialog open={open} onOpenChange={onCloseHandler}>
        <CommandInput
          onValueChange={setSearch}
          placeholder="Type username to search..."
        />

        {isPending && (
          <div className="p-3">
            <SpinnerText text="Searching users" />
          </div>
        )}

        {isError && (
          <div className="p-3">
            <span>Something went wrong!</span>
          </div>
        )}

        {isSuccess &&
          data.map(({ id, name, avatar, username }) => (
            <Link
              key={id}
              href={`/conversation/${id}`}
              onClick={onCloseHandler}
              className="flex items-center gap-3 p-3 hover:bg-black/15 dark:hover:bg-white/15"
            >
              <UserAvatar src={avatar} username={username} />

              <div className="flex flex-col">
                <span className="text-sm font-semibold">{username}</span>
                <span className="text-xs font-light">({name})</span>
              </div>
            </Link>
          ))}
      </CommandDialog>
    </>
  )
}

export default UserSearchModal
