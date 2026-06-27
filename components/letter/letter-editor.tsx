"use client"

import { useRef } from "react"
import {
  User,
  Feather,
  Heart,
  Bold,
  Italic,
  Underline,
  Quote,
  ImagePlus,
  Smile,
  UploadCloud,
  X,
  Check,
} from "lucide-react"
import {
  MOODS,
  PAPERS,
  LETTER_COLORS,
  type MoodId,
  type PaperId,
} from "./constants"
import type { LetterState, Photo } from "./write-letter"

type Props = {
  state: LetterState
  set: <K extends keyof LetterState>(key: K, value: LetterState[K]) => void
  photos: Photo[]
  onAddPhotos: (files: FileList | null) => void
  onRemovePhoto: (id: string) => void
}

function Label({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <div className="mb-2 flex items-center gap-2">
      <span className="font-heading text-lg font-semibold text-primary">{children}</span>
      {hint ? <span className="text-sm text-foreground/50">{hint}</span> : null}
    </div>
  )
}

function SectionCard({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`rounded-[1.75rem] border border-border/70 bg-card/90 p-5 shadow-[0_20px_60px_-34px_rgba(190,80,130,0.55)] backdrop-blur-sm sm:p-6 ${className}`}
    >
      {children}
    </div>
  )
}

