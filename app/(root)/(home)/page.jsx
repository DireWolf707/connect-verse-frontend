"use client"
import { useSocket } from "@/state/store"

const Me = () => {
  const socket = useSocket((state) => state.socket)

  return <div>Me</div>
}

export default Me
