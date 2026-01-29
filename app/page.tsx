import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ServiceTimes } from "@/components/service-times"
import { AboutSection } from "@/components/about-section"
import { MinistriesSection } from "@/components/ministries-section"
import { EventsSection } from "@/components/events-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
// import { supabase } from "@/lib/supabase"
import { getSupabase } from "@/lib/supabase"
import { FloatingWhatsApp } from "@/components/floating-whatsapp"

export default async function Home() {
  const supabase = getSupabase()
  // ===== FETCH HERO =====
  const { data: heroData, error: heroError } = await supabase
    .from("hero")
    .select("*")
    .single()

  if (heroError) {
    console.log("Hero error:", heroError)
  }

  // ===== FETCH EVENTS =====
  const { data: eventsData, error: eventsError } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: true })
    .limit(3)

  if (eventsError) {
    console.log("Events error:", eventsError)
  }

  // ===== FETCH SERVICES =====
const { data: servicesData, error: servicesError } = await supabase
  .from("services")
  .select("*")
  .order("created_at", { ascending: true })

if (servicesError) {
  console.log("Services error:", servicesError)
}

// ===== FETCH MINISTRIES =====
const { data: ministriesData } = await supabase
  .from("ministries")
  .select("*")
  .order("created_at", { ascending: true })

  // return (
  //   <main>
  //     <Header />
  //     <HeroSection hero={heroData} />
  //     <ServiceTimes services={servicesData || []} />
  //     {/* <ServiceTimes/> */}
  //     <AboutSection />
  //     <MinistriesSection ministries={ministriesData || []} />
  //     {/* <MinistriesSection /> */}
  //     <EventsSection events={eventsData || []} />
  //     <ContactSection />
  //     <Footer />
  //   </main>
  // )
  return (
  <main className="h-screen overflow-y-scroll snap-y snap-proximity scroll-smooth">
    <div className="snap-start">
      <Header />
      <HeroSection hero={heroData} />
    </div>

    <div className="snap-start">
      <AboutSection />
    </div>

    <div className="snap-start">
      <ServiceTimes services={servicesData || []} />
    </div>

    <div className="snap-start">
      <MinistriesSection ministries={ministriesData || []} />
    </div>

    <div className="snap-start">
      <EventsSection events={eventsData || []} />
    </div>

    <div className="snap-start">
      <ContactSection />
    </div>

    <div className="snap-start">
      <Footer />
    </div>
  <FloatingWhatsApp />
  </main>
)
}
