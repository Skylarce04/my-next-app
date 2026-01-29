// "use client"

// import Image from "next/image"
// import Link from "next/link"

// interface MinistriesProps {
//   ministries: {
//     id: number
//     title: string
//     description: string
//     image_url?: string
//     slug?: string
//   }[]
// }

// export function MinistriesSection({ ministries }: MinistriesProps) {
//   return (
//     <section id="ministries" className="py-24 bg-background">
//       <div className="max-w-7xl mx-auto px-4">

//         <div className="mb-16">
//           <p className="text-sm uppercase tracking-widest text-primary mb-3">
//             Get Involved
//           </p>
//           <h2 className="text-4xl md:text-5xl font-serif font-bold">
//             Our Ministries
//           </h2>
//         </div>

//         <div className="grid md:grid-cols-3 gap-8">
//           {ministries.map((ministry) => (
//             <Link
//               key={ministry.id}
//               href={ministry.slug ? `/ministries/${ministry.slug}` : "#"}
//               className="group block bg-white rounded-2xl overflow-hidden border border-border hover:shadow-xl transition duration-300"
//             >
//               {ministry.image_url && (
//                 <div className="relative h-56 overflow-hidden">
//                   <Image
//                     src={ministry.image_url}
//                     alt={ministry.title}
//                     fill
//                     className="object-cover group-hover:scale-105 transition duration-500"
//                   />
//                 </div>
//               )}

//               <div className="p-6">
//                 <h3 className="text-xl font-serif font-semibold mb-3 transition-colors duration-300 group-hover:text-primary">
//                   {ministry.title}
//                 </h3>

//                 <p className="text-muted-foreground text-sm leading-relaxed mb-4">
//                   {ministry.description}
//                 </p>

//                 <span className="text-primary text-sm font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all">
//                   Learn More →
//                 </span>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

"use client"

import Image from "next/image"
import Link from "next/link"
import useEmblaCarousel from "embla-carousel-react"
import { useEffect, useState } from "react"

interface MinistriesProps {
  ministries: {
    id: number
    title: string
    description: string
    image_url?: string
    slug?: string
  }[]
}

export function MinistriesSection({ ministries }: MinistriesProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
  })

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const isSlider = ministries.length > 3

  useEffect(() => {
    if (!emblaApi) return

    setScrollSnaps(emblaApi.scrollSnapList())
    setSelectedIndex(emblaApi.selectedScrollSnap())

    emblaApi.on("select", () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    })
  }, [emblaApi])

  return (
    <section id="ministries" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4">

        {/* HEADER */}
        <div className="mb-16">
          <p className="text-sm uppercase tracking-widest text-primary mb-3">
            Get Involved
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold">
            Our Ministries
          </h2>
        </div>

        {isSlider ? (
          <>
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-8">
                {ministries.map((ministry) => (
                  <div
                    key={ministry.id}
                    className="basis-[320px] flex-shrink-0"
                  >
                    <MinistryCard ministry={ministry} />
                  </div>
                ))}
              </div>
            </div>

            {/* DOTS */}
            <div className="flex justify-center gap-3 mt-8">
              {scrollSnaps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={`h-3 w-3 rounded-full transition-all ${
                    index === selectedIndex
                      ? "bg-primary scale-110"
                      : "bg-border"
                  }`}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {ministries.map((ministry) => (
              <MinistryCard key={ministry.id} ministry={ministry} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function MinistryCard({ ministry }: any) {
  return (
    <Link
      href={ministry.slug ? `/ministries/${ministry.slug}` : "#"}
      className="group block bg-white rounded-2xl overflow-hidden border border-border hover:shadow-xl transition duration-300 h-[460px] flex flex-col"
    >
      {/* IMAGE */}
      <div className="relative h-[220px] overflow-hidden">
        {ministry.image_url && (
          <Image
            src={ministry.image_url}
            alt={ministry.title}
            fill
            className="object-cover group-hover:scale-105 transition duration-500"
          />
        )}
      </div>

      {/* CONTENT */}
      <div className="p-6 flex flex-col flex-grow">

        {/* TITLE */}
        <h3 className="text-xl font-serif font-semibold mb-3 transition-colors duration-300 group-hover:text-primary line-clamp-2">
          {ministry.title}
        </h3>

        {/* DESCRIPTION */}
        <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
          {ministry.description}
        </p>

        {/* BUTTON */}
        <div className="mt-auto">
          <span className="text-primary text-sm font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all">
            Learn More →
          </span>
        </div>

      </div>
    </Link>
  )
}
