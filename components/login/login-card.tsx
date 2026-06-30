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

        {/* divider */}
        <div className="my-6 flex items-center gap-4" role="separator" aria-hidden="true">
          <span className="h-px flex-1 bg-border" />
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            or
          </span>
          <span className="h-px flex-1 bg-border" />
        </div>

        {/* Email form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                placeholder="you@example.com"
                className="h-11 bg-background/60 pl-10"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <button
              type = "button"
              onClick={handleForgotPassword}
              className="rounded text-xs font-medium text-primary transition-colors hover:text-primary/80 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Lock
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                placeholder="Enter your password"
                className="h-11 bg-background/60 px-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Eye className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="group mt-1 h-11 w-full text-sm font-semibold shadow-md shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30"
          >
            Sign in
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Button>
        </form>

        {/* Sign up */}
        <p className="mt-7 text-center text-sm text-muted-foreground">
          {"Don't have an account? "}
          <button
          type="button"
          onClick={handleSignUp}
          className="rounded font-semibold text-primary transition-colors hover:text-primary/80 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  )
}
