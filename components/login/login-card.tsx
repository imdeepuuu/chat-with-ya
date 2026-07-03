"use client"

import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase-browser"
import { useState } from "react"
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SocialButtons } from "./social-buttons"

export function LoginCard() {
  const supabase = createClient()
  
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleSignUp() {
     const { error } = await supabase.auth.signUp({
      email,
      password,
     })

     if(error){
      alert(error.message)
     }else {
      alert("Account created succesfully!")
     }
  }

  async function handleForgotPassword() {
    if(!email){
      alert("Please Enter your Email first.")
      return
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000",

    })

    if(error) {
      alert(error.message)
    } else {
      alert("Password reset email sent!")
    }
    
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    // Hook up authentication here.
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
     })
     if (error) {
      alert(error.message)
     } else {
      router.push("/write")
      router.refresh()
    }
         
  }

  return (
    <div className="relative w-full max-w-md">
      {/* soft glow behind card */}
      <div
        aria-hidden="true"
        className="absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-primary/20 via-accent/30 to-transparent blur-2xl"
      />

      <div className="relative overflow-hidden rounded-[1.75rem] border border-border/60 bg-card/70 p-8 shadow-xl shadow-primary/5 backdrop-blur-xl sm:p-10">
        {/* Logo + heading */}
        <header className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/30">
            <Mail className="h-7 w-7" aria-hidden="true" />
          </div>
          <h1 className="text-pretty text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Chat With Ya
          </h1>
          <p className="mt-2 text-pretty text-sm text-muted-foreground">
            Find letters written for you
          </p>
        </header>

        {/* Social logins */}
        <SocialButtons />


        <div className="mt-8 rounded-2xl border border-primary/10 bg-primary/5 p-5 text-center">
          <p className="text-sm text-muted-foreground">
            Continue with your Google account to start writing and discovering heartfelt letters.
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            Email & password sign in will be available in Version 2.
          </p>
        </div>

      </div>
    </div>
  )
}
