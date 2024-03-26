import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { getContentType } from "@/lib/utils"
import { useUploadAttachment } from "@/state/apis/conversationApi"
import { PaperclipIcon } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import FileUploadButton from "../buttons/FileUploadButton"

const AttachmentUploadModal = ({ otherUserId }) => {
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState(null)
  const [progress, setProgress] = useState(null)

  const { handler: uploadAttachment, isPending } = useUploadAttachment({
    otherUserId,
    setProgress,
  })

  const resetModal = () => {
    setOpen(false)
    setProgress(null)
    setFile((file) => {
      if (file) URL.revokeObjectURL(file.preview)
      return null
    })
  }

  const fileUploadHandler = () => {
    if (!file) return

    const formData = new FormData()
    formData.append("file", file)
    uploadAttachment(formData).then(resetModal).catch(resetModal)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <PaperclipIcon className="cursor-pointer stroke-slate-500" />
      </DialogTrigger>

      <DialogContent className="w-11/12">
        <span className="text-center font-bold">Add an attachment</span>

        <div className="flex flex-col justify-center gap-4">
          {file && (
            <div className="flex flex-col items-center gap-2">
              {getContentType(file) === "video" ? (
                <video src={file.preview} alt="media" controls />
              ) : (
                <Image
                  src={file.preview}
                  alt="media"
                  height={300}
                  width={360}
                  className="max-h-[280px] w-[340px] object-contain"
                />
              )}
              <span className="text-main">{file.name}</span>
            </div>
          )}

          {progress ? (
            <div className="relative">
              <span className="absolute left-[50%] top-[50%] z-10 translate-x-[-50%] translate-y-[-50%]">
                {progress}%
              </span>
              <Progress value={progress} className="h-8 rounded-none" />
            </div>
          ) : (
            <>
              <FileUploadButton file={file} setFile={setFile} />

              <Button
                onClick={fileUploadHandler}
                type="submit"
                className="w-full"
                disabled={!file || isPending}
              >
                Upload
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AttachmentUploadModal
