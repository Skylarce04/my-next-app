// import React from "react"
// import type { Metadata } from 'next'
// import { Geist, Geist_Mono } from 'next/font/google'
// import { Analytics } from '@vercel/analytics/next'
// import './globals.css'
// import ScrollToTop from "@/components/scroll-to-top"
// import { Toaster } from "@/components/ui/toaster"
// <Toaster />

// const _geist = Geist({ subsets: ["latin"] });
// const _geistMono = Geist_Mono({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: {
//     default: "GPdI Karmel Cipinang",
//     template: "%s | GPdI Karmel Cipinang",
//   },
//   description:
//     "GPdI Karmel Cipinang Ministries. A place to belong, grow in faith, and serve together. Join us for worship and fellowship.",
//   icons: {
//     icon: "/images/logo.png",
//     apple: "/images/logo.png",
//   },
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       <body>
//         <ScrollToTop />
//         {children}
//       </body>
//     </html>
//   )
// }

import React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import ScrollToTop from "@/components/scroll-to-top"
import { Toaster } from "@/components/ui/toaster"

const geist = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "GPdI Karmel Cipinang",
    template: "%s | GPdI Karmel Cipinang",
  },
  description:
    "GPdI Karmel Cipinang Ministries. A place to belong, grow in faith, and serve together. Join us for worship and fellowship.",
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ScrollToTop />
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
