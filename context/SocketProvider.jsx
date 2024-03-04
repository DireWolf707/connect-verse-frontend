"use client"
import Circles from "@/components/shared/loading/Circles"
import { useSocket } from "@/state/store"
import { useEffect } from "react"
import { io } from "socket.io-client"
import { toast } from "sonner"

const socketToastOptions = { id: "socket-check" }

const SocketProvider = ({ children }) => {
  const setSocket = useSocket((state) => state.setSocket)
  const unsetSocket = useSocket((state) => state.unsetSocket)
  const socket = useSocket((state) => state.socket)

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SERVER_URL, {
      autoConnect: false,
      withCredentials: true,
      reconnectionAttempts: 10,
    })

    socket.io.on("reconnect_attempt", () =>
      toast.loading("Connecting...", socketToastOptions)
    )

    socket.io.on("reconnect_failed", () =>
      toast.error("Something went wrong!", socketToastOptions)
    )

    socket.on("connect", () => {
      setSocket(socket)
      toast.success("Connected!", socketToastOptions)
    })

    socket.on("disconnect", () => {
      unsetSocket()
      console.log("websocket disconnected")
    })

    toast.loading("Connecting...", socketToastOptions)
    socket.connect()

    return () => socket.disconnect()
  }, [])

  if (!socket) return <Circles />

  return children
}

export default SocketProvider
