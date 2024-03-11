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
