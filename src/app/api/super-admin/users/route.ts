import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export async function GET(request: Request) {
  const session = await getSession();
  if (!session || (session.role !== 'SUPER_ADMIN' && session.role !== 'ADMIN')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const role = searchParams.get('role');
  const search = searchParams.get('search')?.toLowerCase();

  const users = await prisma.user.findMany({
    where: {
      ...(role ? { role } : {}),
      ...(search
        ? {
            OR: [
              { username: { contains: search } },
              { email: { contains: search } },
            ],
          }
        : {}),
    },
    include: {
      teacherProfile: true,
      studentProfile: true,
      guardianProfile: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ success: true, users });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session || session.role !== 'SUPER_ADMIN') {
    return NextResponse.json({ error: 'Only Super Admin can create accounts' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { username, email, password, role, nameBn, nameEn } = body;

    if (!username || !password || !role) {
      return NextResponse.json({ error: 'Username, password and role are required' }, { status: 400 });
    }

    const existing = await prisma.user.findFirst({
      where: {
        OR: [{ username }, ...(email ? [{ email }] : [])],
      },
    });

    if (existing) {
      return NextResponse.json({ error: 'Username or email already exists' }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email: email || null,
        passwordHash,
        role,
        isActive: true,
      },
    });

    // Record audit log
    await prisma.auditLog.create({
      data: {
        userId: session.userId,
        action: 'USER_CREATED',
        entity: 'User',
        entityId: newUser.id,
        details: `Created new user ${username} with role ${role}`,
      },
    });

    return NextResponse.json({ success: true, user: newUser });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Creation failed' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const session = await getSession();
  if (!session || session.role !== 'SUPER_ADMIN') {
    return NextResponse.json({ error: 'Only Super Admin can modify accounts' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { id, isActive, newPassword, role } = body;

    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const updateData: any = {};
    if (typeof isActive === 'boolean') updateData.isActive = isActive;
    if (role) updateData.role = role;
    if (newPassword) {
      updateData.passwordHash = await bcrypt.hash(newPassword, 10);
    }

    const updated = await prisma.user.update({
      where: { id },
      data: updateData,
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        userId: session.userId,
        action: 'USER_UPDATED',
        entity: 'User',
        entityId: id,
        details: `Updated user ID ${id}: ${JSON.stringify(updateData)}`,
      },
    });

    return NextResponse.json({ success: true, user: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Update failed' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getSession();
  if (!session || session.role !== 'SUPER_ADMIN') {
    return NextResponse.json({ error: 'Only Super Admin can delete accounts' }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    if (id === session.userId) {
      return NextResponse.json({ error: 'Cannot delete your own super admin account' }, { status: 400 });
    }

    await prisma.user.delete({
      where: { id },
    });

    await prisma.auditLog.create({
      data: {
        userId: session.userId,
        action: 'USER_DELETED',
        entity: 'User',
        entityId: id,
        details: `Deleted user ID ${id}`,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Deletion failed' }, { status: 500 });
  }
}
