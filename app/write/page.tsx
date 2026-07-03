import { Suspense } from "react"
import SiteNav from "@/components/site-nav"
import { WriteLetter } from "@/components/letter/write-letter"

export default function WritePage() {
  return (
    <>
      <SiteNav />

      <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
        <WriteLetter />
      </Suspense>
    </>
  )
}