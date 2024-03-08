import { create } from "zustand"

export const useSocket = create((set) => ({
  socket: null,
  setSocket: (socket) => set({ socket }),
  unsetSocket: () => set({ socket: null }),
}))

export const useUI = create((set) => ({
  HeaderComponent: <div></div>,
  setHeaderComponent: (HeaderComponent) => set({ HeaderComponent }),
  resetHeaderComponent: () => set({ HeaderComponent: <div></div> }),
}))
