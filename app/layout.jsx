import { ThemeProvider } from "@/context/ThemeProvider"
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
