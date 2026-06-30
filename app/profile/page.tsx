"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase-browser"

const supabase = createClient()
import SiteNav from "@/components/site-nav"

interface Profile {
  username: string
  email: string
}

export default function ProfilePage() {
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<Profile>({
    username: "",
    email: "",
  })

  useEffect(() => {
    async function loadProfile() {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.replace("/login")
        return
      }

      const user = session.user

      const { data } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", user.id)
        .single()

      setProfile({
        username: data?.username ?? "Unknown User",
        email: user.email ?? "",
      })

      setLoading(false)
    }

    loadProfile()
  }, [router])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push("/")
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-xl">
        Loading Profile...
      </div>
    )
  }

  return (
    <>
      <SiteNav />

      <main className="min-h-screen bg-[#FFF8F2] py-16">
        <div className="mx-auto max-w-3xl px-6">

          <div className="rounded-[40px] bg-white p-12 shadow-xl">

            <div className="text-center">

              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-pink-100 text-5xl">
                👤
              </div>

              <h1 className="mt-6 text-4xl font-bold text-[#3E2C41]">
                {profile.username}
              </h1>

              <p className="mt-3 text-lg text-[#756070]">
                {profile.email}
              </p>

            </div>

            <div className="mt-12 space-y-6">

              <div className="rounded-3xl bg-[#FFF8F2] p-6">
                <h2 className="font-semibold">
                  Username
                </h2>

                <p className="mt-2">
                  {profile.username}
                </p>
              </div>

              <div className="rounded-3xl bg-[#FFF8F2] p-6">
                <h2 className="font-semibold">
                  Email
                </h2>

                <p className="mt-2">
                  {profile.email}
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="mt-6 w-full rounded-full bg-red-500 py-3 text-lg font-semibold text-white transition hover:bg-red-600"
              >
                Logout
              </button>

            </div>

          </div>

        </div>
      </main>
    </>
  )
}