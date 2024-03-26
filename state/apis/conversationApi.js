import { useGeneralMutation } from "./generalApi"

export const useUploadAttachment = ({ setProgress }) =>
  useGeneralMutation({
    url: "/conversation/upload-attachment",
    setProgress,
    loadingMsg: "Uploading attachment",
    successMsg: "Attachment uploaded",
  })
