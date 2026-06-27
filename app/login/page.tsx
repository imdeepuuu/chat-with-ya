import { LoginCard } from "@/components/login/login-card"

export default function Page() {
  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-background px-4 py-10">
      {/* layered soft gradients */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/40 via-background to-secondary"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-24 h-[28rem] w-[28rem] rounded-full bg-accent/50 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:radial-gradient(theme(colors.foreground)_1px,transparent_1px)] [background-size:22px_22px]"
      />

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <LoginCard />
      </div>
    </main>
  )
}
