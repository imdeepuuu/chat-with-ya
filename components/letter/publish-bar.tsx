"use client"

import { Send, ShieldCheck, Clock, Mail } from "lucide-react"

export function PublishBar({ onPublish }: { onPublish: () => void }) {
  return (
    <section className="mx-auto mt-8 max-w-6xl px-4">
      <div className="rounded-[2rem] border border-border/70 bg-card/85 p-6 shadow-[0_24px_70px_-36px_rgba(190,80,130,0.6)] backdrop-blur-sm sm:p-8">
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary/12 text-primary">
              <Send className="size-6" />
            </span>
            <div>
              <h2 className="font-heading text-xl font-semibold text-foreground">
                Ready to send your letter?
              </h2>
              <p className="mt-1 max-w-md text-sm leading-relaxed text-foreground/65">
                Every letter is reviewed before publication to keep Chat With Ya kind,
                respectful, and safe. You can cancel within 24 hours if you change your mind.
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col items-stretch gap-2 sm:w-auto sm:items-end">
            <button
              type="button"
              onClick={onPublish}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-[0_16px_40px_-16px_rgba(200,50,110,0.9)] transition-all hover:brightness-105 active:scale-[0.98]"
            >
              <Mail className="size-5 transition-transform group-hover:-translate-y-0.5" />
              Submit for Review
            </button>
            <p className="flex items-center justify-center gap-1.5 text-xs text-foreground/50 sm:justify-end">
              <Clock className="size-3.5" />
              Usually reviewed within 24 hours
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-start gap-2.5 rounded-2xl bg-secondary/40 p-4 text-sm text-foreground/70">
          <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" />
          <p>
            Your identity stays private — only the words you choose are shared. You have a full
            <span className="font-semibold text-foreground"> 24 hours</span> to edit or cancel
            before your letter goes live.
          </p>
        </div>
      </div>
    </section>
  )
}
