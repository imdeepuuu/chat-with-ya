import { createClient } from "./supabase-server"

export async function getLetters() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    console.log("No authenticated user")
    return []
  }

  const { data, error } = await supabase
    .from("letters")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (error) return []
  return data ?? []

  if (error) {
    return []
  }

  return data ?? []
}