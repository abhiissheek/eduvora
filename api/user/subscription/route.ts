import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

// GET user subscription status
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

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("subscription_tier, subscription_status")
      .eq("id", user.id)
      .single()

    if (profileError) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    // Get subscription history
    const { data: history, error: historyError } = await supabase
      .from("subscription_history")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (historyError) {
      console.error("Subscription history error:", historyError)
    }

    return NextResponse.json({
      subscription: {
        tier: profile.subscription_tier,
        status: profile.subscription_status,
        history: history || [],
      },
    })
  } catch (error) {
    console.error("Subscription fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// PUT update user subscription
export async function PUT(request: NextRequest) {
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
    const { subscription_tier, subscription_status, stripe_subscription_id } = body

    // Update profile
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        subscription_tier,
        subscription_status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id)

    if (updateError) {
      return NextResponse.json({ error: "Failed to update subscription" }, { status: 400 })
    }

    // Add to subscription history
    const { error: historyError } = await supabase.from("subscription_history").insert({
      user_id: user.id,
      subscription_tier,
      status: subscription_status,
      stripe_subscription_id,
    })

    if (historyError) {
      console.error("Subscription history error:", historyError)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Subscription update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
