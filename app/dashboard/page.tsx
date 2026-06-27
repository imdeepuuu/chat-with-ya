import { getLetters } from "@/lib/get-letters"

export default async function Dashboard() {
  const letters = await getLetters()

  return (
    <main className="min-h-screen bg-[#FFF8F2] text-[#3E2C41]">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#FFE7EF,transparent_45%),radial-gradient(circle_at_bottom_right,#FFF3D8,transparent_40%),radial-gradient(circle_at_center,#FFF8F2,transparent_70%)]" />

        <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-14">
          <div className="text-center">
            <img
              src="/Logo.png"
              alt="Chat With Ya"
              className="mx-auto h-24 w-24 object-contain"
            />

            <h1 className="mt-5 text-6xl font-bold">
              📜 My Space
            </h1>

            <p className="mt-5 text-2xl font-medium">
              Welcome back 👋
            </p>

            <p className="mt-2 text-lg text-[#756070]">
              Every letter you've written has a home here.
            </p>

            <p className="mt-2 text-[#C87A42]">
              Your memories, thoughts and dreams deserve a beautiful place.
            </p>

            <button className="mt-8 rounded-full bg-[#F8B6C8] px-8 py-3 text-lg font-semibold text-white shadow-lg transition hover:scale-105 hover:bg-[#F49AB5]">
              💌 Write New Letter
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}

      <section className="mx-auto -mt-4 grid max-w-6xl grid-cols-2 gap-6 px-6 md:grid-cols-4">
        <div className="rounded-[32px] bg-[#FFFCFA] p-7 shadow-[0_15px_40px_rgba(255,182,193,0.18)] transition hover:-translate-y-2">
          <div className="text-4xl">💌</div>

          <p className="mt-4 text-sm uppercase tracking-wide text-[#B28A96]">
            Letters Written
          </p>

          <h2 className="mt-2 text-5xl font-bold">
            {letters.length}
          </h2>

          <p className="mt-3 text-sm text-[#A18B97]">
            Your memories live here.
          </p>
        </div>

        <div className="rounded-[32px] bg-[#FFFCFA] p-7 shadow-[0_15px_40px_rgba(255,182,193,0.18)] transition hover:-translate-y-2">
          <div className="text-4xl">⏳</div>

          <p className="mt-4 text-sm uppercase tracking-wide text-[#B28A96]">
            Pending Review
          </p>

          <h2 className="mt-2 text-5xl font-bold text-amber-500">
            {letters.filter((l: any) => l.status === "pending").length}
          </h2>

          <p className="mt-3 text-sm text-[#A18B97]">
            Waiting to be published.
          </p>
        </div>

        <div className="rounded-[32px] bg-[#FFFCFA] p-7 shadow-[0_15px_40px_rgba(255,182,193,0.18)] transition hover:-translate-y-2">
          <div className="text-4xl">❤️</div>

          <p className="mt-4 text-sm uppercase tracking-wide text-[#B28A96]">
            Published
          </p>

          <h2 className="mt-2 text-5xl font-bold text-pink-500">
            {letters.filter((l: any) => l.status === "approved").length}
          </h2>

          <p className="mt-3 text-sm text-[#A18B97]">
            Shared with the world.
          </p>
        </div>

        <div className="rounded-[32px] bg-[#FFFCFA] p-7 shadow-[0_15px_40px_rgba(255,182,193,0.18)] transition hover:-translate-y-2">
          <div className="text-4xl">📝</div>

          <p className="mt-4 text-sm uppercase tracking-wide text-[#B28A96]">
            Drafts
          </p>

          <h2 className="mt-2 text-5xl font-bold">
            0
          </h2>

          <p className="mt-3 text-sm text-[#A18B97]">
            Finish them anytime.
          </p>
        </div>
      </section>

      {/* Letters */}

      <section className="mx-auto mt-16 max-w-6xl px-6 pb-20">
        <div className="mb-8">
          <h2 className="text-4xl font-bold">
            Recent Letters
          </h2>

          <p className="mt-2 text-[#756070]">
            Your latest memories and emotions.
          </p>
        </div>

        {letters.length === 0 ? (
          <div className="rounded-[36px] border border-pink-100 bg-[#FFFCFA] p-10 shadow-[0_20px_50px_rgba(255,182,193,0.15)]">
            <div className="text-6xl">💌</div>

            <h3 className="mt-6 text-3xl font-bold">
              No letters yet
            </h3>

            <p className="mt-4 text-lg text-[#756070]">
              Write your first beautiful letter.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {letters.map((letter: any) => (
              <div
                key={letter.id}
                className="rounded-[30px] border border-pink-100 bg-[#FFFCFA] p-8 shadow-[0_20px_40px_rgba(255,182,193,0.15)] transition hover:-translate-y-1"
              >
                <h3 className="text-3xl font-bold text-[#3E2C41]">
                  💌 {letter.title}
                </h3>

                <p className="mt-2 text-[#756070]">
                  To: {letter.recipient}
                </p>

                <p className="mt-4 line-clamp-3 text-[#5D4E59]">
                  {letter.content}
                </p>

                <div className="mt-6 inline-flex rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
                  {letter.status}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}