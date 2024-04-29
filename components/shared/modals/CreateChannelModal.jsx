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
import { useCreateChannel } from "@/state/apis/group"
import { zodResolver } from "@hookform/resolvers/zod"
import { PlusIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import FormInput from "../inputs/FormInput"

const formSchema = z.object({
  name: z.string().min(1).max(32),
})

const defaultFormValues = {
  name: "",
}

const CreateChannelModal = ({ group, type }) => {
  const [open, setOpen] = useState(false)
  const { handler: createChannel, isPending: isCreateChannelPending } =
    useCreateChannel(group.id)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultFormValues,
  })

  const resetForm = () => {
    form.reset(defaultFormValues)
    setOpen(false)
  }

  const formSubmitHandler = ({ name }) =>
    createChannel({ name, type }).then(resetForm)

  useEffect(() => {
    if (!open) resetForm()
  }, [open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <PlusIcon className="size-4" />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="capitalize">
            Create {type} Channel
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(formSubmitHandler)}
            className="flex flex-col gap-4"
          >
            <FormField control={form.control} name="name" render={FormInput} />
            <Button disabled={isCreateChannelPending}>Create</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateChannelModal
