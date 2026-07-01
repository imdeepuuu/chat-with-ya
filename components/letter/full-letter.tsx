"use client"

import LetterLayout from "./LetterLayout"

interface FullLetterProps {
  title: string
  recipient: string
  sender: string
  content: string
  mood: string
  createdAt: string
}

export default function FullLetter({
  title,
  recipient,
  sender,
  content,
  mood,
}: FullLetterProps) {
  return (
    <div className="space-y-3">
      <LetterLayout
        recipient={recipient}
        sender={sender}
        title={title}
        content={content}
        moodId={mood}
        paperId="plain"
        colorId="pink"
        photos={[]}
      />
    </div>
  )
}