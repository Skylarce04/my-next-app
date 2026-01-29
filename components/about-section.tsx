// import Image from "next/image"
// import { Button } from "@/components/ui/button"

// export function AboutSection() {
//   return (
//     <section id="about" className="py-32 bg-gradient-to-b from-muted/40 to-background">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
//           <div className="relative">
//             <div className="aspect-[4/3] relative rounded-lg overflow-hidden">
//               <Image
//                 src="/images/worship.jpg"
//                 alt="Community worship"
//                 fill
//                 className="object-cover"
//               />
//             </div>
//             <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary rounded-lg hidden lg:flex items-center justify-center">
//               <div className="text-center text-primary-foreground">
//                 <span className="block text-3xl font-serif font-bold">25+</span>
//                 <span className="text-sm">Years of Faith</span>
//               </div>
//             </div>
//           </div>

//           <div>
//             <p className="text-primary text-sm uppercase tracking-widest mb-3 font-medium">
//               Our Story
//             </p>
//             <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-6 text-balance">
//               Dedicated to Faith, Community & Growth
//             </h2>
//             <div className="space-y-4 text-muted-foreground leading-relaxed">
//               <p>
//                 Grace Community Church began in 2001 with a simple vision: to create a welcoming 
//                 place where people from all walks of life could encounter God and find genuine community.
//               </p>
//               <p>
//                 Today, we continue that mission through authentic worship, relevant biblical teaching, 
//                 and meaningful connections. Whether you are exploring faith for the first time or 
//                 looking to deepen your spiritual journey, you will find a home here.
//               </p>
//             </div>

//             <div className="grid grid-cols-3 gap-6 my-8">
//               <div>
//                 <span className="block text-3xl font-serif font-bold text-foreground">500+</span>
//                 <span className="text-sm text-muted-foreground">Weekly Attendees</span>
//               </div>
//               <div>
//                 <span className="block text-3xl font-serif font-bold text-foreground">30+</span>
//                 <span className="text-sm text-muted-foreground">Small Groups</span>
//               </div>
//               <div>
//                 <span className="block text-3xl font-serif font-bold text-foreground">15</span>
//                 <span className="text-sm text-muted-foreground">Ministry Teams</span>
//               </div>
//             </div>

//             <Button size="lg">Learn More About Us</Button>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

import Image from "next/image"
import { Button } from "@/components/ui/button"

export function AboutSection() {
  return (
    <section
      id="about"
      className="py-32 bg-gradient-to-b from-muted/40 to-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* IMAGE SIDE */}
          <div className="relative">
            <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/worship.jpg"
                alt="Community worship"
                fill
                className="object-cover"
              />
            </div>

            {/* FLOATING BADGE */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary rounded-2xl hidden lg:flex items-center justify-center shadow-lg">
              <div className="text-center text-primary-foreground">
                <span className="block text-3xl font-serif font-bold">
                  50+
                </span>
                <span className="text-sm tracking-wide">
                  Years of Faith
                </span>
              </div>
            </div>
          </div>

          {/* TEXT SIDE */}
          <div>
            <p className="text-primary text-sm uppercase tracking-widest mb-3 font-medium">
              Our Story
            </p>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-6 leading-tight">
              Dedicated to Faith, Community & Growth
            </h2>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                GPdI Karmel Cipinang began in 1984 with a simple vision:
                to create a welcoming place where people from all walks of
                life could encounter God and find genuine community.
              </p>
              <p>
                Today, we continue that mission through authentic worship,
                relevant biblical teaching, and meaningful connections.
                Whether you are exploring faith for the first time or
                looking to deepen your spiritual journey, you will find a
                home here.
              </p>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-6 my-10">
              <div>
                <span className="block text-3xl font-serif font-bold text-foreground">
                  200+
                </span>
                <span className="text-sm text-muted-foreground">
                  Weekly Attendees
                </span>
              </div>
              <div>
                <span className="block text-3xl font-serif font-bold text-foreground">
                  5+
                </span>
                <span className="text-sm text-muted-foreground">
                  Small Groups
                </span>
              </div>
              <div>
                <span className="block text-3xl font-serif font-bold text-foreground">
                  2+
                </span>
                <span className="text-sm text-muted-foreground">
                  Ministry Teams
                </span>
              </div>
            </div>

            <Button size="lg">
              Learn More About Us
            </Button>
          </div>

        </div>

        {/* PREMIUM DIVIDER */}
        <div className="mt-24 border-t border-border/30" />

      </div>
    </section>
  )
}
