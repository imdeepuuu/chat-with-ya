"use server";

import { createClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";

export async function approveLetter(id: string) {
  try {
    console.log("Approve called with:", id)

    const supabase = await createClient()

    const { data, error } = await supabase
      .from("letters")
      .update({ status: "approved" })
      .eq("id", id)
      .select()

    console.log("Update result:", data)

    if (error) {
      console.error("Supabase error:", error)
      throw error
    }

    revalidatePath("/admin")
    revalidatePath("/")
  } catch (err) {
    console.error("approveLetter crashed:", err)
    throw err
  }
}

export async function rejectLetter(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("letters")
    .update({ status: "rejected" })
    .eq("id", id)
    .select();

  console.log("Reject Result:", data);
  console.log("Reject Error:", error);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
}