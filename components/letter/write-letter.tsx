"use client"

import { createClient } from "@/lib/supabase-browser"

const supabase = createClient()
import { useCallback, useEffect, useRef, useState } from "react"
import type { MoodId, PaperId } from "./constants"
import { SiteHeader } from "./site-header"
import { Hero } from "./hero"
import { Decorations } from "./decorations"
import { LetterEditor } from "./letter-editor"
import { LetterPreview } from "./letter-preview"
import { PublishBar } from "./publish-bar"
import { Features, ClosingQuote } from "./features"

export type LetterState = {
  recipient: string
  sender: string
  title: string
  content: string
  mood: MoodId
  paper: PaperId
  color: string
}

export type Photo = {
  id: string
  url: string
  name: string
}

const MAX_PHOTOS = 5

export function WriteLetter() {
  const [state, setState] = useState<LetterState>({
    recipient: "",
    sender: "",
    title: "",
    content: "",
    mood: "love",
    paper: "plain",
    color: "pink",
  })
  const [photos, setPhotos] = useState<Photo[]>([])
  const [toast, setToast] = useState<string | null>(null)
  const objectUrls = useRef<string[]>([])
  useEffect(() => {
    async function createProfileIfNeeded() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const { data: profile } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", user.id)
      .single()

      if (profile) return
      await supabase.from("profiles").insert({
        id: user.id,
        full_name: user.user_metadata.full_name,
        email: user.email,
        avatar_url: user.user_metadata.avatar_url,
      })
    }
    
    createProfileIfNeeded()
  }, [])  

  const set = useCallback(
    <K extends keyof LetterState>(key: K, value: LetterState[K]) => {
      setState((prev) => ({ ...prev, [key]: value }))
    },
    [],
  )

  const onAddPhotos = useCallback((files: FileList | null) => {
    if (!files) return
    setPhotos((prev) => {
      const room = MAX_PHOTOS - prev.length
      const next = Array.from(files)
        .slice(0, Math.max(0, room))
        .map((file) => {
          const url = URL.createObjectURL(file)
          objectUrls.current.push(url)
          return { id: `${file.name}-${crypto.randomUUID()}`, url, name: file.name }
        })
      return [...prev, ...next]
    })
  }, [])

  const onRemovePhoto = useCallback((id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id))
  }, [])

  // Revoke object URLs on unmount to avoid memory leaks.
  useEffect(() => {
    return () => {
      objectUrls.current.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [])

  const onPublish = useCallback(async () => {
    if (!state.recipient || !state.title || !state.content) {
      setToast("Please fill in Recipient, Title and Your Letter.")
      window.setTimeout(() => setToast(null), 3000)
      return
    }
    const {
      data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setToast("Please login first.")
        return
      }  
    const { error } = await supabase.from("letters").insert({
      user_id: user.id,
      recipient: state.recipient,
      sender: state.sender,
      title: state.title,
      content: state.content,
       mood: state.mood,
       paper: state.paper,
       color: state.color,
       status: "pending",
      })
      
      if (error) {
        console.error(error)
        setToast("Something went wrong while submitting your letter.")
        } else {
          setToast("💌 Your letter has been submitted for review!")
         }
          window.setTimeout(() => setToast(null), 4000)
          }, [state])  

  return (
    <div className="relative min-h-screen pt-4">
      <Decorations />

      <div className="relative z-10">
        <SiteHeader />
        
        <Hero />

        <main className="mx-auto max-w-6xl px-4 pb-4">
          <div className="grid items-start gap-6 lg:grid-cols-[1.35fr_1fr]">
            <div className="animate-fade-rise">
              <LetterEditor
                state={state}
                set={set}
                photos={photos}
                onAddPhotos={onAddPhotos}
                onRemovePhoto={onRemovePhoto}
              />
            </div>

            <div className="lg:sticky lg:top-24">
              <LetterPreview state={state} photos={photos} />
            </div>
          </div>
        </main>

        <PublishBar onPublish={onPublish} />
        <Features />
        <ClosingQuote />
      </div>

      {/* confirmation toast */}
      <div
        aria-live="polite"
        className={`fixed inset-x-0 bottom-6 z-50 flex justify-center px-4 transition-all duration-500 ${
          toast ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        {toast ? (
          <div className="rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-foreground shadow-[0_20px_50px_-20px_rgba(190,80,130,0.7)]">
            {toast}
          </div>
        ) : null}
      </div>
    </div>
  )
}
