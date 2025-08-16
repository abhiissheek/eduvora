import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Test auth request:', body)
    
    // Test connection to MERN backend
    const response = await fetch('http://localhost:5001/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    
    console.log('Backend response status:', response.status)
    const result = await response.json()
    console.log('Backend response:', result)
    
    return NextResponse.json(result, { status: response.status })
  } catch (error) {
    console.error('Test auth error:', error)
    return NextResponse.json({ error: 'Connection failed' }, { status: 500 })
  }
}
