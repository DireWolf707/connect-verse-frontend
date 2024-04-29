"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormField } from "@/components/ui/form"
import { useUpdateChannel } from "@/state/apis/group"
import { zodResolver } from "@hookform/resolvers/zod"
import { PencilIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import FormInput from "../inputs/FormInput"

const formSchema = z.object({
  name: z.string().min(1).max(32),
})

const getDefaultFormValues = ({ name }) => ({ name })

const UpdateChannelModal = ({ groupId, channel }) => {
  const [open, setOpen] = useState(false)
  const { handler: updateChannel, isPending: isUpdateChannelPending } =
    useUpdateChannel(groupId, channel.id)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultFormValues(channel),
  })

  const resetForm = () => {
    form.reset(getDefaultFormValues(channel))
    setOpen(false)
  }

  const formSubmitHandler = ({ name }) =>
    updateChannel({ name }).then(resetForm)

  useEffect(() => {
    if (!open) resetForm()
  }, [open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <PencilIcon className="size-4 stroke-green-400" />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="capitalize">
            Update {channel.type} Channel
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(formSubmitHandler)}
            className="flex flex-col gap-4"
          >
            <FormField control={form.control} name="name" render={FormInput} />
            <Button disabled={isUpdateChannelPending}>Update</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateChannelModal
