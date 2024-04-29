"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useUpdateGroup } from "@/state/apis/group"
import { zodResolver } from "@hookform/resolvers/zod"
import { SettingsIcon } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import FileUploadButton from "../buttons/FileUploadButton"

const formSchema = z.object({
  name: z.string().min(1).max(32),
})

const getDefaultValues = (group) => ({
  name: group.name,
})

const GroupCreateInput = ({ field }) => (
  <FormItem>
    <FormLabel className="capitalize">{field.name}</FormLabel>
    <FormControl>
      <Input {...field} className="bg-black/10 dark:bg-white/15" />
    </FormControl>
    <FormMessage />
  </FormItem>
)

const UpdateGroupModal = ({ group }) => {
  const [open, setOpen] = useState(false)
  const [image, setImage] = useState(null)
  const { handler: updateGroup, isPending: isUpdateGroupPending } =
    useUpdateGroup(group.id)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultValues(group),
  })

  const resetForm = () => {
    // TODO: check socketio update
    form.reset(getDefaultValues(group))
    setOpen(false)

    if (!image) return
    URL.revokeObjectURL(image.preview)
    setImage(null)
  }

  const formSubmitHandler = ({ name }) => {
    const formData = new FormData()
    formData.append("name", name)
    formData.append("image", image)

    updateGroup(formData).then(resetForm)
  }

  useEffect(() => {
    if (!open) resetForm()
  }, [open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <SettingsIcon className="text-zinc-400" />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Group</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-2">
          <span className="font-bold">Group Image</span>

          <Image
            src={image?.preview || group.imageURL}
            alt="image"
            height={120}
            width={120}
            className="size-[120px] rounded-full"
          />
        </div>

        <FileUploadButton file={image} setFile={setImage} onlyImage={true} />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(formSubmitHandler)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={GroupCreateInput}
            />
            <Button disabled={isUpdateGroupPending}>Update</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateGroupModal
