import { toast } from "sonner"

const extractErrMsg = ({ response: { data: errMsg, status } }) => errMsg

export const errorHandler = (err) => toast.error(extractErrMsg(err))

export const requestHandler = ({
  reqPromise,
  loadingMsg,
  successMsg,
  onSuccess,
  onError,
}) =>
  new Promise((resolve, reject) =>
    toast.promise(reqPromise, {
      loading: loadingMsg + "...",

      error: (err) => {
        if (onError) onError(err)
        reject(err)
        return extractErrMsg(err) + "!"
      },

      success: (data) => {
        if (onSuccess) onSuccess(data)
        resolve(data)
        return successMsg + "!"
      },
    })
  )
