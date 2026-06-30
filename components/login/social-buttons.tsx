"use client"

import { createClient } from "@/lib/supabase-browser"

import type { ComponentType, SVGProps } from "react"
import { FacebookIcon, GoogleIcon, XIcon } from "./brand-icons"

type Provider = {
  name: string
  label: string
  Icon: ComponentType<SVGProps<SVGSVGElement>>
}

const providers: Provider[] = [
  { name: "Google", label: "Continue with Google", Icon: GoogleIcon },
  { name: "Facebook", label: "Continue with Facebook", Icon: FacebookIcon },
  { name: "X", label: "Continue with X", Icon: XIcon },
]

export function SocialButtons() {
  const supabase = createClient()

  async function signInWithGoogle() {
    console.log("Google login clicked")

     const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/auth/callback?next=/write",
        
      },
    })
    
    console.log("OAuth data:", data)
    console.log("OAuth error:", error)

      
  }

  async function signInWithFacebook() {
    await supabase.auth.signInWithOAuth({
      provider: "facebook",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
      },
    })
  }

  return (
    <div className="flex flex-col gap-3">
      {providers.map(({ name, label, Icon }) => (
        <button
          key={name}
          type="button"
          onClick={() => {
            if (name === "Google") {
              signInWithGoogle()
            } else if (name === "Facebook") {
              signInWithFacebook()
            }
          }}
          aria-label={label}
          className="group relative flex w-full items-center justify-center gap-3 rounded-xl border border-border/80 bg-card/60 px-4 py-3 text-sm font-medium text-foreground shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-0"
        >
          <Icon className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-110" />
          <span>{label}</span>
        </button>
      ))}
    </div>
  )
}