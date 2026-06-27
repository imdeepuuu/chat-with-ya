import SiteNav from "@/components/site-nav"
import { Hero } from "@/components/hero"
import { LetterGallery } from "@/components/letter-gallery"
import { Heart } from "lucide-react"

export default function Page() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      {/* ambient background blooms */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -left-32 top-1/4 -z-10 size-96 rounded-full bg-rose-soft/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -right-32 top-2/3 -z-10 size-96 rounded-full bg-rose-soft/25 blur-3xl"
      />

      <SiteNav />

      <main>
        <Hero />
        <LetterGallery />
      </main>

      <footer className="px-4 pb-12 pt-6">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 text-center">
          <span className="flex items-center gap-2 font-heading text-lg font-semibold text-foreground">
            <Heart className="size-4 fill-rose text-rose" />
            Chat With Ya
          </span>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Some words are never spoken. Let them be written — gently, openly,
            and with all the tenderness they deserve.
          </p>
          <p className="mt-2 text-xs text-muted-foreground/70">
            © {new Date().getFullYear()} Chat With Ya. Made with love.
          </p>
        </div>
      </footer>
    </div>
  )
}
