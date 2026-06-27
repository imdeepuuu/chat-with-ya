import { Heart } from "lucide-react"
import { MOODS, PAPERS, LETTER_COLORS } from "./constants"
import type { LetterState, Photo } from "./write-letter"

export function LetterPreview({
  state,
  photos,
}: {
  state: LetterState
  photos: Photo[]
}) {
  const paper = PAPERS.find((p) => p.id === state.paper) ?? PAPERS[0]
  const color = LETTER_COLORS.find((c) => c.id === state.color) ?? LETTER_COLORS[0]
  const mood = MOODS.find((m) => m.id === state.mood)
  const MoodIcon = mood?.icon

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <span className="font-heading text-base font-semibold text-primary">Live Preview</span>
        <span className="flex items-center gap-1.5 text-xs text-foreground/50">
          <span className="size-2 animate-pulse rounded-full bg-primary" />
          Updates as you write
        </span>
      </div>

      <div
        className="relative overflow-hidden rounded-[1.75rem] p-7 shadow-[0_28px_70px_-30px_rgba(190,80,130,0.6)] ring-1 ring-black/5"
        style={{ background: paper.surface }}
      >
        {/* color tint wash */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: `linear-gradient(165deg, ${color.tint}, transparent 60%)` }}
        />
        {paper.ruled ? (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-7 bottom-7 top-24"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 31px, rgba(120,140,180,0.25) 32px)",
            }}
          />
        ) : null}

        <div className="relative">
          {/* header row */}
          <div className="mb-4 flex items-start justify-between gap-3">
            <div className="min-w-0">
              {mood && MoodIcon ? (
                <span
                  className="mb-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
                  style={{ backgroundColor: `${mood.swatch}33`, color: "#7a3a52" }}
                >
                  <MoodIcon className="size-3.5" style={{ color: mood.swatch }} />
                  {mood.label}
                </span>
              ) : null}
              <p className="text-sm text-[#9a6b7c]">
                Dear{" "}
                <span className="font-medium text-[#7a3a52]">
                  {state.recipient || "someone special"}
                </span>
                ,
              </p>
            </div>
            <span
              className="grid size-10 shrink-0 place-items-center rounded-md border-2 border-dashed"
              style={{ borderColor: `${color.color}`, backgroundColor: `${color.color}22` }}
            >
              <Heart className="size-5" style={{ color: color.color }} fill="currentColor" />
            </span>
          </div>

          {state.title ? (
            <h3 className="mb-3 text-balance font-heading text-2xl font-semibold text-[#5c2738]">
              {state.title}
            </h3>
          ) : null}

          <p className="whitespace-pre-wrap font-script text-xl leading-8 text-[#4f2c39]">
            {state.content || "Your words will bloom here as you write them, just the way you mean them."}
          </p>

          {photos.length > 0 ? (
            <div className="mt-5 flex flex-wrap gap-2.5">
              {photos.map((photo) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={photo.id}
                  src={photo.url || "/placeholder.svg"}
                  alt={photo.name}
                  className="size-20 rounded-lg object-cover shadow-sm ring-1 ring-black/5"
                />
              ))}
            </div>
          ) : null}

          <div className="mt-6 text-right">
            <p className="text-sm text-[#9a6b7c]">With love,</p>
            <p className="font-script text-2xl text-[#7a3a52]">
              {state.sender || "Me"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
