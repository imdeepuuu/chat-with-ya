"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Mail, ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"

const NAV = [
  { name: "Home", href: "/" },
  { name: "Write", href: "/write" },
  { name: "Profile", href: "/profile" },
]

export function SiteHeader() {
  const [displayName, setDisplayName] = useState("")
  const [avatar, setAvatar] = useState("")
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const { data: profile } = await supabase
       .from("profiles")
       .select("username")
       .eq("id", user.id)
       .single()
      
      console.log("Profile:", profile)
      console.log("Username:", profile?.username)
      
      setDisplayName(profile?.username ?? user.user_metadata.full_name ?? "")
      setAvatar(user.user_metadata.avatar_url ?? "")
    }
    
    loadUser()
  }, [])
  
  async function handleLogout() {
    await supabase.auth.signOut()
    router.push("/login")
  }  
  return (
    <header className="sticky top-4 z-40 px-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border border-border/70 bg-card/80 px-4 py-2.5 shadow-[0_10px_40px_-20px_rgba(190,80,130,0.5)] backdrop-blur-md sm:px-6">
        <a href="#" className="flex items-center gap-2.5">
          <img
          src="/Logo.png"
          alt="Chat With Ya"
          className="h-16 w-16 object-contain"
          />
          <span className="font-heading text-lg font-semibold tracking-tight text-primary">
            Chat With Ya
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {NAV.map((item) => (
            <a
             key={item.name}
              href={item.href}
              className={
                item.name === "Write"
                  ? "relative text-sm font-medium text-primary after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-primary"
                  : "text-sm font-medium text-foreground/70 transition-colors hover:text-primary"
              }
              
            >
              {item.name}
            </a>
          ))}
        </nav>

        <div className="relative">
          <button
           onClick={() => setOpen(!open)}
           className="flex items-center gap-3 rounded-full border border-border/70 bg-background/60 px-3 py-2"
          >
            <img
             src={avatar || "/Logo.png"}
             alt="Profile"
             className="h-10 w-10 rounded-full"
            />

            <div className="hidden sm:block">
              <p className="text-sm font-semibold">
                {displayName || "Loading..."}
              </p>  
            </div>

            <ChevronDown className="h-4 w-4" />
          </button>

          {open && (
            <div className="absolute right-0 top-16 z-50 w-56 rounded-xl border bg-white p-3 shadow-lg">
              <p className="font-semibold">@{displayName}</p>
              <p className="mb-3 text-sm text-gray-500">
                Logged in
              </p>

              <hr className="my-2" />

              <button
               onClick={() => {
                setOpen(false)
                router.push("/profile")
               }}
                className="block w-full rounded-md px-3 py-2 text-left hover:bg-gray-100"
              >
                👤 My Profile
              </button>  
  

              <button className="block w-full rounded-md px-3 py-2 text-left hover:bg-gray-100">
               ⚙️ Settings 
              </button>

              <button
               onClick={handleLogout}
               className="block w-full rounded-md px-3 py-2 text-left text-red-600 hover:bg-red-50"
              >
                🚪 Logout
              </button> 
            </div>
          )}          
        </div>

      </div>
    </header>
  )
}
