import { supabase } from "./supabase"

export async function getLetters() {
  const { data, error } = await supabase
    .from("letters")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error(error)
    return []
  }

  return data
}