import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase-server"
import FullLetter from "@/components/letter/full-letter"

interface Props {
  params: Promise<{
    id: string
  }>
}

export default async function LetterPage({ params }: Props) {
  const { id } = await params

  const supabase = await createClient()

  const { data: letter } = await supabase
    .from("letters")
    .select("*")
    .eq("id", id)
    .eq("status", "approved")
    .single()

  if (!letter) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-[#FFF9F6] px-6 py-16">
      <FullLetter
       title={letter.title}
       recipient={letter.recipient}
       sender={letter.sender}
       content={letter.content}
       mood={letter.mood}
       createdAt={letter.created_at}
      /> 
    </main>
  )
}