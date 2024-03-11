import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { PaperclipIcon } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import FileUploadButton from "../buttons/FileUploadButton"

const FileUploadModal = () => {
  const [file, setFile] = useState(null)

  const resetFile = () => {
    if (!file) return
    URL.revokeObjectURL(file.preview)
    setFile(null)
  }

  const modalCloseHandler = (open) => !open && resetFile()

  return (
    <Dialog onOpenChange={modalCloseHandler}>
      <DialogTrigger asChild>
        <PaperclipIcon className="cursor-pointer stroke-slate-500" />
      </DialogTrigger>

      <DialogContent className="w-11/12">
        <span className="text-center font-bold">Upload Media</span>

        <div className="flex flex-col justify-center gap-4">
          {file && (
            <div className="flex flex-col items-center gap-2">
              <Image src={file.preview} alt="media" height={160} width={200} />
              <span className="text-main">{file.name}</span>
            </div>
          )}

          <FileUploadButton file={file} setFile={setFile} />
        </div>

        {file && (
          <Button type="submit" className="w-full">
            Upload
          </Button>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default FileUploadModal
