"use client"
import { useDropzone } from "react-dropzone"

const FileUploadButton = ({ file: oldFile, setFile, disabled }) => {
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      "image/*": [],
    },
    onDrop: (files) => {
      const newFile = files[0]
      if (!newFile) return

      if (oldFile) URL.revokeObjectURL(oldFile.preview)
      newFile.preview = URL.createObjectURL(newFile)
      setFile(newFile)
    },
  })

  return (
    <div
      {...getRootProps()}
      className="cursor-pointer rounded-xl border-2 border-dashed border-black bg-black/10 p-2 text-center text-sm dark:border-white dark:bg-white/10"
    >
      <input {...getInputProps()} disabled={disabled} />
      <p>Drag & drop some file here, or</p>
      <p>click to select file</p>
    </div>
  )
}

export default FileUploadButton
