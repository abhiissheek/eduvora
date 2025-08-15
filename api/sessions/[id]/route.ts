import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
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

    const { duration_minutes, message_count } = await request.json()

    // Update session with completion data
    const { data: session, error } = await supabase
      .from("learning_sessions")
      .update({
        ended_at: new Date().toISOString(),
        duration_minutes,
        message_count,
        status: "completed",
      })
      .eq("id", params.id)
      .eq("user_id", user.id)
      .select()
      .single()

    if (error) {
      console.error("Error updating session:", error)
      return NextResponse.json({ error: "Failed to update session" }, { status: 500 })
    }

    return NextResponse.json(session)
  } catch (error) {
    console.error("Session update API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
