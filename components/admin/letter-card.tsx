import ActionButtons from "./action-buttons";

type Letter = {
  id: string
  title: string
  sender: string
  recipient: string
  mood: string
  content: string
  paper: string
  created_at: string
}

type Props = {
  letter: Letter
}

export default function LetterCard({ letter }: Props) {
  return (
    <div
      className="
        group
        rounded-[32px]
        bg-gradient-to-br
        from-white
        to-rose-50
        p-8
        shadow-lg
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-2xl
        border
        border-rose-100
      "
    >
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-bold text-[#342044]">
            {letter.title}
          </h2>

          <p className="mt-2 text-gray-500">
            👤 {letter.sender} → {letter.recipient}
          </p>
        </div>

        <span className="rounded-full bg-pink-100 px-4 py-2 text-sm font-medium text-pink-700">
          {letter.mood}
        </span>
      </div>

      <div className="my-8 h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent" />

      <div className="whitespace-pre-wrap leading-8 text-gray-700">
        {letter.content}
      </div>

      <div className="my-8 h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent" />

      <div className="flex items-center justify-between">
        <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700">
          📜 {letter.paper}
        </span>

        <ActionButtons id={letter.id} />
        
      </div>
    </div>
  )
}