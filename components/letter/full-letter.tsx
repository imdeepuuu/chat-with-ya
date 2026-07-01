"use client"

interface FullLetterProps {
  title: string
  recipient: string
  sender: string
  content: string
  mood: string
  createdAt: string
}

export default function FullLetter({
  title,
  recipient,
  sender,
  content,
  mood,
  createdAt,
}: FullLetterProps) {
  function copyLink() {
    navigator.clipboard.writeText(window.location.href)
    alert("✅ Link copied!")
  }

  return (
    <div className="mx-auto max-w-4xl rounded-[40px] border border-rose-100 bg-white p-12 shadow-2xl">

      <div className="mb-10 flex items-center justify-between">

        <span className="rounded-full bg-rose-100 px-5 py-2 text-sm font-semibold text-rose-700">
          💖 {mood}
        </span>

        <div className="flex items-center gap-3">

          <span className="text-sm text-gray-400">
            {new Date(createdAt).toLocaleDateString()}
          </span>

          <button
            onClick={copyLink}
            className="rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-600"
          >
            📤 Share
          </button>

        </div>

      </div>

      <h1 className="text-5xl font-bold text-[#3B2A2A]">
        {title}
      </h1>

      <p className="mt-10 text-3xl text-[#6E4759]">
        Dear <strong>{recipient}</strong>,
      </p>

      <div className="mt-10 whitespace-pre-wrap text-xl leading-10 text-[#5B4A4A]">
        {content}
      </div>

      <div className="mt-20 text-right">

        <p className="text-2xl text-[#9A6E83]">
          With love,
        </p>

        <h2 className="mt-2 text-4xl font-bold text-[#6E4759]">
          {sender}
        </h2>

      </div>

    </div>
  )
}