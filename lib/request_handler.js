import { toast } from "sonner"

const extractErrMsg = ({ response: { data: errMsg, status } }) => errMsg

export const errorHandler = (err) => toast.error(extractErrMsg(err))

export const requestHandler = ({ reqPromise, loadingMsg, successMsg }) =>
  new Promise((resolve, reject) =>
    toast.promise(reqPromise, {
      loading: loadingMsg + "...",

      error: (err) => {
        reject(err)
        return extractErrMsg(err) + "!"
      },

      success: (data) => {
        resolve(data)
        return successMsg + "!"
      },
    })
  )
