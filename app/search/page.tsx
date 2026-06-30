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
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold">
        Letters for "{q}"
      </h1>

      {letters && letters.length > 0 ? (
        <div className="space-y-6">
          {letters.map((letter) => (
            <div
              key={letter.id}
              className="rounded-2xl border bg-white p-6 shadow"
            >
              <h2 className="text-2xl font-semibold">
                {letter.title}
              </h2>

              <p className="mt-3 text-gray-600">
                {letter.content.substring(0, 180)}
                {letter.content.length > 180 ? "..." : ""}
              </p>

              <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                <span>
                  <strong>To:</strong> {letter.recipient}
                </span>

                <span>
                  <strong>From:</strong> {letter.sender}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border p-10 text-center shadow">
          <h2 className="text-2xl font-semibold">
            No letters found ❤️
          </h2>

          <p className="mt-2 text-gray-500">
            Be the first person to write to <strong>{q}</strong>.
          </p>
        </div>
      )}

      {error && (
        <p className="mt-6 text-center text-red-500">
          {error.message}
        </p>
      )}
    </main>
  )
}