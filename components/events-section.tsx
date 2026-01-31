interface EventsProps {
  events: {
    id: number
    title: string
    description: string
    date: string
    time?: string   // ← pastikan ada ini
    image_url?: string
  }[]
}


export function EventsSection({ events }: EventsProps) {
  return (
    <section
      id="events"
      className="py-24 scroll-mt-28 bg-background"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold">
            Upcoming Events
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {events.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >

              {item.image_url && (
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              )}

              <div className="p-6 relative">

                {/* TIME BADGE */}
                {item.time && (
                  <span className="absolute top-6 right-6 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                    {item.time}
                  </span>
                )}

                {/* DATE */}
                <p className="text-sm text-primary font-medium mb-2">
                  {new Date(item.date).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>

                <h3 className="text-xl font-semibold mb-3">
                  {item.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  )
}



// beda tampilan

// interface EventsProps {
//   events: {
//     id: number
//     title: string
//     description: string
//     date: string
//     time?: string
//     image_url?: string
//   }[]
// }

// export function EventsSection({ events }: EventsProps) {
//   return (
//     <section
//       id="events"
//       className="py-20 bg-background"
//     >
//       <div className="max-w-7xl mx-auto px-6">

//         {/* SECTION TITLE */}
//         <div className="text-center mb-16">
//            <h2 className="text-4xl md:text-5xl font-serif font-bold">
//              Upcoming Events
//            </h2>
//          </div>

//         {/* EVENTS GRID */}
//         <div className="grid md:grid-cols-3 gap-8">

//           {events.map((item) => (
//             <div
//               key={item.id}
//               className="rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white"
//             >

//               {/* ===== HEADER STRIP ===== */}
//               <div className="flex justify-between items-center px-5 py-4 bg-primary text-white">

//                 <h3 className="text-sm font-semibold truncate">
//                   {item.title}
//                 </h3>

//                 {item.time && (
//                   <span className="text-sm font-medium">
//                     {item.time}
//                   </span>
//                 )}

//               </div>

//               {/* ===== POSTER IMAGE ===== */}
//               {item.image_url ? (
//                 <div className="h-[320px] overflow-hidden">
//                   <img
//                     src={item.image_url}
//                     alt={item.title}
//                     className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
//                   />
//                 </div>
//               ) : (
//                 <div className="h-[320px] flex items-center justify-center bg-muted text-muted-foreground">
//                   No Poster Available
//                 </div>
//               )}

//             </div>
//           ))}

//         </div>
//       </div>
//     </section>
//   )
// }
