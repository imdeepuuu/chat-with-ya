"use client"

import LetterLayout from "./LetterLayout"

interface FullLetterProps {
  title: string
  recipient: string
  sender: string
  content: string
  mood: string
  paper: string
  color: string
  writingStyle: "classic" | "handwritten" | "elegant"
  photos: {
    id: string
    name: string
    url: string
  }[]  
  createdAt: string
}

export default function FullLetter({
  title,
  recipient,
  sender,
  content,
  mood,
  paper,
  color,
  writingStyle,
  photos,
}: FullLetterProps) {
  console.log("FullLetter writingStyle:", writingStyle)
  return (
    <div className="space-y-3">
      <LetterLayout
        recipient={recipient}
        sender={sender}
        title={title}
        content={content}
        moodId={mood}
        paperId={paper}
        colorId={color}
        writingStyle={writingStyle}
        photos={photos}
      />
    </div>
  )
}