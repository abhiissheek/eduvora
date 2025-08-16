import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Call MERN backend
    const response = await fetch('http://localhost:5001/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    
    const result = await response.json()
    
    return NextResponse.json(result, { status: response.status })
  } catch (error) {
    console.error('Login API error:', error)
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}
