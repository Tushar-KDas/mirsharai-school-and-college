import { NextResponse } from 'next/server';
import { clearSessionCookie, getSession, logAudit } from '@/lib/auth';

export async function POST() {
  const session = await getSession();
  if (session) {
    await logAudit(session.userId, 'LOGOUT', 'User', session.userId, 'User logged out');
  }
  await clearSessionCookie();
  return NextResponse.json({ success: true, message: 'Logged out successfully' });
}
