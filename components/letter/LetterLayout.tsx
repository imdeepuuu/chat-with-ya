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
  photos = [],
}: LetterLayoutProps) {
    const paper = {
        surface: "#ffffff",
        ruled: false,
    }

    const color = {
        color: "#f472b6",
        tint: "#fde7f3",
    }    

  const mood = MOODS.find((m) => m.id === moodId)
  const MoodIcon = mood?.icon

  return (
    <div className="space-y-3">
      <div
        className="relative overflow-hidden rounded-[1.75rem] p-7 shadow-[0_28px_70px_-30px_rgba(190,80,130,0.6)] ring-1 ring-black/5"
        style={{ background: paper.surface }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `linear-gradient(165deg, ${color.tint}, transparent 60%)`,
          }}
        />

        {paper.ruled && (
          <div
            className="pointer-events-none absolute inset-x-7 bottom-7 top-24"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 31px, rgba(120,140,180,0.25) 32px)",
            }}
          />
        )}

        <div className="relative">

          <div className="mb-4 flex items-start justify-between gap-3">

            <div className="min-w-0">

              {mood && (
                <span
                  className="mb-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
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

          {title && (
            <h3 className="mb-3 font-heading text-2xl font-semibold text-[#5c2738]">
              {title}
            </h3>
          )}

          <p className="whitespace-pre-wrap font-script text-xl leading-8 text-[#4f2c39]">
            {content ||
              "Your words will bloom here as you write them, just the way you mean them."}
          </p>

          {photos.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2.5">
              {photos.map((photo) => (
                <img
                  key={photo.id}
                  src={photo.url}
                  alt={photo.name}
                  className="size-20 rounded-lg object-cover shadow-sm ring-1 ring-black/5"
                />
              ))}
            </div>
          )}

          <div className="mt-6 text-right">
            <p className="text-sm text-[#9a6b7c]">
              With love,
            </p>

            <p className="font-script text-2xl text-[#7a3a52]">
              {sender || "Me"}
            </p>
          </div>

        </div>

      </div>

    </div>
  )
}