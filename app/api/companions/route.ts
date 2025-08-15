import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const cookieStore = cookies()
    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    })

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const {
      name,
      subject,
      difficulty_level,
      teaching_style,
      personality_traits,
      custom_instructions,
      learning_objectives,
    } = body

    console.log("[v0] Creating companion for user:", user.id, "with data:", { name, subject })

    const { data: existingProfile } = await supabase.from("profiles").select("id").eq("id", user.id).single()

    if (!existingProfile) {
      console.log("[v0] Creating missing user profile for:", user.id)
      const { error: profileError } = await supabase.from("profiles").insert({
        id: user.id,
        email: user.email,
        full_name: user.user_metadata?.full_name || user.email?.split("@")[0] || "User",
        subscription_tier: "free",
        subscription_status: "active",
        current_streak: 0,
        longest_streak: 0,
      })

      if (profileError) {
        console.error("[v0] Error creating user profile:", profileError)
        return NextResponse.json({ error: "Failed to create user profile" }, { status: 500 })
      }
      console.log("[v0] User profile created successfully")
    }

    // Create AI companion
    const { data: companion, error } = await supabase
      .from("ai_companions")
      .insert({
        user_id: user.id,
        name,
        subject,
        difficulty_level,
        teaching_style,
        personality_traits,
        custom_instructions,
        learning_objectives,
        is_active: true,
      })
      .select()
      .single()

    if (error) {
      console.error("[v0] Error creating companion:", error)
      return NextResponse.json({ error: "Failed to create companion" }, { status: 500 })
    }

    console.log("[v0] Companion created successfully:", companion.id)
    return NextResponse.json(companion)
  } catch (error) {
    console.error("[v0] API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const cookieStore = cookies()
    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    })

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: companions, error } = await supabase
      .from("ai_companions")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) {
      return NextResponse.json({ error: "Failed to fetch companions" }, { status: 500 })
    }

    return NextResponse.json(companions)
  } catch (error) {
    console.error("[v0] API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
