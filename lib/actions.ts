"use server"

import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export async function signIn(prevState: any, formData: FormData) {
  if (!formData) {
    return { error: "Form data is missing" }
  }

  const email = formData.get("email")
  const password = formData.get("password")

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  try {
    console.log('Attempting login with:', { email: email.toString(), password: '***' })
    
    // Call MERN backend API via Next.js API route
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.toString(),
        password: password.toString(),
      }),
    })

    console.log('Response status:', response.status)
    console.log('Response headers:', Object.fromEntries(response.headers.entries()))

    const result = await response.json()
    console.log('Login API result:', result)

    if (!response.ok || !result.success) {
      console.log('Login failed:', result)
      return { error: result.message || "Login failed" }
    }

    // Set JWT token in cookie
    const cookieStore = cookies()
    cookieStore.set('auth-token', result.data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    })

    // Also set user data for easy access
    cookieStore.set('user-data', JSON.stringify({
      _id: result.data._id,
      email: result.data.email,
      name: result.data.name,
      role: result.data.role
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    })

    console.log('Login successful, cookies set')
    return { success: true }
  } catch (error) {
    console.error('Login error:', error)
    return { error: "Network error. Please try again." }
  }
}

export async function signUp(prevState: any, formData: FormData) {
  if (!formData) {
    return { error: "Form data is missing" }
  }

  const name = formData.get("name")
  const email = formData.get("email")
  const password = formData.get("password")

  if (!name || !email || !password) {
    return { error: "Name, email and password are required" }
  }

  try {
    console.log('Attempting signup with:', { name: name.toString(), email: email.toString(), password: '***' })
    
    // Call MERN backend API via Next.js API route
    const response = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name.toString(),
        email: email.toString(),
        password: password.toString(),
      }),
    })

    console.log('Signup response status:', response.status)

    const result = await response.json()

    if (!response.ok || !result.success) {
      return { error: result.message || "Registration failed" }
    }

    // Set JWT token in cookie
    const cookieStore = cookies()
    cookieStore.set('auth-token', result.data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    })

    // Also set user data for easy access
    cookieStore.set('user-data', JSON.stringify({
      _id: result.data._id,
      email: result.data.email,
      name: result.data.name,
      role: result.data.role
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    })

    return { success: true, message: "Registration successful!" }
  } catch (error) {
    console.error('Registration error:', error)
    return { error: "Network error. Please try again." }
  }
}

export async function signOut() {
  // Clear the auth cookies
  const cookieStore = cookies()
  cookieStore.delete('auth-token')
  cookieStore.delete('user-data')
  redirect("/login")
}

export async function forgotPassword(prevState: any, formData: FormData) {
  return { error: "Password reset functionality not implemented yet." }
}
