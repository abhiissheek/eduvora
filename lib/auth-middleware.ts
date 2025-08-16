import { NextRequest, NextResponse } from 'next/server'
import { JWTAuth } from './jwt'

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    userId: string
    email: string
    fullName: string
  }
}

export function withAuth(handler: (req: AuthenticatedRequest) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    try {
      // Get token from cookie
      const token = req.cookies.get('auth-token')?.value

      if (!token) {
        return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
      }

      // Verify token
      const payload = JWTAuth.verifyToken(token)
      if (!payload) {
        return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 })
      }

      // Add user info to request
      const authenticatedReq = req as AuthenticatedRequest
      authenticatedReq.user = {
        userId: payload.userId,
        email: payload.email,
        fullName: payload.fullName
      }

      return handler(authenticatedReq)
    } catch (error) {
      console.error('Auth middleware error:', error)
      return NextResponse.json({ error: 'Authentication failed' }, { status: 401 })
    }
  }
}

export async function getCurrentUser(req: NextRequest) {
  try {
    const token = req.cookies.get('auth-token')?.value
    if (!token) return null

    const payload = JWTAuth.verifyToken(token)
    if (!payload) return null

    return {
      userId: payload.userId,
      email: payload.email,
      fullName: payload.fullName
    }
  } catch (error) {
    console.error('Get current user error:', error)
    return null
  }
}
