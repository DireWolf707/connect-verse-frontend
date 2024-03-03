import { toast } from "sonner"

export const requestHandler = ({
  reqPromise,
  loadingMsg,
  successMsg,
  onSuccess,
  errorMsg = "Something went wrong",
  onError,
}) =>
  new Promise((resolve, reject) =>
    toast.promise(reqPromise, {
      loading: loadingMsg + "...",

      error: (err) => {
        if (onError) onError(err)
        reject(err)
        return errorMsg + "!"
      },

      success: (data) => {
        if (onSuccess) onSuccess(data)
        resolve(data)
        return successMsg + "!"
      },
    })
  )
