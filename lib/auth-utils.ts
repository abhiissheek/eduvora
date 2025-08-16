import { cookies } from "next/headers"

export interface User {
  _id: string
  email: string
  name: string
  role: string
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = cookies()
    const userDataCookie = cookieStore.get('user-data')
    
    if (!userDataCookie) {
      return null
    }

    const userData = JSON.parse(userDataCookie.value)
    return userData
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

export async function getAuthToken(): Promise<string | null> {
  try {
    const cookieStore = cookies()
    const tokenCookie = cookieStore.get('auth-token')
    
    return tokenCookie?.value || null
  } catch (error) {
    console.error('Error getting auth token:', error)
    return null
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser()
  const token = await getAuthToken()
  
  return !!(user && token)
}

export async function requireAuth(): Promise<User> {
  const user = await getCurrentUser()
  
  if (!user) {
    throw new Error('Authentication required')
  }
  
  return user
}
