import Link from "next/link"
import { createClient } from "@/lib/supabase-server"

interface SearchPageProps {
  searchParams: Promise<{
    q?: string
  }>
}

export default async function SearchPage({
  searchParams,
}: SearchPageProps) {
  const { q } = await searchParams
  const supabase = await createClient()

  const { data: letters, error } = await supabase
    .from("letters")
    .select("*")
    .eq("status", "approved")
    .ilike("recipient", `%${q ?? ""}%`)
    .order("created_at", { ascending: false })

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FFF9F6] via-[#FFF7F8] to-[#FFFDFB] px-4 py-12">
      <div className="mx-auto max-w-5xl">

        <h1 className="text-5xl font-bold tracking-tight text-neutral-800">💌 Letters for <span className="text-rose-500">&quot;{q}&quot;</span></h1>

        <p className="mt-3 text-lg text-gray-500">Every letter carries a memory, a feeling, or words left unsaid.</p>

        {letters && letters.length > 0 && (<div className="mt-6 mb-8 inline-flex rounded-full bg-rose-100 px-4 py-2 text-sm font-semibold text-rose-700">{letters.length} {letters.length===1?"Letter":"Letters"} Found</div>)}

        {letters && letters.length > 0 ? (
          <div className="space-y-6">
            {letters.map((letter) => (
              <Link
                key={letter.id}
                href={`/letter/${letter.id}`}
                className="group relative block overflow-hidden rounded-[28px] border border-rose-100/80 bg-white/90 p-6 shadow-[0_10px_30px_rgba(244,114,182,0.12)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-rose-200 hover:shadow-[0_20px_45px_rgba(244,114,182,0.18)]"
              >
                <div className="flex items-center justify-between">

                  <span className="rounded-full bg-rose-100 px-3 py-1 text-sm font-medium text-rose-700">
                    💖 {letter.mood}
                  </span>

                  <span className="text-sm text-gray-400">
                    {new Date(letter.created_at).toLocaleDateString()}
                  </span>

                </div>

                <h2 className="mt-6 text-3xl font-bold">
                  {letter.title}
                </h2>

                <p className="mt-6 line-clamp-4 whitespace-pre-wrap leading-8 text-gray-700">
                  {letter.content}
                </p>

                <div className="mt-8 flex items-center justify-between border-t pt-5 text-sm text-gray-500">

                  <span>
                    <strong>To:</strong> {letter.recipient}
                  </span>

                  <span>
                    <strong>From:</strong> {letter.sender}
                  </span>

                </div>

                <div className="mt-6 text-right font-medium text-rose-600">
                  Read Letter →
                </div>

              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border bg-white p-12 text-center shadow-lg">
            <h2 className="text-3xl font-bold">
              No letters found ❤️
            </h2>

            <p className="mt-3 text-gray-500">
              Be the first person to write to <strong>{q}</strong>.
            </p>

            <Link
              href={`/write?recipient=${encodeURIComponent(q ?? "")}`}
              className="mt-8 inline-block rounded-full bg-rose-500 px-8 py-3 font-semibold text-white transition hover:bg-rose-600"
            >
              💌 Write to {q}
            </Link>
          </div>
        )}

        {error && (
          <p className="mt-8 text-center text-red-500">
            {error.message}
          </p>
        )}

      </div>
    </main>
  )
}