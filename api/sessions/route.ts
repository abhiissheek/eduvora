import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
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

    const { companion_id } = await request.json()

    // Create new learning session
    const { data: session, error } = await supabase
      .from("learning_sessions")
      .insert({
        user_id: user.id,
        companion_id,
        started_at: new Date().toISOString(),
        status: "active",
      })
      .select()
      .single()

    if (error) {
      console.error("Error creating session:", error)
      return NextResponse.json({ error: "Failed to create session" }, { status: 500 })
    }

    return NextResponse.json(session)
  } catch (error) {
    console.error("Sessions API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
