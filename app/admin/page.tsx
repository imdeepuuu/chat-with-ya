import { redirect } from "next/navigation";
import DashboardHeader from "@/components/admin/dashboard-header";
import LetterCard from "@/components/admin/letter-card";
import StatsCards from "@/components/admin/stats-cards";
import { createClient } from "@/lib/supabase-server";

export default async function AdminPage() {
  const supabase = await createClient();

  // -----------------------------
  // Check logged in user
  // -----------------------------
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  // -----------------------------
  // Check admin role
  // -----------------------------
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    redirect("/");
  }

  // -----------------------------
  // Load pending letters
  // -----------------------------
  const { data: pendingLetters, error } = await supabase
    .from("letters")
    .select("*")
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-600">
        {error.message}
      </div>
    );
  }

  const { count: approvedCount } = await supabase
    .from("letters")
    .select("*", { count: "exact", head: true })
    .eq("status", "approved");

  const { count: rejectedCount } = await supabase
    .from("letters")
    .select("*", { count: "exact", head: true })
    .eq("status", "rejected");

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50">
      <div className="mx-auto max-w-7xl p-10">
        <DashboardHeader />

        <StatsCards
          pending={pendingLetters?.length ?? 0}
          approved={approvedCount ?? 0}
          rejected={rejectedCount ?? 0}
        />

        {pendingLetters?.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-pink-300 bg-white/70 p-16 text-center shadow-lg">
            <div className="text-6xl">💌</div>

            <h2 className="mt-6 text-3xl font-bold text-[#342044]">
              No pending letters
            </h2>

            <p className="mt-3 text-gray-500">
              Every submitted letter has already been reviewed.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {pendingLetters.map((letter) => (
              <LetterCard
                key={letter.id}
                letter={letter}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}