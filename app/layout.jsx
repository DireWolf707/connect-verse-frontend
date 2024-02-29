import { Toaster } from "@/components/ui/sonner"
import AuthProvider from "@/context/AuthProvider"
import QueryClientProvider from "@/context/QueryClientProvider"
import ThemeProvider from "@/context/ThemeProvider"
import { cn } from "@/lib/utils"
import { Roboto } from "next/font/google"
import "./globals.css"

const font = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
})

export const metadata = {
  title: "Connect Verse",
  icons: { icon: "/logo.svg" },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(font.className, "flex h-screen w-screen overflow-auto")}
      >
        <QueryClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster richColors closeButton position="top-right" />

            <AuthProvider>{children}</AuthProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
