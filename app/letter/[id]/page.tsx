interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function LetterPage({ params }: PageProps) {
    const { id } = await params
  return (
    <main className="min-h-screen bg-[#FFF8F2] py-16">
      <div className="mx-auto max-w-4xl px-6">

        <div className="rounded-[40px] border border-pink-100 bg-white p-12 shadow-[0_20px_60px_rgba(255,182,193,0.15)]">

          <div className="mb-10">
            <span className="rounded-full bg-pink-100 px-4 py-2 text-sm font-semibold text-pink-600">
              💌 Letter
            </span>

            <h1 className="mt-6 text-5xl font-bold text-[#3E2C41]">
              Letter #{id}
            </h1>

            <p className="mt-3 text-[#756070]">
              This page will display the complete letter.
            </p>
          </div>

          <div className="space-y-6">

            <div>
              <p className="text-sm uppercase text-[#B28A96]">
                Recipient
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                Mom
              </h2>
            </div>

            <div>
              <p className="text-sm uppercase text-[#B28A96]">
                Title
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                Thanks Mom
              </h2>
            </div>

            <div>
              <p className="text-sm uppercase text-[#B28A96]">
                Letter
              </p>

              <div className="mt-3 rounded-3xl bg-[#FFF8F2] p-8 leading-9 text-[#4D3E4B]">
                This is where the complete letter will appear.
              </div>
            </div>

            <div className="pt-8">
              <span className="rounded-full bg-amber-100 px-5 py-2 font-semibold text-amber-700">
                🟡 Pending Review
              </span>
            </div>

          </div>

        </div>

      </div>
    </main>
  )
}