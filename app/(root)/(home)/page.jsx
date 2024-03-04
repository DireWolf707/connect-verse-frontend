"use client"
import { useSocket } from "@/state/store"

const Me = () => {
  const socket = useSocket((state) => state.socket)

  return <div></div>
}

export default Me
