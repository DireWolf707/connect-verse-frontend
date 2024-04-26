import { useQueryClient } from "@tanstack/react-query"
import { useGeneralMutation, useGeneralQuery } from "./generalApi"

export const useCreateGroup = () => {
  const queryClient = useQueryClient()

  return useGeneralMutation({
    url: "/group",
    loadingMsg: "Creating group",
    successMsg: "Group created",
    // TODO: sort
    onSuccess: (newGroup) =>
      queryClient.setQueryData(["groups"], (pv) => [...pv, newGroup]),
  })
}

export const useGroups = () =>
  useGeneralQuery({
    url: "/group/me",
    queryKey: ["groups"],
  })

export const useGroupInfo = (inviteCode) =>
  useGeneralQuery({
    url: "/join/" + inviteCode,
    queryKey: ["group_info", inviteCode],
  })

export const useJoinGroup = (inviteCode) => {
  const queryClient = useQueryClient()

  return useGeneralMutation({
    url: "/join/" + inviteCode,
    loadingMsg: "Joining group",
    successMsg: "Group joined",
    // TODO: sort
    onSuccess: (newGroup) =>
      queryClient.setQueryData(["groups"], (pv) => [...pv, newGroup]),
  })
}

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

export const useDeleteGroup = (groupId, { memberRole }) => {
  const queryClient = useQueryClient()

  let loadingMsg = "Deleting group"
  let successMsg = "Group deleted"
  let onSuccess = null
  if (memberRole !== "admin") {
    loadingMsg = "Leaving group"
    successMsg = "Group left"
    onSuccess = () =>
      queryClient.setQueryData(["groups"], (pv) =>
        pv.filter((group) => group.id !== groupId)
      )
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

export const useMembers = (groupId) =>
  useGeneralQuery({
    url: "/group/" + groupId + "/members",
    queryKey: ["members", groupId],
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

export const useDeletedChannel = (groupId, channelId) =>
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
