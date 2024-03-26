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
