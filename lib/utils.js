import { clsx } from "clsx"
import moment from "moment"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs) => {
  return twMerge(clsx(inputs))
}

export const key = (...args) => args.join(":")

export const formatDate = (date) => moment(date).format("MMMM Do YYYY")

export const formatDateWithTime = (date) =>
  moment(date).format("MMMM Do YYYY, hh:mm a")

export const getContentType = (file) => {
  const type = file.type.split("/")[0]
  if (["video", "image"].includes(type)) return type
  return "file"
}
