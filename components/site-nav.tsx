"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { createClient } from "@/lib/supabase-browser"

const supabase = createClient()
import { Heart, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const links = [
  { label: "Home", href: "/" },
  { label: "Write", href: "/login" },
  { label: "My Space", href: "/login" },
  { label: "Profile", href: "/login" },
]

export default function SiteNav() {
  
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [fullName, setFullName] = useState("")
  const [avatar, setAvatar] = useState("")
  useEffect(() => {
    async function loadUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      
      if (!session) return

      setFullName(session.user.user_metadata.full_name ?? "")
      setAvatar(session.user.user_metadata.avatar_url ?? "")

      
    }
    
    loadUser()
  }, [])

  async function handleNavigation(label: string) {
  if (label === "Home") {
    router.push("/")
    return
  }

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    router.push("/login")
    return
  }

  switch (label) {
    case "Write":
      router.push("/write")
      break
    case "My Space":
      router.push("/dashboard")
      break
    case "Profile":
      router.push("/profile")
      break
  }
}

  return (
    <header className="sticky top-0 z-50 px-4 pt-4">
      <nav className="glass-card mx-auto flex max-w-5xl items-center justify-between rounded-full border border-rose-soft/60 px-5 py-3 shadow-[0_8px_30px_-12px_rgba(244,114,182,0.35)]">
        <a href="#" className="flex items-center gap-2">
        <Image
        src="/logo.png"
        alt="Chat With Ya Logo"
        width={180}
        height={50}
        className="rounded-full"
        />

          <span className="font-heading text-xl font-semibold tracking-tight text-foreground">
            Chat With Ya
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.label}>
              <button
                onClick={() => handleNavigation(link.label)}
                className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="flex size-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-accent md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <div
        className={cn(
          "glass-card mx-auto mt-2 max-w-5xl overflow-hidden rounded-3xl border border-rose-soft/60 transition-all md:hidden",
          open ? "max-h-80 opacity-100" : "pointer-events-none max-h-0 border-transparent opacity-0",
        )}
      >
        <ul className="flex flex-col gap-1 p-3">
          {links.map((link) => (
            <li key={link.label}>
              <button
                onClick={() => {
                setOpen(false)
                 handleNavigation(link.label)
                 }}
                  className="block w-full rounded-2xl px-4 py-3 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
