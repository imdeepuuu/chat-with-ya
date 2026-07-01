import type { LetterState, Photo } from "./write-letter"
import LetterLayout from "./LetterLayout"

export function LetterPreview({
  state,
  photos,
}: {
  state: LetterState
  photos: Photo[]
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <span className="font-heading text-base font-semibold text-primary">
          Live Preview
        </span>

        <span className="flex items-center gap-1.5 text-xs text-foreground/50">
          <span className="size-2 animate-pulse rounded-full bg-primary" />
          Updates as you write
        </span>
      </div>

      <p className="text-red-500">
        Writing Style: {state.writingStyle}
      </p>

      <LetterLayout
        recipient={state.recipient}
        sender={state.sender}
        title={state.title}
        content={state.content}
        moodId={state.mood}
        paperId={state.paper}
        colorId={state.color}
        writingStyle={state.writingStyle}
        photos={photos}
      />
    </div>
  )
}