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
  url,
  method = "post",
  onSuccess,
  onError,
  successMsg,
  loadingMsg,
}) => {
  const mutation = useMutation({
    mutationFn: (data) => Q({ url, method, data }).then((res) => res.data),
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
