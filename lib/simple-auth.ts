// Simple hardcoded users for testing
const USERS = [
  { email: 'test@example.com', password: 'password123', name: 'Test User' },
  { email: 'admin@example.com', password: 'admin123', name: 'Admin User' }
]

export function validateUser(email: string, password: string) {
  console.log("[DEBUG] validateUser called with:", email, password)
  console.log("[DEBUG] Available users:", USERS)
  const user = USERS.find(user => user.email === email && user.password === password)
  console.log("[DEBUG] Found user:", user)
  return user
}

export function getUser(email: string) {
  return USERS.find(user => user.email === email)
}
