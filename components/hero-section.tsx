// "use client"

// import { Button } from "@/components/ui/button"
// import { useEffect, useState } from "react"

// interface HeroProps {
//   hero: {
//     tagline: string
//     title: string
//     subtitle: string
//   } | null
// }

// export function HeroSection({ hero }: HeroProps) {
//   const [offsetY, setOffsetY] = useState(0)

//   useEffect(() => {
//     const handleScroll = () => setOffsetY(window.scrollY)
//     window.addEventListener("scroll", handleScroll)
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [])

//   return (
//     <section className="relative min-h-screen flex items-center overflow-hidden snap-start">

//       {/* VIDEO BACKGROUND */}
//       <div
//         className="absolute inset-0 z-0"
//         style={{ transform: `translateY(${offsetY * 0.3}px)` }}
//       >
//         <video
//           autoPlay
//           muted
//           loop
//           playsInline
//           className="w-full h-full object-cover"
//         >
//           <source src="/videos/hero.mp4" type="video/mp4" />
//         </video>

//         {/* Cinematic overlay */}
//         <div className="absolute inset-0 bg-black/60" />
//         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
//       </div>

//       {/* FLOATING LIGHT PARTICLES */}
//       <div className="absolute inset-0 z-0 pointer-events-none">
//         <div className="particles" />
//       </div>

//       {/* CONTENT */}
//       <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
//         <div className="animate-fadeUp">
//           <p className="text-white/70 uppercase tracking-[0.4em] text-sm mb-6">
//             {hero?.tagline}
//           </p>

//           <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white leading-tight mb-8">
//             {hero?.title}
//           </h1>

//           <p className="text-white/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
//             {hero?.subtitle}
//           </p>

//           <a
//             href="https://youtube.com/YOUR_CHANNEL"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Button
//               size="lg"
//               className="bg-white text-black hover:bg-white/90 px-10 py-6 rounded-md shadow-xl hover:scale-105 transition-all"
//             >
//               Watch Latest Sermon
//             </Button>
//           </a>
//         </div>
//       </div>

//       {/* SCROLL INDICATOR */}
//       <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60 animate-bounce">
//         ↓
//       </div>

//       {/* STYLE */}
//       <style jsx>{`
//         .animate-fadeUp {
//           animation: fadeUp 1.4s ease-out forwards;
//           opacity: 0;
//         }

//         @keyframes fadeUp {
//           from {
//             transform: translateY(40px);
//             opacity: 0;
//           }
//           to {
//             transform: translateY(0);
//             opacity: 1;
//           }
//         }

//         .particles {
//           width: 100%;
//           height: 100%;
//           background-image: radial-gradient(
//               rgba(255, 255, 255, 0.2) 1px,
//               transparent 1px
//             ),
//             radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px);
//           background-size: 80px 80px;
//           animation: moveParticles 40s linear infinite;
//           opacity: 0.3;
//         }

//         @keyframes moveParticles {
//           from {
//             transform: translateY(0);
//           }
//           to {
//             transform: translateY(-200px);
//           }
//         }
//       `}</style>
//     </section>
//   )
// }

"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

interface HeroProps {
  hero: {
    tagline: string
    title: string
    subtitle: string
  } | null
}

export function HeroSection({ hero }: HeroProps) {
  const [offsetY, setOffsetY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden snap-start">

      {/* VIDEO BACKGROUND */}
      <div
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${offsetY * 0.3}px)` }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Soft Overlay (NOT too dark) */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* FLOATING LIGHT PARTICLES */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="particles" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="animate-fadeUp">
          <p className="text-white/80 uppercase tracking-[0.4em] text-sm mb-6">
            {hero?.tagline}
          </p>

          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white leading-tight mb-8 drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
            {hero?.title}
          </h1>

          <p className="text-white/90 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            {hero?.subtitle}
          </p>

          <a
            href="https://youtube.com/YOUR_CHANNEL"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              className="bg-white text-black hover:bg-white/90 px-10 py-6 rounded-md shadow-xl hover:scale-105 transition-all"
            >
              Watch Latest Sermon
            </Button>
          </a>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/70 animate-bounce">
        ↓
      </div>

      {/* STYLE */}
      <style jsx>{`
        .animate-fadeUp {
          animation: fadeUp 1.4s ease-out forwards;
          opacity: 0;
        }

        @keyframes fadeUp {
          from {
            transform: translateY(40px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .particles {
          width: 100%;
          height: 100%;
          background-image: radial-gradient(
              rgba(255, 255, 255, 0.2) 1px,
              transparent 1px
            ),
            radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px);
          background-size: 80px 80px;
          animation: moveParticles 40s linear infinite;
          opacity: 0.3;
        }

        @keyframes moveParticles {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-200px);
          }
        }
      `}</style>
    </section>
  )
}
