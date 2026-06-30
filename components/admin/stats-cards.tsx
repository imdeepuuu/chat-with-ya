type StatsCardsProps = {
  pending: number
  approved: number
  rejected: number
}

export default function StatsCards({
  pending,
  approved,
  rejected,
}: StatsCardsProps) {
  const cards = [
    {
      title: "Pending",
      value: pending,
      emoji: "📩",
      color: "from-orange-100 to-yellow-100",
      text: "text-orange-700",
    },
    {
      title: "Published",
      value: approved,
      emoji: "❤️",
      color: "from-pink-100 to-rose-100",
      text: "text-pink-700",
    },
    {
      title: "Rejected",
      value: rejected,
      emoji: "🗑️",
      color: "from-slate-100 to-gray-100",
      text: "text-slate-700",
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-3 mb-10">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`rounded-3xl bg-gradient-to-br ${card.color}
          p-6 shadow-lg transition-all duration-300
          hover:-translate-y-2 hover:shadow-2xl`}
        >
          <div className="text-4xl">{card.emoji}</div>

          <div className={`mt-4 text-4xl font-bold ${card.text}`}>
            {card.value}
          </div>

          <div className="mt-2 text-gray-600 font-medium">
            {card.title}
          </div>
        </div>
      ))}
    </div>
  )
}