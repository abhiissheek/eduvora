import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const cookieStore = cookies()
    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, {
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
      console.error("Error creating companion:", error)
      return NextResponse.json({ error: "Failed to create companion" }, { status: 500 })
    }

    return NextResponse.json(companion)
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const cookieStore = cookies()
    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, {
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
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
