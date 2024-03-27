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
  // Axios params
  url,
  // Axios "optional" params
  method = "post",
  setProgress = null,
  // Request handler params
  successMsg,
  loadingMsg,
  // Mutation query "optional" params
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
    onError,
    onSuccess,
  })

  const handler = useCallback(
    (data) =>
      requestHandler({
        reqPromise: () => mutation.mutateAsync(data),
        loadingMsg,
        successMsg,
      }),
    []
  )

  return { ...mutation, handler }
}
