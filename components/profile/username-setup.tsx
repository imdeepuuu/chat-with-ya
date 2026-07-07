"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import { createClient } from "@/lib/supabase-browser"

const supabase = createClient()

export default function UsernameSetup() {
    const [username, setUsername] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [email, setEmail] = useState("")
    const [avatar, setAvatar] = useState("")

    const [checking, setChecking] = useState(false)
    const [available, setAvailable] = useState<boolean | null>(null)
    useEffect(() => {
        async function checkUsername() {
            if (username.trim().length < 3) {
                setAvailable(null)
                return
            }
            
            setChecking(true)

            const { data } = await supabase
               .from("profiles")
               .select("username")
                .eq("username", username)
                .maybeSingle()

             setAvailable(!data)
             setChecking(false)   
            }
             const timer = setTimeout(checkUsername, 400)
             
             return () => clearTimeout(timer)
    }, [username])         

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


            setDisplayName(profile?.username ?? user.user_metadata.full_name ?? "") 
            setEmail(user.email ?? "")
            setAvatar(user.user_metadata.avatar_url ?? "")    
        }

        loadUser()
    }, []) 

    async function saveUsername() {  
         
        const {
            data: { user },
        } = await supabase.auth.getUser()
        
        

        if (!user) return

        const { data, error } = await supabase
          .from("profiles")
          .update({
            username,
         })
          .eq("id", user.id)
          .select()
         
         

        if (!error) {
            window.location.href = "/write"
          }
        }     
        
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <Card className="w-full max-w-md">
        <CardContent className="p-8">
          <div className="flex flex-col items-center space-y-6">
             <Avatar className="h-24 w-24">
                <AvatarImage src={avatar} />
                <AvatarFallback>DP</AvatarFallback>
             </Avatar>
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold">
                    Welcome to Chat With Ya 💌
                </h1>
                 <p className="text-lg font-medium">
                    {displayName}
                 </p>
                 <p className="text-sm text-muted-foreground">
                    {email}
                 </p>
                 <div className="w-full space-y-4 pt-4">
                    <Input
                      placeholder="@username"
                      value={username}
                      onChange={(e) => 
                        setUsername(
                            e.target.value
                             .toLowerCase()
                             .replace(/[^a-z0-9_]/g, "")
                        )
                      }         
                    />
                    <p className="text-xs text-muted-foreground">
                        Use 3–20 lowercase letters, numbers, or underscores.
                    </p>
                    <div className="text-sm">
                        {checking && (
                            <p className="text-muted-foreground">
                                Checking username...
                            </p>
                        )}

                        {!checking && available === true && (
                            <p className="text-green-600">
                                ✅ Username available
                            </p>
                        )}

                        {!checking && available === false && (
                            <p className="text-red-600">
                                ❌ Username already taken
                            </p>        
                        )}    
                    </div>
                     <Button
                        className="w-full"
                        disabled={!available || username.length < 3}
                        onClick={saveUsername}
                    >    
                        Continue
                    </Button>  
                 </div>
              </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}