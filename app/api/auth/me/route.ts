import { NextRequest, NextResponse } from 'next/server'
import { JWTAuth } from '@/lib/jwt'
import { database } from '@/lib/database'

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const payload = JWTAuth.verifyToken(token)
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    // Get fresh user data from database
    const user = await database.getUserById(payload.userId)
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Return user data without password
    return NextResponse.json({
      userId: user.id,
      email: user.email,
      fullName: user.fullName
    })
  } catch (error) {
    console.error('Auth me error:', error)
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 })
  }
}
