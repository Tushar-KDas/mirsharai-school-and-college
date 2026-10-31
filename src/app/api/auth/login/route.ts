import { NextResponse } from 'next/server';
import { verifyUserCredentials, setSessionCookie, logAudit } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { identifier, password, locale = 'bn' } = body;

    if (!identifier || !password) {
      return NextResponse.json(
        { error: 'Identifier and password are required' },
        { status: 400 }
      );
    }

    const verification = await verifyUserCredentials(identifier, password);
    if (!verification) {
      return NextResponse.json(
        { error: 'INVALID_CREDENTIALS' },
        { status: 401 }
      );
    }

    const { user, payload } = verification;
    await setSessionCookie(payload);

    await logAudit(
      user.id,
      'LOGIN',
      'User',
      user.id,
      `User logged in with role ${user.role}`
    );

    // Map role to target dashboard
    let roleDashboard = `/${locale}/student/dashboard`;
    switch (user.role) {
      case 'SUPER_ADMIN':
        roleDashboard = `/${locale}/super-admin/dashboard`;
        break;
      case 'ADMIN':
        roleDashboard = `/${locale}/admin/dashboard`;
        break;
      case 'TEACHER':
        roleDashboard = `/${locale}/teacher/dashboard`;
        break;
      case 'STUDENT':
        roleDashboard = `/${locale}/student/dashboard`;
        break;
      case 'PARENT':
        roleDashboard = `/${locale}/parent/dashboard`;
        break;
      case 'ACCOUNTANT':
        roleDashboard = `/${locale}/accountant/dashboard`;
        break;
      case 'STAFF':
        roleDashboard = `/${locale}/staff/dashboard`;
        break;
      default:
        roleDashboard = `/${locale}/student/dashboard`;
    }

    return NextResponse.json({
      success: true,
      user: payload,
      dashboardUrl: roleDashboard,
    });
  } catch (error: any) {
    console.error('Login API error:', error);
    return NextResponse.json(
      { error: error?.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
