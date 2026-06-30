import { createClient } from "@/lib/supabase-server";

export default async function AdminPage() {
  const supabase = await createClient();

  const { data: letters, error } = await supabase
    .from("letters")
    .select("*")
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="p-10 text-red-600">
        Error: {error.message}
      </div>
    );
  }

  return (
    <main className="max-w-5xl mx-auto p-10">
      <h1 className="text-4xl font-bold mb-8">
        📩 Pending Letters
      </h1>

      {letters?.length === 0 ? (
        <div className="text-gray-500">
          No pending letters.
        </div>
      ) : (
        <div className="space-y-6">
          {letters.map((letter) => (
            <div
              key={letter.id}
              className="rounded-2xl border p-6 shadow-sm"
            >
              <h2 className="text-2xl font-bold">
                {letter.title}
              </h2>

              <p className="mt-2 text-gray-500">
                To: {letter.recipient}
              </p>

              <p className="text-gray-500">
                From: {letter.sender}
              </p>

              <p className="mt-2">
                Mood: {letter.mood}
              </p>

              <div className="mt-5 whitespace-pre-wrap">
                {letter.content}
              </div>

              <div className="flex gap-4 mt-8">
                <button className="bg-green-600 text-white px-5 py-2 rounded-xl">
                  ✅ Accept
                </button>

                <button className="bg-red-600 text-white px-5 py-2 rounded-xl">
                  ❌ Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}