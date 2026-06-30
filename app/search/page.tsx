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
    <main className="min-h-screen bg-[#FFF9F6] px-4 py-12">
      <div className="mx-auto max-w-5xl">

        <h1 className="mb-2 text-4xl font-bold">
          Letters for "{q}"
        </h1>

        <p className="mb-8 text-gray-500">
          Click a letter to read the full message.
        </p>

        {letters && letters.length > 0 ? (
          <div className="space-y-6">
            {letters.map((letter) => (
              <Link
                key={letter.id}
                href={`/letter/${letter.id}`}
                className="block rounded-3xl border border-rose-100 bg-white p-8 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
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