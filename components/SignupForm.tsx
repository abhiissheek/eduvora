"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { signUp } from "@/lib/actions"

export function SignupForm({ className, ...props }: React.ComponentProps<"div">) {
  const [state, setState] = useState<{ error?: string; success?: string; message?: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setState(null)

    const formData = new FormData(e.currentTarget)
    const result = await signUp(null, formData)
    console.log('Signup result:', result)
    
    if (result.success) {
      setState({ success: result.message || "Registration successful!" })
      setIsLoading(false)
      console.log('Signup successful, redirecting...')
      window.location.href = "/dashboard"
    } else {
      setState({ error: result.error })
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>Enter your details below to create a new account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {state?.error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-700 px-4 py-3 rounded mb-4">
                {state.error}
              </div>
            )}

            {state?.success && (
              <div className="bg-green-500/10 border border-green-500/50 text-green-700 px-4 py-3 rounded mb-4">
                {state.success}
              </div>
            )}

            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" type="text" placeholder="John Doe" autoComplete="name" required />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="m@example.com" autoComplete="email" required />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" autoComplete="new-password" required />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" disabled={isLoading} className="bg-[#A67C52] w-full hover:bg-[#BF926A]">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
