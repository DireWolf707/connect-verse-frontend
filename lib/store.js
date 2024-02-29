import { create } from "zustand"

export const useSocketStore = create((set) => ({
  socket: null,
  setSocket: (socket) => set({ socket }),
  unsetSocket: () => set({ socket: null }),
}))
