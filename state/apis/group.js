import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useGeneralMutation, useGeneralQuery } from "./generalApi"

export const useCreateGroup = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useGeneralMutation({
    url: "/group",
    loadingMsg: "Creating group",
    successMsg: "Group created",
    onSuccess: (newGroup) => {
      queryClient.setQueryData(["groups"], (pv) => [...pv, newGroup])
      router.push("/group/" + newGroup.id)
    },
  })
}

export const useGroups = () =>
  useGeneralQuery({
    url: "/group/me",
    queryKey: ["groups"],
  })

export const useGroupInfo = (inviteCode) =>
  useGeneralQuery({
    url: "/group/join/" + inviteCode,
    queryKey: ["group_info", inviteCode],
  })

export const useJoinGroup = (inviteCode) =>
  useGeneralMutation({
    url: "/group/join/" + inviteCode,
    loadingMsg: "Joining group",
    successMsg: "Group joined",
  })

export const useGroup = (groupId) =>
  useGeneralQuery({
    url: "/group/" + groupId,
    queryKey: ["group", groupId],
  })

export const useUpdateGroup = (groupId) =>
  useGeneralMutation({
    url: "/group/" + groupId,
    method: "patch",
    loadingMsg: "Updating group",
    successMsg: "Group updated",
  })

export const useDeleteGroup = (groupId, { isAdmin }) => {
  const queryClient = useQueryClient()
  const router = useRouter()

  let loadingMsg = "Deleting group"
  let successMsg = "Group deleted"
  let onSuccess = null
  if (!isAdmin) {
    loadingMsg = "Leaving group"
    successMsg = "Group left"
    onSuccess = () => {
      queryClient.setQueryData(["groups"], (pv) =>
        pv.filter((group) => group.id !== groupId)
      )
      router.replace("/")
    }
  }

  return useGeneralMutation({
    url: "/group/" + groupId,
    method: "delete",
    loadingMsg,
    successMsg,
    onSuccess,
  })
}

export const useResetLink = (groupId) =>
  useGeneralMutation({
    url: "/group/" + groupId + "/reset-link",
    loadingMsg: "Reseting link",
    successMsg: "Link reset",
  })

export const useMembers = (groupId, { enabled }) =>
  useGeneralQuery({
    url: "/group/" + groupId + "/members",
    queryKey: ["members", groupId],
    enabled,
  })

export const useUpdateMember = (groupId, memberId) =>
  useGeneralMutation({
    url: "/group/" + groupId + "/member/" + memberId,
    loadingMsg: "Updating member",
    successMsg: "Member updated",
  })

export const useCreateChannel = (groupId) =>
  useGeneralMutation({
    url: "/group/" + groupId + "/channel",
    loadingMsg: "Creating channel",
    successMsg: "Channel created",
  })

export const useChannel = (groupId, channelId) =>
  useGeneralQuery({
    url: "/group/" + groupId + "/channel/" + channelId,
    queryKey: ["channel", channelId],
  })

export const useUpdateChannel = (groupId, channelId) =>
  useGeneralMutation({
    url: "/group/" + groupId + "/channel/" + channelId,
    method: "patch",
    loadingMsg: "Updating channel",
    successMsg: "Channel updated",
  })

export const useDeleteChannel = (groupId, channelId) =>
  useGeneralMutation({
    url: "/group/" + groupId + "/channel/" + channelId,
    method: "delete",
    loadingMsg: "Deleting channel",
    successMsg: "Channel deleted",
  })

export const useCreateMessage = (groupId, channelId) =>
  useGeneralMutation({
    url: "/group/" + groupId + "/channel/" + channelId + "/message",
  })

export const useUploadAttachment = (groupId, channelId, setProgress) =>
  useGeneralMutation({
    url: "/group/" + groupId + "/channel/" + channelId + "/message",
    setProgress,
    loadingMsg: "Uploading attachment",
    successMsg: "Attachment Uploaded",
  })

export const useUpdateMessage = (groupId, channelId, messageId) =>
  useGeneralMutation({
    url:
      "/group/" + groupId + "/channel/" + channelId + "/message/" + messageId,
    method: "patch",
    loadingMsg: "Updating message",
    successMsg: "Message updated",
  })

export const useDeleteMessage = (groupId, channelId, messageId) =>
  useGeneralMutation({
    url:
      "/group/" + groupId + "/channel/" + channelId + "/message/" + messageId,
    method: "delete",
    loadingMsg: "Deleting message",
    successMsg: "Message deleted",
  })
