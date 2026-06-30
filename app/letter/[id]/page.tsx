import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase-server"

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
    <main className="min-h-screen bg-[#FFF9F6] px-6 py-12">
      <div className="mx-auto max-w-3xl rounded-3xl border border-rose-100 bg-white p-10 shadow-xl">

        <span className="rounded-full bg-rose-100 px-4 py-2 text-sm font-medium text-rose-700">
          💖 {letter.mood}
        </span>

        <h1 className="mt-8 text-4xl font-bold">
          {letter.title}
        </h1>

        <p className="mt-8 text-xl">
          Dear <strong>{letter.recipient}</strong>,
        </p>

        <div className="mt-8 whitespace-pre-wrap leading-9 text-gray-700">
          {letter.content}
        </div>

        <div className="mt-12 text-right">
          <p className="text-gray-500">
            With love,
          </p>

          <h2 className="mt-2 text-2xl font-semibold">
            {letter.sender}
          </h2>
        </div>

      </div>
    </main>
  )
}