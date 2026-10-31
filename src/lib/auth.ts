import { cookies } from 'next/headers';
import prisma from './prisma';
import bcrypt from 'bcryptjs';

export interface SessionPayload {
  userId: string;
  id?: string;
  username: string;
  role: string; // SUPER_ADMIN, ADMIN, TEACHER, STUDENT, PARENT, ACCOUNTANT, STAFF
  email?: string | null;
  staffId?: string;
  studentId?: string;
  guardianId?: string;
  displayName: string;
}

const SESSION_COOKIE_NAME = 'msc_auth_session';

export function createSessionToken(payload: SessionPayload): string {
  const normalized = { ...payload, id: payload.id || payload.userId, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 };
  return Buffer.from(JSON.stringify(normalized)).toString('base64');
}

export function parseSessionToken(token: string): SessionPayload | null {
  try {
    const raw = Buffer.from(token, 'base64').toString('utf-8');
    const parsed = JSON.parse(raw);
    if (parsed.exp && parsed.exp < Date.now()) {
      return null;
    }
    if (parsed && !parsed.id) parsed.id = parsed.userId;
    return parsed;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return parseSessionToken(token);
}

export async function setSessionCookie(payload: SessionPayload) {
  const token = createSessionToken(payload);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/',
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function requireAuth(): Promise<SessionPayload> {
  const session = await getSession();
  if (!session) {
    throw new Error('UNAUTHORIZED');
  }
  return session;
}

export async function requireRole(allowedRoles: string[]): Promise<SessionPayload> {
  const session = await requireAuth();
  if (!allowedRoles.includes(session.role)) {
    throw new Error('FORBIDDEN');
  }
  return session;
}

export async function verifyUserCredentials(identifier: string, plainPassword: string) {
  // Allow login by username, email, employeeId, or studentId
  const cleanId = identifier.trim();
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { username: cleanId },
        { email: cleanId },
        { studentProfile: { studentId: cleanId } },
        { teacherProfile: { employeeId: cleanId } },
      ],
      isActive: true,
    },
    include: {
      teacherProfile: true,
      studentProfile: true,
      guardianProfile: true,
    },
  });

  if (!user) return null;

  const isMatch = await bcrypt.compare(plainPassword, user.passwordHash);
  if (!isMatch) return null;

  let displayName = user.username;
  if (user.teacherProfile) displayName = user.teacherProfile.nameEn;
  else if (user.studentProfile) displayName = user.studentProfile.nameEn;
  else if (user.guardianProfile) displayName = user.guardianProfile.nameEn;

  const payload: SessionPayload = {
    userId: user.id,
    username: user.username,
    role: user.role,
    email: user.email,
    displayName,
    staffId: user.teacherProfile?.id,
    studentId: user.studentProfile?.id,
    guardianId: user.guardianProfile?.id,
  };

  return { user, payload };
}

export async function logAudit(
  userId: string | null,
  action: string,
  entity: string,
  entityId?: string,
  details?: string
) {
  try {
    await prisma.auditLog.create({
      data: {
        userId,
        action,
        entity,
        entityId: entityId || null,
        details: details || null,
      },
    });
  } catch (err) {
    console.error('Audit log write error:', err);
  }
}
