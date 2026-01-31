"use client"
export const dynamic = "force-dynamic"
import { useEffect, useState } from "react"
import { getSupabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useRef } from "react"

export default function AdminPage() {
  const supabase = getSupabase() 
  const router = useRouter()
  const { toast } = useToast()

  const [activeTab, setActiveTab] = useState("hero")
  const [loading, setLoading] = useState(false)

  // ================= HERO =================
  const [tagline, setTagline] = useState("")
  const [title, setTitle] = useState("")
  const [subtitle, setSubtitle] = useState("")

  const [heroFile, setHeroFile] = useState<File | null>(null)
  const [heroPreview, setHeroPreview] = useState<string | null>(null)

  const [currentMediaUrl, setCurrentMediaUrl] = useState<string | null>(null)
  const [currentMediaType, setCurrentMediaType] = useState<string>("image")



  // ================= EVENTS =================
  const [eventTitle, setEventTitle] = useState("")
  const [eventDescription, setEventDescription] = useState("")
  const [eventDate, setEventDate] = useState("")
  const [eventTime, setEventTime] = useState("")
  const [events, setEvents] = useState<any[]>([])
  const [editingEventId, setEditingEventId] = useState<number | null>(null)
  const [eventImageFile, setEventImageFile] = useState<File | null>(null)
  const [eventImagePreview, setEventImagePreview] = useState<string | null>(null) 
  const [eventInputKey, setEventInputKey] = useState(Date.now())

  // ================= SERVICES =================
  const [serviceTitle, setServiceTitle] = useState("")
  const [serviceDay, setServiceDay] = useState("")
  const [serviceTime, setServiceTime] = useState("")
  const [serviceDescription, setServiceDescription] = useState("")
  const [services, setServices] = useState<any[]>([])
  const [editingServiceId, setEditingServiceId] = useState<number | null>(null)

  // ================= MINISTRIES =================
  const [ministryTitle, setMinistryTitle] = useState("")
  const [ministryDescription, setMinistryDescription] = useState("")
  const [ministries, setMinistries] = useState<any[]>([])
  const [editingMinistryId, setEditingMinistryId] = useState<number | null>(null)
  const [ministryImageFile, setMinistryImageFile] = useState<File | null>(null)
  const [ministryImagePreview, setMinistryImagePreview] = useState<string | null>(null)
  const ministryFileInputRef = useRef<HTMLInputElement | null>(null)

  // ================= INIT =================
  useEffect(() => {
    checkUser()
    fetchHero()
    fetchEvents()
    fetchServices()
    fetchMinistries()
  }, [])

  const checkUser = async () => {
    const { data } = await supabase.auth.getUser()
    if (!data.user) router.push("/login")
  }

  // ================= FETCH =================
  const fetchHero = async () => {
  const { data } = await supabase.from("hero").select("*").single()

  if (data) {
    setTagline(data.tagline || "")
    setTitle(data.title || "")
    setSubtitle(data.subtitle || "")

    setCurrentMediaUrl(data.media_url || null)
    setCurrentMediaType(data.media_type || "image")

    setHeroPreview(data.media_url || null)
    }
  }

  const fetchEvents = async () => {
    const { data } = await supabase.from("events").select("*").order("date")
    if (data) setEvents(data)
  }

  const fetchServices = async () => {
    const { data } = await supabase.from("services").select("*")
    if (data) setServices(data)
  }

  const fetchMinistries = async () => {
    const { data } = await supabase.from("ministries").select("*")
    if (data) setMinistries(data)
  }

  // ================= HERO SAVE =================
  const handleSaveHero = async () => {
  setLoading(true)
  console.log("Selected file:", heroFile)
  console.log("File type:", heroFile?.type)
  let mediaUrl = currentMediaUrl
  let mediaType = currentMediaType

  if (heroFile) {
    const isVideo = heroFile.type.startsWith("video/")
    const bucket = isVideo ? "hero-videos" : "hero-images"
    const fileName = `hero-${Date.now()}`

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(fileName, heroFile)

    if (uploadError) {
      toast({
        title: "Upload gagal",
        description: uploadError.message,
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName)

    mediaUrl = data.publicUrl
    mediaType = isVideo ? "video" : "image"
  }

  const { error } = await supabase
    .from("hero")
    .update({
      tagline,
      title,
      subtitle,
      media_url: mediaUrl,
      media_type: mediaType,
    })
    .eq("id", 1)

  setLoading(false)

  if (error) {
    toast({
      title: "Database Error",
      description: error.message,
      variant: "destructive",
    })
    return
  }

  toast({
    title: "Hero Updated",
    description: "Hero berhasil diperbarui.",
  })

  setHeroFile(null)
  setHeroPreview(mediaUrl)

  fetchHero()
}



  // ================= EVENTS =================
  const handleAddEvent = async () => {
  if (!eventTitle || !eventDate) {
    toast({
      title: "Field belum lengkap",
      description: "Title dan Date wajib diisi.",
      variant: "destructive",
    })
    return
  }

  let imageUrl: string | null = null
  let error

  // ===== UPLOAD IMAGE JIKA ADA =====
  if (eventImageFile) {
    const fileName = `event-${Date.now()}`

    const { error: uploadError } = await supabase.storage
      .from("event-images")
      .upload(fileName, eventImageFile)

    if (uploadError) {
      toast({
        title: "Upload gagal",
        description: uploadError.message,
        variant: "destructive",
      })
      return
    }

    const { data } = supabase.storage
      .from("event-images")
      .getPublicUrl(fileName)

    imageUrl = data.publicUrl
  }

  // ===== MODE EDIT =====
  if (editingEventId) {
    const res = await supabase
      .from("events")
      .update({
        title: eventTitle,
        description: eventDescription,
        date: eventDate,
        time: eventTime,
        ...(imageUrl && { image_url: imageUrl }),
      })
      .eq("id", editingEventId)

    error = res.error
  } 
  // ===== MODE INSERT =====
  else {
    const res = await supabase.from("events").insert([
      {
        title: eventTitle,
        description: eventDescription,
        date: eventDate,
        time: eventTime,
        image_url: imageUrl,
      },
    ])

    error = res.error
  }

  if (error) {
    toast({
      title: "Database Error",
      description: error.message,
      variant: "destructive",
    })
    return
  }

  toast({
    title: editingEventId ? "Event Updated" : "Event Added",
    description: "Berhasil disimpan.",
  })

  setEditingEventId(null)
  setEventTitle("")
  setEventDescription("")
  setEventDate("")
  setEventTime("")
  setEventImageFile(null)
  setEventImagePreview(null)
  setEventInputKey(Date.now())

  fetchEvents()
}


  const handleDeleteEvent = async (id: number) => {
    const { error } = await supabase.from("events").delete().eq("id", id)

    if (error) {
      toast({
        title: "Delete gagal",
        description: error.message,
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Event Deleted",
      variant: "destructive",
    })

    fetchEvents()
  }

  // ================= SERVICES =================
  const handleAddService = async () => {
    if (!serviceTitle || !serviceDay || !serviceTime) {
      toast({
        title: "Field belum lengkap",
        description: "Title, Day dan Time wajib diisi.",
        variant: "destructive",
      })
      return
    }

    let error

    if (editingServiceId) {
      const res = await supabase
        .from("services")
        .update({
          title: serviceTitle,
          day: serviceDay,
          time: serviceTime,
          description: serviceDescription,
        })
        .eq("id", editingServiceId)

      error = res.error
    } else {
      const res = await supabase.from("services").insert([
        {
          title: serviceTitle,
          day: serviceDay,
          time: serviceTime,
          description: serviceDescription,
        },
      ])

      error = res.error
    }

    if (error) {
      toast({
        title: "Database Error",
        description: error.message,
        variant: "destructive",
      })
      return
    }

    toast({
      title: editingServiceId ? "Service Updated" : "Service Added",
    })

    setEditingServiceId(null)
    setServiceTitle("")
    setServiceDay("")
    setServiceTime("")
    setServiceDescription("")
    fetchServices()
  }

  const handleDeleteService = async (id: number) => {
    const { error } = await supabase.from("services").delete().eq("id", id)

    if (error) {
      toast({
        title: "Delete gagal",
        description: error.message,
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Service Deleted",
      variant: "destructive",
    })

    fetchServices()
  }

  // ================= MINISTRIES =================
 const handleAddMinistry = async () => {
  if (!ministryTitle || !ministryDescription) {
    toast({
      title: "Field belum lengkap",
      description: "Title dan Description wajib diisi.",
      variant: "destructive",
    })
    return
  }

  let imageUrl: string | null = null

  // ===== UPLOAD IMAGE JIKA ADA =====
  if (ministryImageFile) {
    const fileName = `ministry-${Date.now()}`

    const { error: uploadError } = await supabase.storage
      .from("ministries-images")
      .upload(fileName, ministryImageFile)

    if (uploadError) {
      toast({
        title: "Upload gagal",
        description: uploadError.message,
        variant: "destructive",
      })
      return
    }

    const { data } = supabase.storage
      .from("ministries-images")
      .getPublicUrl(fileName)

    imageUrl = data.publicUrl
  }

  const slug = ministryTitle
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")

  let error

  // ===== UPDATE =====
  if (editingMinistryId) {
    const res = await supabase
      .from("ministries")
      .update({
        title: ministryTitle,
        description: ministryDescription,
        slug,
        ...(imageUrl && { image_url: imageUrl }),
      })
      .eq("id", editingMinistryId)

    error = res.error
  } else {
    // ===== INSERT =====
    const res = await supabase.from("ministries").insert([
      {
        title: ministryTitle,
        description: ministryDescription,
        slug,
        image_url: imageUrl,
      },
    ])

    error = res.error
  }

  if (error) {
    toast({
      title: "Database Error",
      description: error.message,
      variant: "destructive",
    })
    return
  }

  toast({
    title: editingMinistryId
      ? "Ministry Updated"
      : "Ministry Added",
    description: "Berhasil disimpan.",
  })

  setEditingMinistryId(null)
  setMinistryTitle("")
  setMinistryDescription("")
  setMinistryImageFile(null)
  setMinistryImagePreview(null)
  if (ministryFileInputRef.current) {
  ministryFileInputRef.current.value = ""
}

  fetchMinistries()
}


  const handleDeleteMinistry = async (id: number) => {
    const { error } = await supabase.from("ministries").delete().eq("id", id)

    if (error) {
      toast({
        title: "Delete gagal",
        description: error.message,
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Ministry Deleted",
      variant: "destructive",
    })

    fetchMinistries()
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  return (
    <div className="min-h-screen flex bg-muted/40">
      {/* SIDEBAR */}
      <div className="w-64 bg-white border-r p-6 space-y-4">
        <h2 className="font-serif text-xl font-bold mb-6">Admin Panel</h2>

        {["hero", "events", "services", "ministries"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`block w-full text-left px-4 py-2 rounded-md capitalize ${
              activeTab === tab
                ? "bg-primary text-white"
                : "hover:bg-muted"
            }`}
          >
            {tab}
          </button>
        ))}

        <button
          onClick={handleLogout}
          className="mt-10 text-sm text-red-500"
        >
          Logout
        </button>
      </div>

      {/* CONTENT */}
      <div className="flex-1 p-10 space-y-6">
        {activeTab === "hero" && (
          <Card title="Hero Section">
            <InputField label="Tagline" value={tagline} setValue={setTagline} />
            <InputField label="Title" value={title} setValue={setTitle} />
            <TextareaField label="Subtitle" value={subtitle} setValue={setSubtitle} />
          
            {/* ===== UPLOAD IMAGE ===== */}
            <div className="space-y-2">
            <label className="text-sm font-medium">
              Upload Media (Image / Video)
            </label>
            
            <input
              type="file"
              accept="image/*,video/*"
              onChange={(e) => {
                if (e.target.files) {
                  const file = e.target.files[0]
                  setHeroFile(file)
                  setHeroPreview(URL.createObjectURL(file))
                }
              }}
              className="w-full border rounded-md p-2"
            />

          {heroPreview && (
            currentMediaType === "video" || heroFile?.type.startsWith("video/") ? (
              <video
                src={heroPreview}
                controls
                className="mt-4 w-full max-h-60 object-cover rounded-md"
              />
            ) : (
              <img
                src={heroPreview}
                className="mt-4 w-full h-40 object-cover rounded-md"
              />
            )
          )}
          </div>

          <button
            onClick={handleSaveHero}
            className="px-4 py-2 bg-primary text-white rounded-md hover:opacity-90 transition"
          >
            {loading ? (
              <Loader2 className="animate-spin w-4 h-4" />
            ) : (
              "Save"
            )}
          </button>
                    </Card>
                  )}

        {activeTab === "events" && (
                    <Card title="Events">
            <InputField
              label="Title"
              value={eventTitle}
              setValue={setEventTitle}
            />

            <TextareaField
              label="Description"
              value={eventDescription}
              setValue={setEventDescription}
            />

            <InputField
              label="Date"
              value={eventDate}
              setValue={setEventDate}
              type="date"
            />

            <InputField
              label="Time"
              value={eventTime}
              setValue={setEventTime}
            />

            {/* ===== UPLOAD IMAGE ===== */}
          <div className="space-y-2 mt-4">
            <label className="text-sm font-medium">Upload Poster</label>

            <input
              key={eventInputKey}
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files) {
                  const file = e.target.files[0]
                  setEventImageFile(file)
                  setEventImagePreview(URL.createObjectURL(file))
                }
              }}
              className="w-full border rounded-md p-2"
            />

            {eventImagePreview && (
              <div className="mt-4 space-y-2">
                <p className="text-sm text-muted-foreground">
                  Current Poster (leave empty if not changing)
                </p>

                <div className="w-64 h-40 rounded-lg overflow-hidden border">
                  <img
                    src={eventImagePreview}
                    alt="Poster Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>

    {/* ===== BUTTON AREA ===== */}
    <div className="flex gap-3 mt-4">
      <button
        type="button"
        onClick={handleAddEvent}
        className="px-4 py-2 bg-primary text-white rounded-md hover:opacity-90 transition"
      >
        {editingEventId ? "Update Event" : "Add Event"}
      </button>

      {editingEventId && (
        <button
          type="button"
          onClick={() => {
            setEditingEventId(null)
            setEventTitle("")
            setEventDescription("")
            setEventDate("")
            setEventTime("")
          }}
          className="px-4 py-2 border rounded-md hover:bg-muted transition"
        >
          Cancel
        </button>
      )}
    </div>

    {/* ===== LIST ===== */}
    <div className="space-y-3 mt-6">
      {events.map((e) => (
        <ListItem
          key={e.id}
          title={e.title}
          subtitle={`${e.date} ${e.time}`}
          onEdit={() => {
            setEventTitle(e.title)
            setEventDescription(e.description)
            setEventDate(e.date)
            setEventTime(e.time)
            setEditingEventId(e.id)
            setEventImagePreview(e.image_url || null)
            setEventImageFile(null)
          }}
          onDelete={() => handleDeleteEvent(e.id)}
        />
      ))}
    </div>
  </Card>
)}

        {activeTab === "services" && (
  <Card title="Services">
    <InputField
      label="Title"
      value={serviceTitle}
      setValue={setServiceTitle}
    />

    <InputField
      label="Day"
      value={serviceDay}
      setValue={setServiceDay}
    />

    <InputField
      label="Time"
      value={serviceTime}
      setValue={setServiceTime}
    />

    <TextareaField
      label="Description"
      value={serviceDescription}
      setValue={setServiceDescription}
    />

    {/* ===== BUTTON AREA ===== */}
    <div className="flex gap-3 mt-4">
      <button
        type="button"
        onClick={handleAddService}
        className="px-4 py-2 bg-primary text-white rounded-md hover:opacity-90 transition"
      >
        {editingServiceId ? "Update Service" : "Add Service"}
      </button>

      {editingServiceId && (
        <button
          type="button"
          onClick={() => {
            setEditingServiceId(null)
            setServiceTitle("")
            setServiceDay("")
            setServiceTime("")
            setServiceDescription("")
          }}
          className="px-4 py-2 border rounded-md hover:bg-muted transition"
        >
          Cancel
        </button>
      )}
    </div>

    {/* ===== LIST ===== */}
    <div className="space-y-3 mt-6">
      {services.map((s) => (
        <ListItem
          key={s.id}
          title={`${s.day} - ${s.title}`}
          subtitle={s.time}
          onEdit={() => {
            setServiceTitle(s.title)
            setServiceDay(s.day)
            setServiceTime(s.time)
            setServiceDescription(s.description)
            setEditingServiceId(s.id)
          }}
          onDelete={() => handleDeleteService(s.id)}
        />
      ))}
    </div>
  </Card>
)}

        {activeTab === "ministries" && (
  <Card title="Ministries">
    <InputField
      label="Title"
      value={ministryTitle}
      setValue={setMinistryTitle}
    />

    <TextareaField
      label="Description"
      value={ministryDescription}
      setValue={setMinistryDescription}
    />

    {/* ===== IMAGE UPLOAD ===== */}
    <div className="space-y-2">
      <label className="text-sm font-medium">Upload Image</label>

      <input
        ref={ministryFileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files) {
            const file = e.target.files[0]
            setMinistryImageFile(file)
            setMinistryImagePreview(URL.createObjectURL(file))
          }
        }}
        className="w-full border rounded-md p-2"
      />

      {ministryImagePreview && (
        <div className="mt-4">
          <img
            src={ministryImagePreview}
            className="w-full max-h-48 object-cover rounded-md"
          />
        </div>
      )}
    </div>

    

    {/* ===== BUTTONS ===== */}
    <div className="flex gap-3 mt-6">
  <button
    type="button"
    onClick={handleAddMinistry}
    className="px-4 py-2 bg-primary text-white rounded-md hover:opacity-90 transition"
  >
    {editingMinistryId ? "Update Ministry" : "Add Ministry"}
  </button>

  {editingMinistryId && (
    <button
      type="button"
      onClick={() => {
        setEditingMinistryId(null)
        setMinistryTitle("")
        setMinistryDescription("")
        setMinistryImageFile(null)
        setMinistryImagePreview(null)
      }}
      className="px-4 py-2 border rounded-md"
    >
      Cancel
    </button>
  )}
</div>

    {/* ===== LIST ===== */}
    <div className="space-y-3 mt-6">
      {ministries.map((m) => (
        <div
          key={m.id}
          className="border rounded-md p-4 flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">{m.title}</p>
            <p className="text-sm text-muted-foreground">{m.slug}</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                setMinistryTitle(m.title)
                setMinistryDescription(m.description)
                setMinistryImagePreview(m.image_url || null)
                setEditingMinistryId(m.id)
              }}
              className="text-sm px-3 py-1 bg-yellow-500 text-white rounded"
            >
              Edit
            </button>

            <button
              onClick={() => handleDeleteMinistry(m.id)}
              className="text-sm px-3 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  </Card>
)}
      </div>
    </div>
  )
}

/* ================= REUSABLE UI ================= */

function Card({ title, children }: any) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-8 space-y-6">
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </div>
  )
}

function InputField({ label, value, setValue, type = "text" }: any) {
  return (
    <div className="space-y-2">
      <label className="text-sm">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full border rounded-md p-3"
      />
    </div>
  )
}

function TextareaField({ label, value, setValue }: any) {
  return (
    <div className="space-y-2">
      <label className="text-sm">{label}</label>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full border rounded-md p-3"
      />
    </div>
  )
}

function ListItem({ title, subtitle, onEdit, onDelete }: any) {
  return (
    <div className="border rounded-md p-4 flex justify-between items-center">
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
      <div className="flex gap-2">
        <button onClick={onEdit} className="px-3 py-1 bg-yellow-500 text-white rounded text-sm">
          Edit
        </button>
        <button onClick={onDelete} className="px-3 py-1 bg-red-500 text-white rounded text-sm">
          Delete
        </button>
      </div>
    </div>
  )
}
