"use client"
import { useSocketStore } from "@/lib/store"

const Me = () => {
  const socket = useSocketStore((state) => state.socket)

  return <div>Me</div>
}

export default Me
