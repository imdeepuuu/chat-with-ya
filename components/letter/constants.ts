import {
  Heart,
  Flower2,
  HeartHandshake,
  Moon,
  Users,
  Sparkles,
  type LucideIcon,
} from "lucide-react"

export type MoodId =
  | "love"
  | "gratitude"
  | "apology"
  | "missing"
  | "friendship"
  | "hope"

export type Mood = {
  id: MoodId
  label: string
  icon: LucideIcon
  /** soft background + text for the selected pill */
  swatch: string
}

export const MOODS: Mood[] = [
  { id: "love", label: "Love", icon: Heart, swatch: "#f7a8c4" },
  { id: "gratitude", label: "Gratitude", icon: Flower2, swatch: "#f6b8a0" },
  { id: "apology", label: "Apology", icon: HeartHandshake, swatch: "#cdb8ea" },
  { id: "missing", label: "Missing Someone", icon: Moon, swatch: "#a9c6e8" },
  { id: "friendship", label: "Friendship", icon: Users, swatch: "#f3d27a" },
  { id: "hope", label: "Hope", icon: Sparkles, swatch: "#a8d6b4" },
]

export type PaperId =
  | "plain"
  | "vintage"
  | "floral"
  | "sakura"
  | "notebook"
  | "handmade"

export type Paper = {
  id: PaperId
  label: string
  description: string
  /** small preview tile background */
  preview: string
  /** background applied to the live letter surface */
  surface: string
  /** whether to show horizontal ruled lines */
  ruled?: boolean
}

export const PAPERS: Paper[] = [
  {
    id: "plain",
    label: "Plain Paper",
    description: "Clean & timeless",
    preview: "linear-gradient(160deg,#fffdfb,#fff4f8)",
    surface: "#fffdfb",
  },
  {
    id: "vintage",
    label: "Vintage Paper",
    description: "Aged & warm",
    preview: "linear-gradient(160deg,#f6ecd8,#e9d6b8)",
    surface: "linear-gradient(160deg,#f8efdd,#efdcbf)",
  },
  {
    id: "floral",
    label: "Floral Border",
    description: "Soft blooms",
    preview:
      "radial-gradient(circle at 18% 18%,#f9c1d6 0 7px,transparent 8px),radial-gradient(circle at 82% 82%,#f9c1d6 0 7px,transparent 8px),linear-gradient(160deg,#fffdfb,#fff1f6)",
    surface: "#fffaf6",
  },
  {
    id: "sakura",
    label: "Sakura Paper",
    description: "Blush petals",
    preview: "linear-gradient(160deg,#ffe3ee,#ffc9dd)",
    surface: "linear-gradient(160deg,#fff3f8,#ffe6ef)",
  },
  {
    id: "notebook",
    label: "Notebook Paper",
    description: "Ruled lines",
    preview:
      "repeating-linear-gradient(0deg,#fffdfb,#fffdfb 6px,#dbe7f5 7px),linear-gradient(#fffdfb,#fffdfb)",
    surface: "#fffefc",
    ruled: true,
  },
  {
    id: "handmade",
    label: "Handmade Paper",
    description: "Textured & raw",
    preview: "linear-gradient(160deg,#f3ece6,#e6d8cf)",
    surface: "linear-gradient(160deg,#f8f1ea,#efe2d8)",
  },
]

export type LetterColor = {
  id: string
  label: string
  /** swatch + faint tint applied behind the writing */
  color: string
  tint: string
}

export const LETTER_COLORS: LetterColor[] = [
  { id: "pink", label: "Soft Pink", color: "#f4a3c0", tint: "#fff2f7" },
  { id: "lavender", label: "Lavender", color: "#c9b6ea", tint: "#f6f2fd" },
  { id: "sky", label: "Sky Blue", color: "#a9cdeb", tint: "#f1f7fd" },
  { id: "cream", label: "Cream", color: "#f0dca6", tint: "#fffaf0" },
  { id: "sage", label: "Sage Green", color: "#a9d4b6", tint: "#f1faf3" },
]
