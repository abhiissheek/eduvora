import { NextRequest, NextResponse } from 'next/server'
import { JWTAuth } from '@/lib/jwt'
import { database } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, fullName } = body

    if (!email || !password || !fullName) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await database.getUserByEmail(email)
    if (existingUser) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 409 })
    }

    // Hash password
    const hashedPassword = await JWTAuth.hashPassword(password)

    // Create user
    const user = await database.createUser({
      email,
      password: hashedPassword,
      fullName
    })

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
    console.error('Signup API error:', error)
    return NextResponse.json({ error: error.message || 'Signup failed' }, { status: 500 })
  }
}
