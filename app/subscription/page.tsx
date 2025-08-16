

import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CreditCard, Calendar, CheckCircle, XCircle, Clock } from "lucide-react"
import { SubscriptionManager } from "@/components/SubscriptionManager"
import { PLAN_LIMITS } from "@/stripe"

async function getSubscriptionData() {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        },
      },
    },
  )

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect("/login")
  }

  // Get user profile with subscription info
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  // Get subscription history
  const { data: history } = await supabase
    .from("subscription_history")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  // Get usage statistics
  const { data: companions } = await supabase
    .from("ai_companions")
    .select("*")
    .eq("user_id", user.id)
    .eq("is_active", true)

  const { data: sessions } = await supabase
    .from("learning_sessions")
    .select("*")
    .eq("user_id", user.id)
    .gte("created_at", new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString())

  return {
    profile: profile || { subscription_tier: "free", subscription_status: "inactive" },
    history: history || [],
    usage: {
      companions: companions?.length || 0,
      sessionsThisMonth: sessions?.length || 0,
    },
  }
}

export default async function SubscriptionPage() {
  const { profile, history, usage } = await getSubscriptionData()
  const currentPlan = profile.subscription_tier || "free"
  const planLimits = PLAN_LIMITS[currentPlan as keyof typeof PLAN_LIMITS]

  const getPlanPrice = (tier: string) => {
    switch (tier) {
      case "core":
        return "₹499"
      case "pro":
        return "₹999"
      default:
        return "₹0"
    }
  }

  const getPlanName = (tier: string) => {
    switch (tier) {
      case "core":
        return "Core Plan"
      case "pro":
        return "Pro Plan"
      default:
        return "Free Plan"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "past_due":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <XCircle className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Subscription & Billing</h1>
          <p className="text-gray-600 mt-2">Manage your subscription and view billing information</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Plan */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
                  Current Plan
                </CardTitle>
                <CardDescription>Your active subscription details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold">{getPlanName(currentPlan)}</h3>
                    <p className="text-gray-600">{getPlanPrice(currentPlan)}/month</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(profile.subscription_status)}
                    <Badge
                      variant={profile.subscription_status === "active" ? "default" : "secondary"}
                      className="capitalize"
                    >
                      {profile.subscription_status}
                    </Badge>
                  </div>
                </div>

                {/* Plan Features */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Plan Features</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">AI Companions</span>
                        <span className="font-medium">
                          {planLimits.companions === -1 ? "Unlimited" : planLimits.companions}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Monthly Sessions</span>
                        <span className="font-medium">
                          {planLimits.sessions_per_month === -1 ? "Unlimited" : planLimits.sessions_per_month}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {planLimits.features.map((feature) => (
                        <div key={feature} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm capitalize">{feature.replace("_", " ")}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Usage Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Usage This Month</CardTitle>
                <CardDescription>Track your current usage against plan limits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">AI Companions</span>
                      <span className="text-sm text-gray-600">
                        {usage.companions} / {planLimits.companions === -1 ? "∞" : planLimits.companions}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${
                            planLimits.companions === -1
                              ? 0
                              : Math.min((usage.companions / planLimits.companions) * 100, 100)
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Learning Sessions</span>
                      <span className="text-sm text-gray-600">
                        {usage.sessionsThisMonth} /{" "}
                        {planLimits.sessions_per_month === -1 ? "∞" : planLimits.sessions_per_month}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{
                          width: `${
                            planLimits.sessions_per_month === -1
                              ? 0
                              : Math.min((usage.sessionsThisMonth / planLimits.sessions_per_month) * 100, 100)
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Usage warnings */}
                {planLimits.companions !== -1 && usage.companions >= planLimits.companions * 0.8 && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      You're approaching your AI companion limit. Consider upgrading for unlimited companions.
                    </p>
                  </div>
                )}

                {planLimits.sessions_per_month !== -1 &&
                  usage.sessionsThisMonth >= planLimits.sessions_per_month * 0.8 && (
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        You're approaching your monthly session limit. Consider upgrading for unlimited sessions.
                      </p>
                    </div>
                  )}
              </CardContent>
            </Card>

            {/* Subscription History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-purple-600" />
                  Subscription History
                </CardTitle>
                <CardDescription>Your subscription changes and billing history</CardDescription>
              </CardHeader>
              <CardContent>
                {history.length === 0 ? (
                  <div className="text-center py-6">
                    <Calendar className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">No subscription history yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {history.slice(0, 5).map((item: any) => (
                      <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{getPlanName(item.subscription_tier)}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(item.created_at).toLocaleDateString("en-IN", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                        <Badge variant={item.status === "active" ? "default" : "secondary"} className="capitalize">
                          {item.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Subscription Management */}
          <div className="space-y-6">
            <SubscriptionManager
              subscription={{
                tier: profile.subscription_tier,
                status: profile.subscription_status,
              }}
            />

            {/* Upgrade Options */}
            {currentPlan === "free" && (
              <Card>
                <CardHeader>
                  <CardTitle>Upgrade Your Plan</CardTitle>
                  <CardDescription>Unlock more features and capabilities</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Core Plan</h4>
                        <span className="font-bold">₹499/mo</span>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• 5 AI Companions</li>
                        <li>• 100 Sessions/month</li>
                        <li>• Enhanced AI</li>
                      </ul>
                      <Button className="w-full mt-3" onClick={() => (window.location.href = "/#pricing")}>
                        Upgrade to Core
                      </Button>
                    </div>

                    <div className="p-3 border rounded-lg bg-blue-50">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Pro Plan</h4>
                        <span className="font-bold">₹999/mo</span>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Unlimited Companions</li>
                        <li>• Unlimited Sessions</li>
                        <li>• Premium AI</li>
                        <li>• Priority Support</li>
                      </ul>
                      <Button className="w-full mt-3" onClick={() => (window.location.href = "/#pricing")}>
                        Upgrade to Pro
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentPlan === "core" && (
              <Card>
                <CardHeader>
                  <CardTitle>Upgrade to Pro</CardTitle>
                  <CardDescription>Get unlimited access and premium features</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-3 border rounded-lg bg-blue-50">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Pro Plan</h4>
                      <span className="font-bold">₹999/mo</span>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Unlimited everything</li>
                      <li>• Premium AI models</li>
                      <li>• Advanced analytics</li>
                      <li>• Priority support</li>
                    </ul>
                    <Button className="w-full mt-3" onClick={() => (window.location.href = "/#pricing")}>
                      Upgrade to Pro
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
