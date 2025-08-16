import { NextResponse } from 'next/server'
import { database } from '@/lib/database'

export async function GET() {
  try {
    console.log('[DEBUG] Getting all users...')
    const users = await database.getAllUsers()
    
    return NextResponse.json({
      success: true,
      userCount: users.length,
      users: users.map(u => ({
        id: u.id,
        email: u.email,
        fullName: u.fullName,
        hasPassword: !!u.password
      }))
    })
  } catch (error) {
    console.error('[DEBUG] Error:', error)
    return NextResponse.json({ error: 'Failed to get users' }, { status: 500 })
  }
}
