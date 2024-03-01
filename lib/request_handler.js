import { toast } from "sonner"

export const requestHandler = ({
  reqPromise,
  loadingMsg,
  successMsg,
  onSuccess,
  errorMsg = "Something went wrong",
  onError,
}) =>
  toast.promise(reqPromise, {
    loading: loadingMsg + "...",

    error: (err) => {
      if (onError) onError(err)
      return errorMsg + "!"
    },

    success: (data) => {
      if (onSuccess) onSuccess(data)
      return successMsg + "!"
    },
  })
