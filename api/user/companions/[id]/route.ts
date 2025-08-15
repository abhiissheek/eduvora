import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

// GET specific companion
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
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

    const { data: companion, error: companionError } = await supabase
      .from("ai_companions")
      .select(`
        *,
        learning_progress (*),
        learning_sessions (*)
      `)
      .eq("id", params.id)
      .eq("user_id", user.id)
      .single()

    if (companionError) {
      return NextResponse.json({ error: "Companion not found" }, { status: 404 })
    }

    return NextResponse.json({ companion })
  } catch (error) {
    console.error("Companion fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// PUT update companion
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
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

    const { data: companion, error: updateError } = await supabase
      .from("ai_companions")
      .update({
        name,
        subject,
        personality,
        description,
        avatar_url,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.id)
      .eq("user_id", user.id)
      .select()
      .single()

    if (updateError) {
      return NextResponse.json({ error: "Failed to update companion" }, { status: 400 })
    }

    return NextResponse.json({ companion })
  } catch (error) {
    console.error("Companion update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// DELETE companion
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
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

    const { error: deleteError } = await supabase
      .from("ai_companions")
      .update({ is_active: false })
      .eq("id", params.id)
      .eq("user_id", user.id)

    if (deleteError) {
      return NextResponse.json({ error: "Failed to delete companion" }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Companion deletion error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
