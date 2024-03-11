"use client"
import {
  QueryClient,
  QueryClientProvider as QueryClientProviderT,
} from "@tanstack/react-query"
import { useState } from "react"

const QueryClientProvider = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
            retry: false,
            retryOnMount: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
          },
        },
      })
  )

  return (
    <QueryClientProviderT client={queryClient}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProviderT>
  )
}

export default QueryClientProvider
