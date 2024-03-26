import { Q } from "@/lib/axios_client"
import { requestHandler } from "@/lib/request_handler"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useCallback } from "react"

export const useGeneralQuery = ({ queryKey, url }) =>
  useQuery({
    queryKey,
    queryFn: () => Q.get(url).then((res) => res.data),
  })

export const useGeneralMutation = ({
  // axios params
  url,
  // axios "optional" params
  method = "post",
  setProgress = null,
  // request handler params
  successMsg,
  loadingMsg,
  // request handler "optional" params
  onSuccess,
  onError,
}) => {
  const mutation = useMutation({
    mutationFn: (data) =>
      Q({
        url,
        method,
        data,
        ...(setProgress && {
          onUploadProgress: ({ progress }) =>
            setProgress(Math.floor(progress * 100)),
        }),
      }).then((res) => res.data),
  })

  const handler = useCallback(
    (data) =>
      requestHandler({
        reqPromise: () => mutation.mutateAsync(data),
        loadingMsg,
        successMsg,
        onSuccess,
        onError,
      }),
    []
  )

  return { ...mutation, handler }
}
