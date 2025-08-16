import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'

export interface JWTPayload {
  userId: string
  email: string
  fullName: string
}

export class JWTAuth {
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 12
    return bcrypt.hash(password, saltRounds)
  }

  static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword)
  }

  static generateToken(payload: JWTPayload): string {
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
      issuer: 'eduvora',
      audience: 'eduvora-users'
    } as jwt.SignOptions)
  }

  static verifyToken(token: string): JWTPayload | null {
    try {
      const decoded = jwt.verify(token, JWT_SECRET, {
        issuer: 'eduvora',
        audience: 'eduvora-users'
      }) as JWTPayload
      return decoded
    } catch (error) {
      console.error('JWT verification failed:', error)
      return null
    }
  }

  static extractTokenFromRequest(request: Request): string | null {
    const authHeader = request.headers.get('Authorization')
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7)
    }
    return null
  }
}
