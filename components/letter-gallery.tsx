import { Heart } from "lucide-react"

type Letter = {
  to: string
  from: string
  date: string
  body: string
  tint: string
}

const letters: Letter[] = [
  {
    to: "Mom",
    from: "Your daughter",
    date: "Spring, 2026",
    body: "I never told you how much your quiet sacrifices meant to me. The lunches packed before sunrise, the worries you hid behind your smile. I see all of it now. Thank you for loving me before I knew how to love you back.",
    tint: "from-rose-soft/40",
  },
  {
    to: "An old friend",
    from: "Someone who still remembers",
    date: "A late evening",
    body: "We drifted the way rivers do — slowly, without a single goodbye. I hope your life is full and soft. If you ever read this, know that the laughter we shared still lives somewhere inside me.",
    tint: "from-amber-100/50",
  },
  {
    to: "The one I lost",
    from: "Still here",
    date: "Whenever I miss you",
    body: "There are words I rehearsed a thousand times and never got to say. So I leave them here, in the open air, hoping they find you wherever you are. I am okay. I promise I am trying to be okay.",
    tint: "from-rose-100/50",
  },
]

function LetterCard({ letter, index }: { letter: Letter; index: number }) {
  return (
    <article
      className="animate-float-up group relative"
      style={{ animationDelay: `${420 + index * 120}ms` }}
    >
      {/* paper stack accent */}
      <div className="absolute inset-x-3 -bottom-2 h-full rounded-[1.6rem] bg-card/60 shadow-sm ring-1 ring-rose-soft/40 transition-transform group-hover:translate-y-1" />

      <div
        className={`paper-texture relative flex h-full flex-col rounded-[1.6rem] border border-rose-soft/60 bg-gradient-to-br ${letter.tint} to-card p-7 shadow-[0_20px_50px_-24px_rgba(244,114,182,0.5)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_28px_60px_-22px_rgba(244,114,182,0.65)]`}
      >
        <header className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              To
            </p>
            <p className="font-heading text-2xl font-semibold text-foreground">
              {letter.to}
            </p>
          </div>
          <span className="flex size-9 items-center justify-center rounded-full bg-card/80 text-rose ring-1 ring-rose-soft/60">
            <Heart className="size-4 fill-current" />
          </span>
        </header>

        <p className="font-script text-xl leading-relaxed text-secondary-foreground text-pretty">
          {letter.body}
        </p>

        <footer className="mt-6 flex items-center justify-between border-t border-rose-soft/50 pt-4 text-sm">
          <span className="italic text-muted-foreground">{letter.from}</span>
          <span className="text-muted-foreground/80">{letter.date}</span>
        </footer>
      </div>
    </article>
  )
}

export function LetterGallery() {
  return (
    <section id="saved" className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="font-script text-2xl text-rose">letters in the open</p>
          <h2 className="mt-1 font-heading text-4xl font-semibold tracking-tight text-balance text-foreground md:text-5xl">
            Words left for someone to find
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
            Real letters, written by real people. Each one a small act of
            courage, set gently into the world.
          </p>
        </div>

        <div className="grid gap-7 md:grid-cols-3">
          {letters.map((letter, index) => (
            <LetterCard key={letter.to} letter={letter} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
