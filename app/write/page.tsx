import { Suspense } from "react"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase-server"
import SiteNav from "@/components/site-nav"
import { WriteLetter } from "@/components/letter/write-letter"

export default async function WritePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login?next=/write")
  }

  return (
    <>
      <SiteNav />

      <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
        <WriteLetter />
      </Suspense>
    </>
  )
}