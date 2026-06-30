import ActionButtons from "./action-buttons"

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
      relative
      overflow-hidden
      rounded-[32px]
      bg-[#fffdf9]
      border
      border-[#efe4d8]
      shadow-xl
      hover:shadow-2xl
      transition-all
      duration-300
      p-10
      "
    >
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,#f7e7d8_1px,transparent_1px)] [background-size:18px_18px]" />

      <div className="relative z-10">

        <div className="flex items-center justify-between">

          <span className="rounded-full bg-rose-100 px-4 py-2 text-sm font-medium text-rose-700">
            💖 {letter.mood}
          </span>

          <span className="text-sm text-gray-400">
            📜 {letter.paper}
          </span>

        </div>

        <div className="mt-8">

          <p className="text-xl text-gray-700">
            Dear <span className="font-semibold">{letter.recipient}</span>,
          </p>

          <h2 className="mt-6 text-4xl font-bold text-[#3f2b2b]">
            {letter.title}
          </h2>

          <div className="mt-8 whitespace-pre-wrap leading-9 text-[18px] text-gray-700">
            {letter.content}
          </div>

          <div className="mt-14 flex justify-end">
            <div className="text-right">

              <p className="text-gray-500">
                With love,
              </p>

              <h3 className="mt-2 text-3xl font-semibold text-[#6d3b4f]">
                {letter.sender}
              </h3>

            </div>
          </div>

        </div>

        <div className="mt-10 border-t border-dashed border-rose-200 pt-6 flex items-center justify-between">

          <span className="text-sm text-gray-400">
            {new Date(letter.created_at).toLocaleDateString()}
          </span>

          <ActionButtons id={letter.id} />

        </div>

      </div>
    </div>
  )
}