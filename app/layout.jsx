import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { StoreProvider } from "@/contexts/store-context"
import { Header } from "@/components/header"
import "./globals.css"
import { Suspense } from "react"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata = {
  title: "LojaStyle - Moda Feminina Online",
  description: "Descubra as últimas tendências da moda feminina com qualidade e estilo únicos.",
  generator: "v0.app",
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={`font-sans ${inter.variable} ${playfair.variable}`}>
        <StoreProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <Header />
            <main className="min-h-screen">{children}</main>
          </Suspense>
        </StoreProvider>
        <Analytics />
      </body>
    </html>
  )
}
