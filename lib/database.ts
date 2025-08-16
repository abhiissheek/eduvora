// Simple in-memory database for demo purposes
// In production, you would use a proper database like PostgreSQL, MongoDB, etc.

export interface User {
  id: string
  email: string
  fullName: string
  password: string
  createdAt: Date
  updatedAt: Date
}

class InMemoryDatabase {
  protected users: Map<string, User> = new Map()
  protected emailIndex: Map<string, string> = new Map()
  private initialized = false

  generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36)
  }

  async ensureInitialized() {
    if (this.initialized) {
      console.log('[Database] Already initialized, skipping...')
      return
    }
    
    console.log('[Database] ==> INITIALIZING DATABASE...')
    
    // Create test user immediately
    try {
      const bcrypt = await import('bcryptjs')
      console.log('[Database] ==> Hashing password...')
      const hashedPassword = await bcrypt.hash('password123', 12)
      
      const testUser: User = {
        id: this.generateId(),
        email: 'test@example.com',
        password: hashedPassword,
        fullName: 'Test User',
        createdAt: new Date(),
        updatedAt: new Date()
      }

      console.log('[Database] ==> Adding test user to database...')
      this.users.set(testUser.id, testUser)
      this.emailIndex.set(testUser.email, testUser.id)
      
      console.log('[Database] ==> SUCCESS: Test user initialized with ID:', testUser.id)
      console.log('[Database] ==> Email index has:', this.emailIndex.get('test@example.com'))
      console.log('[Database] ==> Total users now:', this.users.size)
      
      this.initialized = true
    } catch (error) {
      console.log('[Database] ==> ERROR initializing test user:', error)
    }
  }

  async createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    if (this.emailIndex.has(userData.email)) {
      throw new Error('User with this email already exists')
    }

    const user: User = {
      id: this.generateId(),
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    this.users.set(user.id, user)
    this.emailIndex.set(user.email, user.id)
    
    return user
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const userId = this.emailIndex.get(email)
    if (!userId) return null
    return this.users.get(userId) || null
  }

  async getUserById(id: string): Promise<User | null> {
    return this.users.get(id) || null
  }

  async updateUser(id: string, updates: Partial<Omit<User, 'id' | 'createdAt'>>): Promise<User | null> {
    const user = this.users.get(id)
    if (!user) return null

    const updatedUser = {
      ...user,
      ...updates,
      updatedAt: new Date()
    }

    this.users.set(id, updatedUser)
    return updatedUser
  }

  async deleteUser(id: string): Promise<boolean> {
    const user = this.users.get(id)
    if (!user) return false

    this.users.delete(id)
    this.emailIndex.delete(user.email)
    return true
  }

  // Get all users (for admin purposes)
  async getAllUsers(): Promise<User[]> {
    console.log('[Database] Total users:', this.users.size)
    console.log('[Database] Users:', Array.from(this.users.values()).map(u => ({ id: u.id, email: u.email, fullName: u.fullName })))
    return Array.from(this.users.values())
  }
}

// Create a simple hardcoded user for testing
const HARDCODED_USERS = new Map([
  ['test@example.com', {
    id: 'test-user-1',
    email: 'test@example.com',
    password: '$2b$12$deu015y.RaCPC/wRhGbFf.h2e26NwByeMnJUP62hktnkzF6IkjzuC', // password123
    fullName: 'Test User',
    createdAt: new Date(),
    updatedAt: new Date()
  }]
])

class SimpleDatabase extends InMemoryDatabase {
  async getUserByEmail(email: string): Promise<User | null> {
    // Check hardcoded users first
    const hardcodedUser = HARDCODED_USERS.get(email)
    if (hardcodedUser) {
      return hardcodedUser
    }
    
    // Then check dynamic users
    const userId = this.emailIndex.get(email)
    if (!userId) return null
    return this.users.get(userId) || null
  }
}

// Export singleton instance
export const database = new SimpleDatabase()
