import { create } from "zustand"

export const useSocket = create((set) => ({
  socket: null,
  setSocket: (socket) => set({ socket }),
  resetSocket: () => set({ socket: null }),
}))

export const useUI = create((set) => ({
  otherUser: null,
  setOtherUser: (otherUser) => set({ otherUser }),
  resetOtherUser: () => set({ otherUser: null }),

  channelName: null,
  setChannelName: (channelName) => set({ channelName }),
  resetChannelName: () => set({ channelName: null }),

  sidebar: false,
  setSidebar: (open) => set({ sidebar: open }),
}))
