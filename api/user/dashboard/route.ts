import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

// GET dashboard data
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

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single()

    if (profileError) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    // Get AI companions count
    const { count: companionsCount, error: companionsError } = await supabase
      .from("ai_companions")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("is_active", true)

    // Get recent learning sessions
    const { data: recentSessions, error: sessionsError } = await supabase
      .from("learning_sessions")
      .select(`
        *,
        ai_companions (name, subject)
      `)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(5)

    // Get learning progress summary
    const { data: progressSummary, error: progressError } = await supabase
      .from("learning_progress")
      .select("*")
      .eq("user_id", user.id)
      .order("last_session_at", { ascending: false })
      .limit(3)

    // Calculate total learning time
    const { data: totalTimeData, error: totalTimeError } = await supabase
      .from("learning_sessions")
      .select("duration_minutes")
      .eq("user_id", user.id)

    const totalMinutes = totalTimeData?.reduce((sum, session) => sum + (session.duration_minutes || 0), 0) || 0

    return NextResponse.json({
      profile,
      stats: {
        companionsCount: companionsCount || 0,
        totalLearningMinutes: totalMinutes,
        recentSessions: recentSessions || [],
        progressSummary: progressSummary || [],
      },
    })
  } catch (error) {
    console.error("Dashboard data fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
