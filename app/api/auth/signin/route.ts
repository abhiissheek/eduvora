import { NextRequest, NextResponse } from 'next/server'
import { JWTAuth } from '@/lib/jwt'
import { database } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    // Find user by email
    const user = await database.getUserByEmail(email)
    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    // Verify password
    const isPasswordValid = await JWTAuth.comparePassword(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    // Generate JWT token
    const token = JWTAuth.generateToken({
      userId: user.id,
      email: user.email,
      fullName: user.fullName
    })

    // Create response with token cookie
    const response = NextResponse.json({
      success: true,
      user: {
        userId: user.id,
        email: user.email,
        fullName: user.fullName
      }
    })

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/'
    })

    return response
  } catch (error: any) {
    console.error('Signin API error:', error)
    return NextResponse.json({ error: error.message || 'Signin failed' }, { status: 500 })
  }
}
