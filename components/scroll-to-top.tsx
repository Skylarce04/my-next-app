"use client"

import { useEffect } from "react"

export default function ScrollToTop() {
  useEffect(() => {
    // Disable browser auto scroll restore
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual"
    }

    // Force scroll to top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // bisa ganti "smooth" kalau mau animasi
    })
  }, [])

  return null
}
