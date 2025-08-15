"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"

interface SubscriptionManagerProps {
  subscription: {
    tier: string
    status: string
  }
}

export function SubscriptionManager({ subscription }: SubscriptionManagerProps) {
  const [loading, setLoading] = useState(false)

  const handleManageSubscription = async () => {
    setLoading(true)

    try {
      const response = await fetch("/api/payments/portal", {
        method: "POST",
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error(data.error || "Failed to create portal session")
      }
    } catch (error) {
      console.error("Portal error:", error)
      alert("Failed to open billing portal. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "past_due":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription</CardTitle>
        <CardDescription>Manage your subscription and billing</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">{getPlanName(subscription.tier)}</p>
            <p className="text-sm text-gray-600">{subscription.tier === "free" ? "No billing" : "Billed monthly"}</p>
          </div>
          <Badge className={getStatusColor(subscription.status)}>{subscription.status}</Badge>
        </div>

        {subscription.tier !== "free" && (
          <Button
            onClick={handleManageSubscription}
            disabled={loading}
            variant="outline"
            className="w-full bg-transparent"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Manage Subscription"
            )}
          </Button>
        )}

        {subscription.tier === "free" && (
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Upgrade to unlock more features</p>
            <Button className="w-full" onClick={() => (window.location.href = "/#pricing")}>
              View Plans
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
