import { useEffect, useRef } from "react"
import { io, Socket } from "socket.io-client"

interface Event<T> {
  eventName: string
  eventHandler: (payload: T) => void
}

interface Props<T> {
  url: string
  events: Event<T>[]
}

export const useSocket = <T>({ url, events }: Props<T>) => {
  const socketRef = useRef<Socket | null>(null)
  const memoizedEvents = useRef(events)

  useEffect(() => {
    memoizedEvents.current = events
  }, [events])

  useEffect(() => {
    const socket = io(url)
    socketRef.current = socket

    socket.on("connect", () => {
      console.log("Connected to server")
    })

    memoizedEvents.current.forEach(({ eventName, eventHandler }) => {
      socket.on(eventName, eventHandler)
    })

    return () => {
      memoizedEvents.current.forEach(({ eventName, eventHandler }) => {
        socket.off(eventName, eventHandler)
      })
      socket.disconnect()
    }
  }, [url])

  return { socketRef }
}
