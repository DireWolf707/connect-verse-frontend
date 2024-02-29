"use client"
import Circles from "@/components/shared/loading/Circles"
import { useSocketStore } from "@/lib/store"
import { useEffect } from "react"
import { io } from "socket.io-client"
import { toast } from "sonner"

const socketToastOptions = { id: "socket-check" }

const SocketProvider = ({ children }) => {
  const setSocket = useSocketStore((state) => state.setSocket)
  const unsetSocket = useSocketStore((state) => state.unsetSocket)
  const socket = useSocketStore((state) => state.socket)

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SERVER_URL, {
      autoConnect: false,
      withCredentials: true,
      reconnectionAttempts: 3,
    })

    socket.io.on("reconnect_attempt", () =>
      toast.loading("Reconnecting!", socketToastOptions)
    )

    socket.io.on("reconnect", () =>
      toast.success("Reconnected!", socketToastOptions)
    )

    socket.io.on("reconnect_failed", () =>
      toast.error("Something went wrong!", socketToastOptions)
    )

    socket.on("connect", () => {
      setSocket(socket)
      console.log("websocket connected")
    })

    socket.on("disconnect", () => {
      unsetSocket()
      console.log("websocket disconnected")
    })

    socket.connect()

    return () => socket.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!socket) return <Circles />

  return children
}

export default SocketProvider
