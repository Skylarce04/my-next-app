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

        <div className="grid md:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
            key={event.id}
            className="relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300"
>

              {event.image_url && (
                <div className="relative h-56">
                  <img
                    src={event.image_url}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-6 relative">

  {/* 🔥 TIME BADGE DI KANAN ATAS */}
  {event.time && (
    <span className="absolute top-6 right-6 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
      {event.time}
    </span>
  )}

  {/* DATE */}
  <p className="text-sm text-primary font-medium mb-2">
    {new Date(event.date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })}
  </p>

  <h3 className="text-xl font-semibold mb-3">
    {event.title}
  </h3>

  <p className="text-muted-foreground text-sm leading-relaxed">
    {event.description}
  </p>
</div>

            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
