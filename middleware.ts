import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/signup', '/forgot-password', '/', '/about', '/blog', '/careers']
  const isPublicRoute = publicRoutes.some(route => pathname === route) || pathname.startsWith('/api/')

  if (isPublicRoute) {
    return NextResponse.next()
  }

  // Check for JWT auth token
  const authToken = request.cookies.get('auth-token')?.value
  const userData = request.cookies.get('user-data')?.value

  if (!authToken || !userData) {
    // Redirect to login if no auth token or user data
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
