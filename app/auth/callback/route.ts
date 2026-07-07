import { createClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);

  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(`${origin}/login`);
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("Auth Error:", error);
    return NextResponse.redirect(`${origin}/login`);
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(`${origin}/login`);
  }

  // Check if profile already exists
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, username")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError) {
    console.error("Profile Fetch Error:", profileError);
  }

  // Create profile if it doesn't exist
  if (!profile) {
    const { error: insertError } = await supabase
      .from("profiles")
      .insert({
        id: user.id,
        email: user.email,
        full_name: user.user_metadata.full_name ?? "",
        avatar_url: user.user_metadata.avatar_url ?? "",
        username: null,
      });

    if (insertError) {
      console.error("Profile Insert Error:", insertError);
      return NextResponse.redirect(`${origin}/login`);
    }

    return NextResponse.redirect(`${origin}/onboarding`);
  }

  // Profile exists but username not set
  if (!profile.username) {
    return NextResponse.redirect(`${origin}/onboarding`);
  }

  // Everything is complete
  return NextResponse.redirect(`${origin}/write`);
}