export function LetterEditor({
  state,
  set,
  photos,
  onAddPhotos,
  onRemovePhoto,
}: Props) {
  const fileRef = useRef<HTMLInputElement>(null)
  const wordCount = state.content.trim() ? state.content.trim().split(/\s+/).length : 0

  return (
    <div className="space-y-6">
      {/* ---- The stationery ---- */}
      <SectionCard className="relative overflow-hidden">
        {/* postage stamp */}
        <div className="absolute right-5 top-5 hidden rotate-3 sm:block">
          <div className="grid size-16 place-items-center rounded-md border-2 border-dashed border-primary/40 bg-secondary/60">
            <Heart className="size-7 text-primary" fill="currentColor" />
          </div>
        </div>

        <div className="space-y-5">
          <div className="max-w-[78%]">
            <Label hint="♡">To</Label>
            <div className="relative">
              <input
                value={state.recipient}
                onChange={(e) => set("recipient", e.target.value)}
                placeholder="Who is this letter for?"
                className="w-full rounded-2xl border border-border bg-background/60 px-4 py-3 pr-11 text-foreground outline-none transition-all placeholder:text-foreground/40 focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
              />
              <User className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-foreground/40" />
            </div>
          </div>

          <div>
            <Label hint="(Optional)">From</Label>
            <div className="relative">
              <input
                value={state.sender}
                onChange={(e) => set("sender", e.target.value)}
                placeholder="Your name (optional)"
                className="w-full rounded-2xl border border-border bg-background/60 px-4 py-3 pr-11 text-foreground outline-none transition-all placeholder:text-foreground/40 focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
              />
              <User className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-foreground/40" />
            </div>
          </div>

          <div>
            <Label>Title</Label>
            <div className="relative">
              <input
                value={state.title}
                onChange={(e) => set("title", e.target.value)}
                placeholder="Give your letter a title…"
                className="w-full rounded-2xl border border-border bg-background/60 px-4 py-3 pr-11 text-foreground outline-none transition-all placeholder:text-foreground/40 focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
              />
              <Feather className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-foreground/40" />
            </div>
          </div>

          {/* Mood */}
          <div>
            <Label>How does it feel?</Label>
            <div className="flex flex-wrap gap-2.5">
              {MOODS.map((mood) => {
                const active = state.mood === mood.id
                const Icon = mood.icon
                return (
                  <button
                    key={mood.id}
                    type="button"
                    onClick={() => set("mood", mood.id as MoodId)}
                    aria-pressed={active}
                    className={`group flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                      active
                        ? "border-transparent text-foreground shadow-sm"
                        : "border-border bg-background/50 text-foreground/70 hover:border-primary/40 hover:text-foreground"
                    }`}
                    style={
                      active
                        ? { backgroundColor: `${mood.swatch}40`, boxShadow: `inset 0 0 0 1.5px ${mood.swatch}` }
                        : undefined
                    }
                  >
                    <Icon className="size-4" style={{ color: mood.swatch }} />
                    {mood.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Letter body */}
          <div>
            <Label hint="♡">Your Letter</Label>
            <div className="overflow-hidden rounded-2xl border border-border bg-background/40 focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10">
              <div className="flex items-center gap-1 border-b border-border/70 bg-card/60 px-2 py-2">
                {[Bold, Italic, Underline].map((Icon, i) => (
                  <button
                    key={i}
                    type="button"
                    className="grid size-8 place-items-center rounded-lg text-foreground/55 transition-colors hover:bg-secondary/70 hover:text-primary"
                  >
                    <Icon className="size-4" />
                  </button>
                ))}
                <span className="mx-1 h-5 w-px bg-border" />
                {[Quote, ImagePlus, Smile].map((Icon, i) => (
                  <button
                    key={i}
                    type="button"
                    className="grid size-8 place-items-center rounded-lg text-foreground/55 transition-colors hover:bg-secondary/70 hover:text-primary"
                  >
                    <Icon className="size-4" />
                  </button>
                ))}
              </div>
              <textarea
                value={state.content}
                onChange={(e) => set("content", e.target.value)}
                placeholder="Write what's in your heart…"
                rows={8}
                className="paper-texture block w-full resize-y bg-transparent px-4 py-4 font-script text-xl leading-8 text-foreground outline-none placeholder:font-sans placeholder:text-base placeholder:text-foreground/40"
              />
              <div className="flex items-center justify-between border-t border-border/70 px-4 py-2 text-sm text-foreground/50">
                <span className="font-script text-base text-primary/70">
                  Your words can heal, inspire &amp; stay forever.
                </span>
                <span>{wordCount} words</span>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* ---- Paper style ---- */}
      <SectionCard>
        <Label hint="Set the mood of your page">Paper Style</Label>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {PAPERS.map((paper) => {
            const active = state.paper === paper.id
            return (
              <button
                key={paper.id}
                type="button"
                onClick={() => set("paper", paper.id as PaperId)}
                aria-pressed={active}
                className={`group rounded-2xl border p-2 text-left transition-all ${
                  active
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-border hover:border-primary/40"
                }`}
              >
                <div
                  className="mb-2 h-16 w-full rounded-xl ring-1 ring-black/5"
                  style={{ background: paper.preview }}
                />
                <p className="text-sm font-medium text-foreground">{paper.label}</p>
                <p className="text-xs text-foreground/50">{paper.description}</p>
              </button>
            )
          })}
        </div>
      </SectionCard>

      {/* ---- Letter color ---- */}
      <SectionCard>
        <Label hint="Tints the page beneath your words">Letter Color</Label>
        <div className="flex flex-wrap items-center gap-4">
          {LETTER_COLORS.map((c) => {
            const active = state.color === c.id
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => set("color", c.id)}
                aria-pressed={active}
                aria-label={c.label}
                title={c.label}
                className="flex flex-col items-center gap-1.5"
              >
                <span
                  className={`grid size-11 place-items-center rounded-full ring-1 ring-black/5 transition-transform ${
                    active ? "scale-110 ring-2 ring-primary ring-offset-2 ring-offset-card" : "hover:scale-105"
                  }`}
                  style={{ backgroundColor: c.color }}
                >
                  {active ? <Check className="size-5 text-white drop-shadow" /> : null}
                </span>
                <span className="text-xs text-foreground/60">{c.label}</span>
              </button>
            )
          })}
        </div>
      </SectionCard>

      {/* ---- Attach memories ---- */}
      <SectionCard>
        <Label hint="(Optional)">Attach Memories</Label>
        <p className="-mt-1 mb-3 text-sm text-foreground/60">
          Add photos to make your letter more personal and beautiful.
        </p>

        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-primary/35 bg-secondary/30 px-4 py-8 text-center transition-colors hover:border-primary/60 hover:bg-secondary/50"
        >
          <span className="grid size-12 place-items-center rounded-full bg-card text-primary shadow-sm">
            <UploadCloud className="size-6" />
          </span>
          <span className="text-sm font-medium text-foreground">
            Click to upload <span className="font-normal text-foreground/55">or drag &amp; drop</span>
          </span>
          <span className="text-xs text-foreground/45">JPG, PNG up to 5MB (Max 5 photos)</span>
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/png,image/jpeg"
          multiple
          className="hidden"
          onChange={(e) => onAddPhotos(e.target.files)}
        />

        {photos.length > 0 ? (
          <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
            {photos.map((photo) => (
              <div key={photo.id} className="group relative aspect-square overflow-hidden rounded-xl ring-1 ring-border">
                {/* user-uploaded preview via object URL */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.url || "/placeholder.svg"}
                  alt={photo.name}
                  className="size-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => onRemovePhoto(photo.id)}
                  className="absolute right-1 top-1 grid size-6 place-items-center rounded-full bg-card/90 text-foreground shadow transition-transform hover:scale-110"
                  aria-label={`Remove ${photo.name}`}
                >
                  <X className="size-3.5" />
                </button>
              </div>
            ))}
          </div>
        ) : null}
      </SectionCard>
    </div>
  )
}
