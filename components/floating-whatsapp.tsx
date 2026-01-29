"use client"

import { MessageCircle } from "lucide-react"

export function FloatingWhatsApp() {
  const phoneNumber = "6281234567890" // GANTI DENGAN NOMOR WA
  const message = encodeURIComponent(
    "Halo Saudara Nuel, saya ingin bertanya tentang GPdI Karmel Cipinang."
  )

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-6 right-6 z-50"
      aria-label="Chat via WhatsApp"
    >
      <div className="relative flex items-center">

        {/* Tooltip */}
        <span className="absolute right-16 bg-black text-white text-xs px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
          Chat with us
        </span>

        {/* Button */}
        <div className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-300">
          <MessageCircle className="w-6 h-6 text-white" />
        </div>

      </div>
    </a>
  )
}
