"use client"

import { Mail, Search, Heart } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function Hero() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  return (
    <section className="relative px-4 pt-16 pb-10 md:pt-24">
      {/* soft ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-72 max-w-2xl rounded-full bg-rose-soft/50 blur-3xl"
      />

      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <div className="animate-gentle-float animate-float-up mb-7 flex size-20 items-center justify-center rounded-3xl bg-card shadow-[0_18px_50px_-20px_rgba(244,114,182,0.6)] ring-1 ring-rose-soft/70">
          <span className="relative flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <Mail className="size-6" />
            <Heart className="absolute -right-1.5 -top-1.5 size-5 fill-rose text-rose drop-shadow-sm" />
          </span>
        </div>

        <h1
          className="animate-float-up font-heading text-5xl font-semibold tracking-tight text-balance text-foreground md:text-7xl"
          style={{ animationDelay: "80ms" }}
        >
          Chat With Ya
        </h1>

        <p
          className="animate-float-up mt-4 max-w-md font-script text-2xl text-secondary-foreground text-pretty md:text-3xl"
          style={{ animationDelay: "160ms" }}
        >
          Some words are never spoken. Let them be written.
        </p>

        <p
          className="animate-float-up mt-3 max-w-lg text-base leading-relaxed text-muted-foreground"
          style={{ animationDelay: "220ms" }}
        >
          Write a public letter to anyone — no account needed for the person you
          are writing to. Just the words your heart has been holding.
        </p>

        {/* search bar */}
        <div
          className="animate-float-up mt-9 w-full max-w-xl"
          style={{ animationDelay: "300ms" }}
        >
          <div className="glass-card flex items-center gap-3 rounded-full border border-rose-soft/70 py-2 pl-5 pr-2 shadow-[0_14px_40px_-18px_rgba(244,114,182,0.55)] transition-shadow focus-within:shadow-[0_18px_50px_-16px_rgba(244,114,182,0.7)]">
            <Search className="size-5 shrink-0 text-muted-foreground" />
            <input
             type="search"
             placeholder="Search someone's name..."
             aria-label="Search someone's name"
             value={search}
             onChange={(e) => setSearch(e.target.value)}
             onKeyDown={(e) => {
              if (e.key === "Enter" && search.trim()) {
                router.push(`/search?q=${encodeURIComponent(search.trim())}`)
              }
            }}
             className="w-full bg-transparent py-2 text-base text-foreground placeholder:text-muted-foreground/80 focus:outline-none"
            />     
            <button
             type="button"
             onClick={() => {
              if (search.trim()) {
                router.push(`/search?q=${encodeURIComponent(search.trim())}`)
              }
            }}
            className="hidden shrink-0 rounded-full bg-secondary px-5 py-2.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-accent sm:block"
            >
              Search
            </button>    
          </div>
        </div>

        {/* primary CTA */}
        <button
          type="button"
          onClick={() => router.push("/login")}
          className="animate-float-up mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-medium text-primary-foreground shadow-[0_16px_40px_-14px_rgba(244,114,182,0.8)] transition-all hover:-translate-y-0.5 hover:shadow-[0_22px_50px_-14px_rgba(244,114,182,0.9)] active:translate-y-0"
          style={{ animationDelay: "360ms" }}
        >
          <span className="text-lg leading-none">💌</span>
          Write a Letter
        </button>
      </div>
    </section>
  )
}
