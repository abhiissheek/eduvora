"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface PricingCardProps {
  plan: "free" | "core" | "pro"
  title: string
  price: string
  description: string
  features: string[]
  isPopular?: boolean
  className?: string
}

export function PricingCard({ plan, title, price, description, features, isPopular, className }: PricingCardProps) {
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async () => {
    if (plan === "free") {
      // Redirect to signup for free plan
      window.location.href = "/signup"
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/payments/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan }),
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error(data.error || "Failed to create checkout session")
      }
    } catch (error) {
      console.error("Subscription error:", error)
      alert("Failed to start subscription process. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className={`p-6 rounded-2xl relative ${className}`}>
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-[#8B6F47] text-white px-4 py-1 rounded-full text-sm font-semibold">Most Popular</span>
        </div>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <div className="flex items-baseline space-x-1">
            <span className="text-3xl font-bold">{price}</span>
            {plan !== "free" && <span className="text-sm opacity-70">/mo</span>}
          </div>
          <p className="text-sm opacity-80">{description}</p>
        </div>

        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center space-x-2 text-sm">
              <span className="text-green-500">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          className="w-full"
          onClick={handleSubscribe}
          disabled={loading}
          variant={plan === "free" ? "outline" : "default"}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : plan === "free" ? (
            "Get Started Free"
          ) : (
            "Start Learning"
          )}
        </Button>
      </div>
    </Card>
  )
}
