"use client"
import { useDropzone } from "react-dropzone"

const FileUploadButton = ({ file, setFile }) => {
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      "image/*": [],
    },
    onDrop: (files) => {
      const file = files[0]
      if (!file) return

      Object.assign(file, { preview: URL.createObjectURL(file) })
      setFile(file)
    },
  })

  return (
    <div
      {...getRootProps()}
      className="cursor-pointer rounded-xl border-2 border-dashed border-black bg-black/10 p-2 text-center text-sm dark:border-white dark:bg-white/10"
    >
      <input {...getInputProps()} />
      <p>Drag & drop some file here, or</p>
      <p>click to select file</p>
    </div>
  )
}

export default FileUploadButton
