"use client";

import { useTransition } from "react";
import { Heart, Trash2 } from "lucide-react";
import { approveLetter, rejectLetter } from "@/app/actions/letters";

type Props = {
  id: string;
};

export default function ActionButtons({ id }: Props) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex gap-3">
      <button
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            try {
              console.log("Calling approveLetter", id);
              await approveLetter(id);
              console.log("approveLetter finished");
            } catch (e) {
              console.error("approveLetter failed:", e);
            }    
          })
        }
        style={{
          background: "linear-gradient(90deg, #ec4899, #f43f5e)",
          color: "white",
          border: "none",
          borderRadius: "12px",
          padding: "12px 24px",
          fontWeight: "600",
          cursor: isPending ? "not-allowed" : "pointer",
          opacity: isPending ? 0.6 : 1,
          boxShadow: "0 10px 25px rgba(236,72,153,0.35)",
        }}
      >
        <span className="flex items-center gap-2">
          <Heart size={18} fill="white" />
          {isPending ? "Publishing..." : "Publish"}
        </span>
      </button>

      <button
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            await rejectLetter(id);
          })
        }
        className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
      >
        <Trash2 size={18} />
        {isPending ? "Working..." : "Reject"}
      </button>
    </div>
  );
}