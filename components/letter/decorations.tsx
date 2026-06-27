import { Heart } from "lucide-react"

// Deterministic values so server and client render identically (no hydration drift).
const PETALS = [
  { left: "6%", size: 14, duration: 22, delay: 0, hue: "#f7b8cf" },
  { left: "18%", size: 10, duration: 28, delay: 6, hue: "#f6c9b3" },
  { left: "31%", size: 16, duration: 19, delay: 3, hue: "#f4a3c0" },
  { left: "44%", size: 9, duration: 31, delay: 9, hue: "#d6c2ef" },
  { left: "57%", size: 13, duration: 24, delay: 1, hue: "#f7b8cf" },
  { left: "69%", size: 11, duration: 27, delay: 5, hue: "#f6c9b3" },
  { left: "81%", size: 15, duration: 20, delay: 8, hue: "#f4a3c0" },
  { left: "92%", size: 10, duration: 30, delay: 2, hue: "#f7b8cf" },
]

export function Decorations() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* soft blurred glows */}
      <div className="absolute -left-24 top-10 size-72 rounded-full bg-secondary/60 blur-3xl" />
      <div className="absolute right-[-6rem] top-1/3 size-80 rounded-full bg-accent/50 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 size-72 rounded-full bg-[#ead8f5]/50 blur-3xl" />

      {/* drifting petals / hearts */}
      {PETALS.map((p, i) => (
        <span
          key={i}
          className="animate-petal absolute bottom-0 block"
          style={{
            left: p.left,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          <Heart
            className="drop-shadow-sm"
            style={{ width: p.size, height: p.size, color: p.hue, fill: p.hue }}
          />
        </span>
      ))}
    </div>
  )
}
