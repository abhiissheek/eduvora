"use server"

import { createClient } from "@/supabase/server"
import { redirect } from "next/navigation"

export async function signIn(prevState: any, formData: FormData) {
  console.log("[v0] Sign in action called")

  if (!formData) {
    return { error: "Form data is missing" }
  }

  const email = formData.get("email")
  const password = formData.get("password")

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  const supabase = createClient()

  try {
    console.log("[v0] Attempting to sign in with email:", email)

    const { error } = await supabase.auth.signInWithPassword({
      email: email.toString(),
      password: password.toString(),
    })

    if (error) {
      console.log("[v0] Sign in error:", error.message)
      return { error: error.message }
    }

    console.log("[v0] Sign in successful")
    return { success: true }
  } catch (error) {
    console.error("[v0] Login error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}

export async function signUp(prevState: any, formData: FormData) {
  console.log("[v0] Sign up action called")

  if (!formData) {
    return { error: "Form data is missing" }
  }

  const email = formData.get("email")
  const password = formData.get("password")
  const fullName = formData.get("fullName")

  if (!email || !password || !fullName) {
    return { error: "All fields are required" }
  }

  const supabase = createClient()

  try {
    console.log("[v0] Attempting to sign up with email:", email)

    const { data, error } = await supabase.auth.signUp({
      email: email.toString(),
      password: password.toString(),
      options: {
        emailRedirectTo:
          process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
          `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/dashboard`,
        data: {
          full_name: fullName.toString(),
        },
      },
    })

    if (error) {
      console.log("[v0] Sign up error:", error.message)
      return { error: error.message }
    }

    console.log("[v0] Sign up successful")
    return { success: "Check your email to confirm your account." }
  } catch (error) {
    console.error("[v0] Sign up error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}

export async function signOut() {
  const supabase = createClient()
  await supabase.auth.signOut()
  redirect("/login")
}

export async function forgotPassword(prevState: any, formData: FormData) {
  if (!formData) {
    return { error: "Form data is missing" }
  }

  const email = formData.get("email")

  if (!email) {
    return { error: "Email is required" }
  }

  const supabase = createClient()

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email.toString(), {
      redirectTo:
        process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
        `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/reset-password`,
    })

    if (error) {
      return { error: error.message }
    }

    return { success: "Check your email for password reset instructions." }
  } catch (error) {
    console.error("Forgot password error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}
