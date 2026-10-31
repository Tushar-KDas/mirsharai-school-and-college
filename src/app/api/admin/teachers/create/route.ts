import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function POST(request: Request) {
  const session = await getSession();
  if (!session || (session.role !== 'ADMIN' && session.role !== 'SUPER_ADMIN')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { nameBn, nameEn, designationBn, designationEn, department, phone, email, qualification } = body;

    if (!nameBn || !nameEn || !designationEn || !phone) {
      return NextResponse.json({ error: 'Name, Designation and Phone are required' }, { status: 400 });
    }

    const count = await prisma.staff.count({ where: { isTeacher: true } });
    const employeeId = `MSC-TEA-${(count + 1).toString().padStart(3, '0')}`;

    const newTeacher = await prisma.staff.create({
      data: {
        employeeId,
        nameBn,
        nameEn,
        designationBn: designationBn || 'সহকারী শিক্ষক',
        designationEn: designationEn || 'Assistant Teacher',
        department: department || 'General',
        phone,
        email: email || null,
        qualification: qualification || null,
        isTeacher: true,
        order: count + 1,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: session.userId,
        action: 'TEACHER_ADDED',
        entity: 'Staff',
        entityId: newTeacher.id,
        details: `Added teacher: ${nameEn} (${employeeId})`,
      },
    });

    return NextResponse.json({ success: true, teacher: newTeacher });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Creation failed' }, { status: 500 });
  }
}
