// "use client"

// import type React from "react"

// import { useActionState } from "react"
// import { useFormStatus } from "react-dom"
// import { useRouter } from "next/navigation"
// import { useEffect } from "react"
// import Link from "next/link"
// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Loader2 } from "lucide-react"
// import { signIn } from "@/lib/actions"

// function SubmitButton() {
//   const { pending } = useFormStatus()

//   return (
//     <Button type="submit" disabled={pending} className="bg-[#A67C52] w-full hover:bg-[#BF926A]">
//       {pending ? (
//         <>
//           <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//           Signing in...
//         </>
//       ) : (
//         "Login"
//       )}
//     </Button>
//   )
// }

// export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
//   const router = useRouter()
//   const [state, formAction] = useActionState(signIn, null)

//   useEffect(() => {
//     if (state?.success) {
//       router.push("/dashboard")
//     }
//   }, [state, router])

//   return (
//     <div className={cn("flex flex-col gap-6", className)} {...props}>
//       <Card>
//         <CardHeader>
//           <CardTitle>Login to your account</CardTitle>
//           <CardDescription>Enter your email below to login to your account</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form action={formAction}>
//             {state?.error && (
//               <div className="bg-red-500/10 border border-red-500/50 text-red-700 px-4 py-3 rounded mb-4">
//                 {state.error}
//               </div>
//             )}

//             <div className="flex flex-col gap-6">
//               <div className="grid gap-3">
//                 <Label htmlFor="email">Email</Label>
//                 <Input id="email" name="email" type="email" placeholder="m@example.com" required />
//               </div>
//               <div className="grid gap-3">
//                 <div className="flex items-center">
//                   <Label htmlFor="password">Password</Label>
//                   <Link
//                     href="/forgot-password"
//                     className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
//                   >
//                     Forgot your password?
//                   </Link>
//                 </div>
//                 <Input id="password" name="password" type="password" required />
//               </div>
//               <div className="flex flex-col gap-3">
//                 <SubmitButton />
//               </div>
//             </div>
//             <div className="mt-4 text-center text-sm">
//               Don&apos;t have an account?{" "}
//               <Link href="/signup" className="underline underline-offset-4">
//                 Sign up
//               </Link>
//             </div>
//           </form>
//         </CardContent>
//         <CardFooter className="flex justify-center">
//           <Link href="/" className="text-sm underline-offset-4 hover:underline">
//             Back to Homepage
//           </Link>
//         </CardFooter>
//       </Card>
//     </div>
//   )
// }


"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { signIn } from "@/lib/actions"

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const router = useRouter()
  const [state, setState] = useState<{ error?: string; success?: boolean } | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setState(null)

    const form = e.currentTarget
    const formData = new FormData(form)
    
   
    console.log('Form data:', {
      email: formData.get('email'),
      password: formData.get('password')
    })
    
    try {
      const result = await signIn(null, formData)
      console.log('Sign in result:', result)
      setState(result)
      

      if (result && result.success) {
        console.log('Redirecting to dashboard...')
        window.location.href = "/dashboard"
      }
    } catch (error: any) {
      console.error('Sign in error:', error)
      setState({ error: error.message || 'An error occurred during sign in' })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (state?.success) {
      router.push("/dashboard")
    }
  }, [state, router])

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {state?.error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-700 px-4 py-3 rounded mb-4">
                {state.error}
              </div>
            )}

            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  placeholder="m@example.com" 
                  autoComplete="email"
                  required 
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input 
                  id="password" 
                  name="password" 
                  type="password" 
                  autoComplete="current-password"
                  required 
                  disabled={isLoading}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button 
                  type="submit" 
                  disabled={isLoading} 
                  className="bg-[#A67C52] w-full hover:bg-[#BF926A] disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/" className="text-sm underline-offset-4 hover:underline">
            Back to Homepage
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}