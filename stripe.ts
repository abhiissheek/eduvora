import Stripe from "stripe"

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set")
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
})

export const PRICE_IDS = {
  core: process.env.STRIPE_CORE_PRICE_ID || "price_core_monthly",
  pro: process.env.STRIPE_PRO_PRICE_ID || "price_pro_monthly",
}

export const PLAN_LIMITS = {
  free: {
    companions: 1,
    sessions_per_month: 10,
    features: ["basic_ai", "progress_tracking"],
  },
  core: {
    companions: 5,
    sessions_per_month: 100,
    features: ["enhanced_ai", "progress_tracking", "custom_personalities"],
  },
  pro: {
    companions: -1, // unlimited
    sessions_per_month: -1, // unlimited
    features: ["premium_ai", "progress_tracking", "custom_personalities", "priority_support", "advanced_analytics"],
  },
}
