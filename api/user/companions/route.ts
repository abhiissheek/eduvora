import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

// GET user's AI companions
export async function GET() {
  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: companions, error: companionsError } = await supabase
      .from("ai_companions")
      .select(`
        *,
        learning_progress (
          total_sessions,
          total_minutes,
          mastery_level,
          last_session_at
        )
      `)
      .eq("user_id", user.id)
      .eq("is_active", true)
      .order("created_at", { ascending: false })

    if (companionsError) {
      return NextResponse.json({ error: "Failed to fetch companions" }, { status: 400 })
    }

    return NextResponse.json({ companions })
  } catch (error) {
    console.error("Companions fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST create new AI companion
export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { name, subject, personality, description, avatar_url } = body

    if (!name || !subject) {
      return NextResponse.json({ error: "Name and subject are required" }, { status: 400 })
    }

    const { data: companion, error: createError } = await supabase
      .from("ai_companions")
      .insert({
        user_id: user.id,
        name,
        subject,
        personality,
        description,
        avatar_url,
      })
      .select()
      .single()

    if (createError) {
      return NextResponse.json({ error: "Failed to create companion" }, { status: 400 })
    }

    // Initialize learning progress
    const { error: progressError } = await supabase.from("learning_progress").insert({
      user_id: user.id,
      companion_id: companion.id,
      subject,
    })

    if (progressError) {
      console.error("Progress initialization error:", progressError)
    }

    return NextResponse.json({ companion })
  } catch (error) {
    console.error("Companion creation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
