// import { createClient } from "@supabase/supabase-js"

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// export const supabase = createClient(supabaseUrl, supabaseAnonKey)
import { createClient } from "@supabase/supabase-js"

export function getSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // ⛔ Jangan throw error saat build
  if (!supabaseUrl || !supabaseAnonKey) {
    // Return dummy client saat build supaya tidak crash
    return createClient("https://placeholder.supabase.co", "placeholder-key")
  }

  return createClient(supabaseUrl, supabaseAnonKey)
}
