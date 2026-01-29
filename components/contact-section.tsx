"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { Loader2 } from "lucide-react"

const contactInfo = [
  {
    icon: MapPin,
    label: "Address",
    value: "Jl. Cipinang Lontar II No.4, RT.1/RW.8, Cipinang, Kec. Pulo Gadung, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13240",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "021-472-1768",
  },
  {
    icon: Mail,
    label: "Email",
    value: "karmel.church.cipinang@gmail.com",
  },
  {
    icon: Clock,
    label: "Office Hours",
    value: "Mon-Fri: 9AM - 5PM",
  },
]

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [slide, setSlide] = useState(0)


  /* ======= HANDLE SUBMIT =======*/
const [loading, setLoading] = useState(false)
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()

  if (!formData.name || !formData.message) {
    alert("Mohon isi nama dan pesan terlebih dahulu 🙏")
    return
  }

  setLoading(true)

  const phoneNumber = "6282210732200"

  const message = `Shalom Saudara Nuel

Saya ${formData.name}, baru saja mengunjungi website GPdI Karmel Cipinang dan ingin bertanya mengenai:

"${formData.message}"

Mohon informasinya ya. Terima kasih banyak. Tuhan memberkati.`

  const encodedMessage = encodeURIComponent(message)
  const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

  setTimeout(() => {
    window.open(url, "_blank")
    setLoading(false)
    setFormData({
      name: "",
      email: "",
      message: "",
    })
  }, 600)
}


  return (
    <section id="contact" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

          {/* LEFT SIDE (INFO - TIDAK BERUBAH) */}
          <div>
            <p className="text-primary text-sm uppercase tracking-widest mb-3 font-medium">
              Get In Touch
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-6">
              We Would Love to Hear From You
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Have questions? Want to learn more about our ministries?
              We are here to help and would love to connect with you.
            </p>

            <div className="space-y-6">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="text-foreground font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE (SLIDER CARD ONLY) */}
          <div className="relative">

            <div className="overflow-hidden rounded-lg border border-border bg-card">

              <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${slide * 100}%)` }}
              >

                {/* ===== SLIDE 1 - FORM ===== */}
                <div className="min-w-full p-8">
                  <h3 className="font-serif text-2xl font-semibold text-foreground mb-6">
                    Send Us a Message
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Your Name
                      </label>
                      <Input
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="john@example.com"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Your Message
                      </label>
                      <Textarea
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="How can we help you?"
                        rows={4}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={loading}
                      className="w-full"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Opening WhatsApp...
                        </span>
                      ) : (
                        "Chat via WhatsApp"
                      )}
                    </Button>
                  </form>
                </div>

                {/* ===== SLIDE 2 - GOOGLE MAPS ===== */}
                <div className="min-w-full h-[500px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.395684293015!2d106.88823417586804!3d-6.211430760843577!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f4a1bacd323f%3A0x640eb81081b4826e!2sGPdI%20Karmel%20Cipinang!5e0!3m2!1sen!2sid!4v1769470564038!5m2!1sen!2si"
                    className="w-full h-full"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* DOTS */}
            <div className="flex justify-center gap-3 mt-6">
              {[0, 1].map((i) => (
                <button
                  key={i}
                  onClick={() => setSlide(i)}
                  className={`w-3 h-3 rounded-full transition ${
                    slide === i ? "bg-primary" : "bg-primary/30"
                  }`}
                />
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
