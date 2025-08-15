import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

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

    // Get or create learning progress entries
    const { data: sessions } = await supabase
      .from("learning_sessions")
      .select(`
        *,
        ai_companions (subject)
      `)
      .eq("user_id", user.id)
      .eq("status", "completed")

    // Calculate progress by subject
    const subjectProgress =
      sessions?.reduce(
        (acc, session) => {
          const subject = session.ai_companions?.subject
          if (!subject) return acc

          if (!acc[subject]) {
            acc[subject] = {
              subject,
              sessions_completed: 0,
              total_time_minutes: 0,
              mastery_level: 0,
            }
          }

          acc[subject].sessions_completed += 1
          acc[subject].total_time_minutes += session.duration_minutes || 0

          // Simple mastery calculation based on time spent
          const timeHours = acc[subject].total_time_minutes / 60
          acc[subject].mastery_level = Math.min(100, Math.round(timeHours * 10)) // 10% per hour, max 100%

          return acc
        },
        {} as Record<string, any>,
      ) || {}

    // Update or insert progress records
    for (const progress of Object.values(subjectProgress)) {
      await supabase.from("learning_progress").upsert({
        user_id: user.id,
        subject: (progress as any).subject,
        sessions_completed: (progress as any).sessions_completed,
        total_time_minutes: (progress as any).total_time_minutes,
        mastery_level: (progress as any).mastery_level,
        last_session_at: new Date().toISOString(),
      })
    }

    return NextResponse.json({ progress: Object.values(subjectProgress) })
  } catch (error) {
    console.error("Progress API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
