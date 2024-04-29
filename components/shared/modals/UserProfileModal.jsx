"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormField } from "@/components/ui/form"
import { useDeleteAvatar, useUpdateUser, useUser } from "@/state/apis/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { Trash2Icon } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import FileUploadButton from "../buttons/FileUploadButton"
import FormInput from "../inputs/FormInput"
import UserAvatar from "../user/UserAvatar"

const formSchema = z.object({
  username: z.string().min(1).max(32),
  name: z.string().min(1).max(32),
})

const getDefaultValues = (user) => ({
  email: user.email,
  username: user.username,
  name: user.name,
})

const UserProfileModal = () => {
  const [open, setOpen] = useState(false)
  const [avatar, setAvatar] = useState(null)
  const { data: user } = useUser()
  const { handler: updateUser, isPending: isUserUpdatePending } =
    useUpdateUser()
  const { handler: deleteAvatar, isPending: isAvatarDeletePending } =
    useDeleteAvatar()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultValues(user),
  })

  const resetForm = (user) => {
    form.reset(getDefaultValues(user))

    if (!avatar) return
    URL.revokeObjectURL(avatar.preview)
    setAvatar(null)
  }

  const avatarDeleteHandler = () => deleteAvatar().then(resetForm)

  const formSubmitHandler = (data) => {
    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("username", data.username)
    if (avatar) formData.append("avatar", avatar)

    updateUser(formData).then(resetForm)
  }

  useEffect(() => {
    if (!open) resetForm(user)
  }, [open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <UserAvatar src={user.avatarURL} username={user.username} />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>

          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="relative flex items-center justify-center gap-2 self-center">
            <UserAvatar
              src={avatar?.preview || user.avatarURL}
              username={user.username}
              size="size-36"
            />

            {user.avatarURL && (
              <Button
                onClick={avatarDeleteHandler}
                disabled={isAvatarDeletePending}
                size="link"
                variant="destructive"
                className="absolute right-[-20%] top-[50%] translate-x-[50%] translate-y-[-50%] rounded-full p-2"
              >
                <Trash2Icon />
              </Button>
            )}
          </div>

          <FileUploadButton
            file={avatar}
            setFile={setAvatar}
            onlyImage={true}
            disabled={isUserUpdatePending || isAvatarDeletePending}
          />

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(formSubmitHandler)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="email"
                disabled={true}
                render={FormInput}
              />
              <FormField
                control={form.control}
                name="username"
                render={FormInput}
              />
              <FormField
                control={form.control}
                name="name"
                render={FormInput}
              />
              <DialogFooter>
                <Button disabled={isUserUpdatePending}>Save changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UserProfileModal
