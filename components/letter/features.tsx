import { Lock, Heart, Sparkles, Quote } from "lucide-react"

const FEATURES = [
  {
    icon: Lock,
    title: "Safe & Private",
    body: "Your identity is protected. Only your words are shared.",
  },
  {
    icon: Heart,
    title: "Spread Love",
    body: "Your letter might be the thing that touches someone's heart.",
  },
  {
    icon: Sparkles,
    title: "Make it Beautiful",
    body: "Add colors, photos and stationery to make it truly yours.",
  },
]

export function Features() {
  return (
    <section className="mx-auto mt-6 max-w-6xl px-4">
      <div className="grid gap-3 rounded-[2rem] border border-border/70 bg-card/70 p-4 backdrop-blur-sm sm:grid-cols-3 sm:p-5">
        {FEATURES.map((f) => {
          const Icon = f.icon
          return (
            <div key={f.title} className="flex items-start gap-3 rounded-2xl p-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary">
                <Icon className="size-5" />
              </span>
              <div>
                <h3 className="font-heading text-base font-semibold text-foreground">{f.title}</h3>
                <p className="mt-0.5 text-sm leading-relaxed text-foreground/60">{f.body}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export function ClosingQuote() {
  return (
    <section className="mx-auto mb-20 mt-8 max-w-3xl px-6 text-center">
      <Quote className="mx-auto mb-3 size-7 text-primary/50" />
      <p className="text-pretty font-heading text-xl italic leading-relaxed text-foreground/80 sm:text-2xl">
        Sometimes, the bravest thing you can do is say what&apos;s in your heart.
      </p>
      <div className="mt-4 flex justify-center">
        <Heart className="size-5 text-primary" fill="currentColor" />
      </div>
    </section>
  )
}
