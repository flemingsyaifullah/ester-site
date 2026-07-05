import { SignJWT, jwtVerify } from 'jose';

function getSecret(): Uint8Array {
  const s = import.meta.env.JWT_SECRET;
  if (!s) throw new Error('JWT_SECRET environment variable is not set');
  return new TextEncoder().encode(s);
}

export async function signToken(payload: Record<string, unknown>): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('8h')
    .sign(getSecret());
}

export async function verifyToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, getSecret());
    return true;
  } catch {
    return false;
  }
}
