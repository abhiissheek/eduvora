import { headers } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = headers().get("stripe-signature")!

  let event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error("Webhook signature verification failed:", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object
        const userId = session.metadata?.user_id
        const plan = session.metadata?.plan

        if (userId && plan) {
          // Update user subscription
          await supabase
            .from("profiles")
            .update({
              subscription_tier: plan,
              subscription_status: "active",
              updated_at: new Date().toISOString(),
            })
            .eq("id", userId)

          // Add to subscription history
          await supabase.from("subscription_history").insert({
            user_id: userId,
            subscription_tier: plan,
            status: "active",
            stripe_subscription_id: session.subscription,
          })
        }
        break
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object
        const userId = subscription.metadata?.user_id

        if (userId) {
          const status = subscription.status === "active" ? "active" : "inactive"

          await supabase
            .from("profiles")
            .update({
              subscription_status: status,
              updated_at: new Date().toISOString(),
            })
            .eq("id", userId)
        }
        break
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object
        const userId = subscription.metadata?.user_id

        if (userId) {
          // Downgrade to free plan
          await supabase
            .from("profiles")
            .update({
              subscription_tier: "free",
              subscription_status: "inactive",
              updated_at: new Date().toISOString(),
            })
            .eq("id", userId)

          // Add to subscription history
          await supabase.from("subscription_history").insert({
            user_id: userId,
            subscription_tier: "free",
            status: "cancelled",
            stripe_subscription_id: subscription.id,
          })
        }
        break
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object
        const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string)
        const userId = subscription.metadata?.user_id

        if (userId) {
          await supabase
            .from("profiles")
            .update({
              subscription_status: "past_due",
              updated_at: new Date().toISOString(),
            })
            .eq("id", userId)
        }
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook processing error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}
