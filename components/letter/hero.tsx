import { Mail, Heart } from "lucide-react"

export function Hero() {
  return (
    <section className="animate-fade-rise relative mx-auto max-w-3xl px-6 pb-4 pt-14 text-center sm:pt-20">
      

      <h1 className="text-balance font-heading text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">
        Write from Your Heart
      </h1>

      <p className="mx-auto mt-4 max-w-md text-pretty text-base leading-relaxed text-foreground/70 sm:text-lg">
        Some words are never spoken. Let them be written.
      </p>

      <p className="font-script mt-3 text-xl text-primary/80">
        A quiet place for the things you mean the most.
      </p>
    </section>
  )
}
