interface LetterCardProps {
  title: string
  recipient: string
  sender: string
  content: string
}

export default function LetterCard({
  title,
  recipient,
  sender,
  content,
}: LetterCardProps) {
  return (
    <div className="mx-auto max-w-3xl rounded-3xl bg-white p-10 shadow-xl">

      <h1 className="text-4xl font-bold">
        {title}
      </h1>

      <p className="mt-8 text-2xl">
        Dear <strong>{recipient}</strong>,
      </p>

      <div className="mt-8 whitespace-pre-wrap leading-8 text-lg">
        {content}
      </div>

      <div className="mt-16 text-right">
        <p className="text-gray-500">
          With love,
        </p>

        <h2 className="mt-2 text-2xl font-semibold">
          {sender}
        </h2>
      </div>

    </div>
  )
}