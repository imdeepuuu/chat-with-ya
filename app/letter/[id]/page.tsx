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
  console.log("LETTER FROM DB");
  console.log(letter);
  console.log("created_at =", letter.created_at);

  return (
    <main className="min-h-screen bg-[#FFF9F6] px-6 py-16">
      <FullLetter
        title={letter.title}
        recipient={letter.recipient}
        sender={letter.sender}
        content={letter.content}
        mood={letter.mood}
        paper={letter.paper}
        color={letter.color}
        writingStyle={letter.writing_style}
        photos={letter.photos ?? []}
        createdAt={letter.created_at}
      />
    </main>
  )
}