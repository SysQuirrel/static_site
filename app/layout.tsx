import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Smol Project - Interactive Water Experience",
  description:
    "A futuristic multi-page website with natural water ripples, interactive elements, and immersive design. Experience the magic of digital water physics.",
  keywords: "interactive design, water effects, ripples, futuristic, web development, smol project",
  authors: [{ name: "Smol Project" }],
  creator: "Smol Project",
  publisher: "Smol Project",
  generator: "v0.app",
  metadataBase: new URL("https://smol.qzz.io"),
  openGraph: {
    title: "Smol Project - Interactive Water Experience",
    description: "A futuristic multi-page website with natural water ripples and interactive elements",
    url: "https://smol.qzz.io",
    siteName: "Smol Project",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Smol Project - Interactive Water Experience",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Smol Project - Interactive Water Experience",
    description: "A futuristic multi-page website with natural water ripples and interactive elements",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={<div>Loading...</div>}>
          <div className="dark">{children}</div>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
