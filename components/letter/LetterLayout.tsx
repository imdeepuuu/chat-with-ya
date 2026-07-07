import { Heart } from "lucide-react"
import { MOODS, PAPERS, LETTER_COLORS } from "./constants"

interface LetterLayoutProps {
  recipient: string
  sender: string
  title: string
  content: string
  moodId: string
  paperId: string
  colorId: string
  writingStyle: "classic" | "handwritten" | "elegant"
  createdAt: string
  photos?: {
    id: string
    name: string
    url: string
  }[]
}

export default function LetterLayout({
  recipient,
  sender,
  title,
  content,
  moodId,
  paperId,
  colorId,
  writingStyle,
  createdAt,
  photos = [],
}: LetterLayoutProps) {
  // Keep these until we reconnect paper/color.
  const paper = PAPERS.find((p) => p.id === paperId) ?? PAPERS[0]

  const color =
   LETTER_COLORS.find((c) => c.id === colorId) ?? LETTER_COLORS[0]


  const mood = MOODS.find((m) => m.id === moodId)

  const titleClass =
  writingStyle === "handwritten"
    ? "font-script text-4xl font-normal"
    : writingStyle === "elegant"
      ? "font-serif text-4xl font-semibold"
      : "font-heading text-3xl font-semibold"

const bodyClass =
  writingStyle === "handwritten"
    ? "font-script text-2xl leading-10"
    : writingStyle === "elegant"
      ? "font-serif text-xl leading-9"
      : "text-xl leading-8"

const signatureClass =
  writingStyle === "handwritten"
    ? "font-script text-4xl"
    : writingStyle === "elegant"
      ? "font-serif text-3xl italic"
      : "font-script text-3xl"
      

  return (
    <div className="space-y-3">
      <div
        className="relative mx-auto max-w-5xl overflow-hidden rounded-[1.75rem] p-8 shadow-[0_28px_70px_-30px_rgba(190,80,130,0.6)] ring-1 ring-black/5"
        style={{ background: paper.surface }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `linear-gradient(165deg, ${color.tint}, transparent 60%)`,
          }}
        />

        <div className="relative flex flex-col gap-4">

          {/* Header */}
          <div className="flex items-start justify-between">

            <div>

              {mood && (
                <span
                  className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium"
                  style={{
                    backgroundColor: `${mood.swatch}33`,
                    color: "#7a3a52",
                  }}
                >
                  💖 {mood.label}
                </span>
              )}

              <p className="text-sm text-[#9a6b7c]">
                Dear{" "}
                <span className="font-medium text-[#7a3a52]">
                  {recipient || "someone special"}
                </span>
                ,
              </p>

            </div>

            <div className="flex flex-col items-end gap-3">

              <span className="text-sm text-[#9a6b7c]">
                {(() => {
                  

                  const date =
                   createdAt && !isNaN(new Date(createdAt).getTime())
                    ? new Date(createdAt)
                    : new Date()
                  return new Intl.DateTimeFormat("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }).format(date)
                })()}      


              </span>

              <span
                className="grid size-10 place-items-center rounded-md border-2 border-dashed"
                style={{
                  borderColor: color.color,
                  backgroundColor: `${color.color}22`,
                }}
              >
                <Heart
                  className="size-5"
                  style={{ color: color.color }}
                  fill="currentColor"
                />
              </span>

            </div>

          </div>
          <div className="my-2 h-px bg-rose-100" />

          {/* Title */}
          {title && (
            <h3 className={`mt-1 mb-2 text-[#5c2738] ${titleClass}`}>
              {title}
            </h3>
          )}

          {/* Content */}
          <p
            className={`mt-2 whitespace-pre-wrap text-[#4f2c39] ${bodyClass}`}
              
          >
            {content ||
              "Your words will bloom here as you write them, just the way you mean them."}
          </p>

          {/* Photos */}
          {photos.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {photos.map((photo) => (
                <img
                  key={photo.id}
                  src={photo.url}
                  alt={photo.name}
                  className="size-20 rounded-lg object-cover shadow"
                />
              ))}
            </div>
          )}

          {/* Signature */}
          <div className="pt-2 text-right">
            <p className="text-sm text-[#9a6b7c]">
              With love,
            </p>

            <p
              className={`text-[#7a3a52] ${signatureClass}`}
            >
              {sender || "Me"}
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}