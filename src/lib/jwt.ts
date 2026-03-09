import jwt from 'jsonwebtoken';
import { cookies, headers } from 'next/headers';

const SECRET = process.env.JWT_SECRET || 'driver-app-secret-key-change-in-production';

export interface TokenPayload {
  userId: number;
  email: string;
  role: 'ADMIN' | 'SUBSCRIBER';
}

export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, SECRET) as TokenPayload;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<TokenPayload | null> {
  // 1. Try Bearer token from Authorization header (for mobile apps)
  const headerStore = await headers();
  const authHeader = headerStore.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.slice(7);
    const payload = verifyToken(token);
    if (payload) return payload;
  }
  // 2. Fallback to cookie (for web app)
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) return null;
  return verifyToken(token);
}
