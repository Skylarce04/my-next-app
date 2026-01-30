"use client"

import useEmblaCarousel from "embla-carousel-react"
import { useEffect, useState } from "react"

interface ServicesProps {
  services: {
    id: number
    title: string
    day: string
    time: string
    description: string
  }[]
}

export function ServiceTimes({ services }: ServicesProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
  })

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const isSlider = services.length > 3

  useEffect(() => {
    if (!emblaApi) return

    setScrollSnaps(emblaApi.scrollSnapList())
    setSelectedIndex(emblaApi.selectedScrollSnap())

    emblaApi.on("select", () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    })
  }, [emblaApi])

  return (
    <section
      id="services"
      className="py-16 bg-gradient-to-b from-background to-muted/40"
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-20">
          <p className="text-sm uppercase tracking-[0.25em] text-primary/80 mb-4">
            Join Us
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-semibold tracking-tight">
            Service Times
          </h2>
          <div className="w-16 h-[2px] bg-primary/40 mx-auto mt-6" />
        </div>

        {isSlider ? (
          <>
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-10">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className="basis-[360px] flex-shrink-0"
                  >
                    <ServiceCard service={service} />
                  </div>
                ))}
              </div>
            </div>

            {/* DOTS */}
            <div className="flex justify-center gap-3 mt-12">
              {scrollSnaps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                    index === selectedIndex
                      ? "bg-primary scale-125"
                      : "bg-border"
                  }`}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="grid md:grid-cols-3 gap-10">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function ServiceCard({ service }: any) {
  return (
    <div className="group bg-card/70 backdrop-blur-sm border border-border/60 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col min-h-[260px]">

      {/* HEADER */}
      <div className="flex items-start gap-5 mb-6">

        {/* ICON */}
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-primary/20">
          <svg
            className="w-5 h-5 text-primary"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
          </svg>
        </div>

        <div>
          <h3 className="text-xl font-serif font-semibold tracking-tight">
            {service.day}
          </h3>
          <p className="text-primary text-sm font-medium tracking-wide">
            {service.title}
          </p>
        </div>
      </div>

      {/* DESCRIPTION */}
      <p className="text-muted-foreground text-sm leading-relaxed mb-8">
        {service.description}
      </p>

      {/* TIME BADGE */}
      <div className="mt-auto">
        <span className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium tracking-wide shadow-sm">
          {service.time}
        </span>
      </div>
    </div>
  )
}
