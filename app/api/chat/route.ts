import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Get auth token from cookies
    const cookieStore = cookies()
    const authToken = cookieStore.get('auth-token')?.value
    
    if (!authToken) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }
    
    // Call MERN backend chat API
    const response = await fetch('http://localhost:5001/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify(body),
    })
    
    const result = await response.json()
    
    return NextResponse.json(result, { status: response.status })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json({ error: 'Chat request failed' }, { status: 500 })
  }
}
