import LetterLayout from "../letter/LetterLayout"
import ActionButtons from "./action-buttons"

type Letter = {
  id: string
  title: string
  sender: string
  recipient: string
  mood: string
  content: string
  paper: string
  color: string
  writing_style: "classic" | "handwritten" | "elegant"
  photos: any[]
  created_at: string
}

type Props = {
  letter: Letter
}

export default function LetterCard({ letter }: Props) {
  return (
    <div className="space-y-4">
      <LetterLayout
        recipient={letter.recipient}
        sender={letter.sender}
        title={letter.title}
        content={letter.content}
        moodId={letter.mood as any}
        paperId={letter.paper as any}
        colorId={letter.color as any}
        writingStyle={letter.writing_style}
        photos={letter.photos ?? []}
      />

      <div className="flex items-center justify-end">
        <ActionButtons id={letter.id} />
      </div>
    </div>
  )
}