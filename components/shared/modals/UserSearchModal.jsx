"use client"
import { CommandDialog, CommandInput } from "@/components/ui/command"
import { useSearchUser } from "@/state/apis/userApi"
import { PlusIcon } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import UserCard from "../cards/UserCard"
import SpinnerText from "../loading/SpinnerText"

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
          data.map((user) => (
            <Link
              key={user.id}
              href={`/conversation/${user.id}`}
              onClick={onCloseHandler}
              className="p-3 hover:bg-black/15 dark:hover:bg-white/15"
            >
              <UserCard user={user} />
            </Link>
          ))}
      </CommandDialog>
    </>
  )
}

export default UserSearchModal
