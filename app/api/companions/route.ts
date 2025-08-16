import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  try {
    // Get JWT token from cookies
    const cookieStore = cookies()
    const token = cookieStore.get('auth-token')?.value

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const {
      name,
      subject,
      difficulty_level,
      teaching_style,
      personality_traits,
      custom_instructions,
      learning_objectives,
    } = body

    // Forward request to MERN backend
    const backendResponse = await fetch(`http://localhost:5001/api/companions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name,
        subject,
        difficulty_level,
        teaching_style,
        personality_traits,
        custom_instructions,
        learning_objectives,
      })
    })

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json()
      return NextResponse.json({ error: errorData.message || "Failed to create companion" }, { status: backendResponse.status })
    }

    const companion = await backendResponse.json()
    return NextResponse.json(companion)
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    // Get JWT token from cookies
    const cookieStore = cookies()
    const token = cookieStore.get('auth-token')?.value

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Forward request to MERN backend
    const backendResponse = await fetch(`http://localhost:5001/api/companions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json()
      return NextResponse.json({ error: errorData.message || "Failed to fetch companions" }, { status: backendResponse.status })
    }

    const companions = await backendResponse.json()
    return NextResponse.json(companions)
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
