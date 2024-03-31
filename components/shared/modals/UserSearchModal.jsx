"use client"
import { CommandDialog, CommandInput } from "@/components/ui/command"
import { useSearchUser } from "@/state/apis/userApi"
import { useUI } from "@/state/store"
import { UserRoundSearchIcon } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import UserCard from "../cards/UserCard"
import SpinnerText from "../loading/SpinnerText"

const UserSearchModal = () => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState(null)
  const closeSidebar = useUI((state) => state.closeSidebar)
  const { data, mutate, isPending, isSuccess, isError, reset } = useSearchUser()

  useEffect(() => {
    let timeoutId
    if (search) timeoutId = setTimeout(() => mutate({ q: search }), 500)

    return () => clearTimeout(timeoutId)
  }, [search])

  const onCloseHandler = () => {
    setOpen(false)
    closeSidebar()
    reset()
  }

  return (
    <>
      <UserRoundSearchIcon
        onClick={() => setOpen(true)}
        className="text-main size-4 cursor-pointer"
      />

      <CommandDialog open={open} onOpenChange={onCloseHandler}>
        <CommandInput
          onValueChange={setSearch}
          className="text-main"
          placeholder="Type username to search..."
        />

        {isPending && (
          <div className="p-3">
            <SpinnerText text="Searching users" />
          </div>
        )}

        {isError && (
          <div className="mx-auto p-3">
            <span className="text-main">Something went wrong!</span>
          </div>
        )}

        {isSuccess ? (
          data.length ? (
            data.map((user) => (
              <Link
                key={user.id}
                href={`/conversation/${user.id}`}
                onClick={onCloseHandler}
                className="p-3 hover:bg-black/15 dark:hover:bg-white/15"
              >
                <UserCard user={user} />
              </Link>
            ))
          ) : (
            <div className="mx-auto p-3">
              <span className="text-main">No user found!</span>
            </div>
          )
        ) : (
          <></>
        )}
      </CommandDialog>
    </>
  )
}

export default UserSearchModal
