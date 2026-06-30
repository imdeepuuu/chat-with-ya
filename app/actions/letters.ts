"use server";

import { createClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";

export async function approveLetter(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("letters")
    .update({ status: "approved" })
    .eq("id", id)
    .select();

  console.log("Approve Result:", data);
  console.log("Approve Error:", error);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
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