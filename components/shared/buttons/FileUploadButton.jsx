"use client"
import { useDropzone } from "react-dropzone"

const dropzoneConfig = ({ onlyImage, onDrop }) => {
  let accept
  if (onlyImage)
    accept = {
      "image/*": [],
    }
  else accept = {}

  return {
    maxFiles: 1,
    accept,
    onDrop,
  }
}

const FileUploadButton = ({
  file: oldFile,
  setFile,
  disabled,
  onlyImage = false,
}) => {
  const onDrop = (files) => {
    const newFile = files[0]
    if (!newFile) return

    if (oldFile) URL.revokeObjectURL(oldFile.preview)
    if (newFile.type.startsWith("image/"))
      newFile.preview = URL.createObjectURL(newFile)
    else newFile.preview = "/icons/file.svg"
    setFile(newFile)
  }

  const { getRootProps, getInputProps } = useDropzone(
    dropzoneConfig({ onlyImage, onDrop })
  )

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
