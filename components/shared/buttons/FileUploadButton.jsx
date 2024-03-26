"use client"
import { getContentType } from "@/lib/utils"
import { useCallback } from "react"
import { useDropzone } from "react-dropzone"

const FileUploadButton = ({ file, setFile, disabled, onlyImage = false }) => {
  const onDrop = useCallback((files) => {
    const newFile = files[0]
    if (!newFile) return

    if (file) URL.revokeObjectURL(file.preview)

    if (getContentType(newFile) === "file") newFile.preview = "/icons/file.svg"
    else newFile.preview = URL.createObjectURL(newFile)

    setFile(newFile)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    ...(onlyImage && { accept: { "image/*": [] } }),
  })

  return (
    <div
      {...getRootProps()}
      className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-black bg-black/10 p-2 text-center text-sm dark:border-white dark:bg-white/10"
    >
      <input {...getInputProps()} disabled={disabled} />
      <span>Drag & drop some file here, or</span>
      <span>click to select file</span>
    </div>
  )
}

export default FileUploadButton
