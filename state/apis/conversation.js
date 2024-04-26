import { useGeneralMutation, useGeneralQuery } from "./generalApi"

export const useGetConversations = () =>
  useGeneralQuery({
    url: "/conversation/me",
    queryKey: ["conversations"],
  })

export const useGetMessages = ({ otherUserId }) =>
  useGeneralQuery({
    url: "/conversation/" + otherUserId,
    queryKey: ["conversation", otherUserId],
  })

export const useCreateMessage = ({ otherUserId }) =>
  useGeneralMutation({
    url: "/conversation/" + otherUserId,
  })

export const useUploadAttachment = ({ otherUserId, setProgress }) =>
  useGeneralMutation({
    url: "/conversation/" + otherUserId + "/upload-attachment",
    setProgress,
    loadingMsg: "Uploading attachment",
    successMsg: "Attachment uploaded",
  })

export const useBlock = ({ otherUserId }) =>
  useGeneralMutation({
    url: "/conversation/" + otherUserId + "/block",
    loadingMsg: "Blocking user",
    successMsg: "User blocked",
  })

export const useUnblock = ({ otherUserId }) =>
  useGeneralMutation({
    url: "/conversation/" + otherUserId + "/unblock",
    loadingMsg: "Unblocking user",
    successMsg: "User unblocked",
  })

export const useDeleteMessage = ({ otherUserId, messageId }) =>
  useGeneralMutation({
    url: "/conversation/" + otherUserId + "/message/" + messageId,
    method: "delete",
    loadingMsg: "Deleting message",
    successMsg: "Message Deleted",
  })

export const useEditMessage = ({ otherUserId, messageId }) =>
  useGeneralMutation({
    url: "/conversation/" + otherUserId + "/message/" + messageId,
    loadingMsg: "Editing message",
    successMsg: "Message Edited",
  })
