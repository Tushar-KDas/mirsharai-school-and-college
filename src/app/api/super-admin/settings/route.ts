import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
  const setting = await prisma.schoolSetting.findFirst();
  return NextResponse.json({ success: true, setting });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session || session.role !== 'SUPER_ADMIN') {
    return NextResponse.json({ error: 'Only Super Admin can edit institution settings' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const existing = await prisma.schoolSetting.findFirst();

    let updated;
    if (existing) {
      updated = await prisma.schoolSetting.update({
        where: { id: existing.id },
        data: {
          nameBn: body.nameBn || existing.nameBn,
          nameEn: body.nameEn || existing.nameEn,
          eiin: body.eiin || existing.eiin,
          collegeCode: body.collegeCode || existing.collegeCode,
          establishedYear: parseInt(body.establishedYear || body.estdYear) || 1972,
          principalNameBn: body.principalNameBn || existing.principalNameBn,
          principalNameEn: body.principalNameEn || existing.principalNameEn,
          phone: body.phone || existing.phone,
          email: body.email || existing.email,
          addressBn: body.addressBn || existing.addressBn,
          addressEn: body.addressEn || existing.addressEn,
        },
      });
    } else {
      updated = await prisma.schoolSetting.create({
        data: {
          nameBn: body.nameBn || 'মিরসরাই স্কুল এন্ড কলেজ',
          nameEn: body.nameEn || 'Mirsharai School and College',
          eiin: body.eiin || '104523',
          collegeCode: body.collegeCode || '3201',
          establishedYear: parseInt(body.establishedYear || body.estdYear) || 1972,
          principalNameBn: body.principalNameBn || 'প্রফেসর ড. মোহাম্মদ রফিকুল ইসলাম',
          principalNameEn: body.principalNameEn || 'Prof. Dr. Mohammad Rafiqul Islam',
          phone: body.phone || '+880 1812-345678',
          email: body.email || 'info@mirsharaicollege.edu.bd',
          addressBn: body.addressBn || 'মিরসরাই, চট্টগ্রাম, বাংলাদেশ',
          addressEn: body.addressEn || 'Mirsharai, Chattogram, Bangladesh',
        },
      });
    }

    // Audit log
    await prisma.auditLog.create({
      data: {
        userId: session.userId,
        action: 'SETTINGS_UPDATED',
        entity: 'SchoolSetting',
        entityId: updated.id,
        details: `Updated institutional configuration`,
      },
    });

    return NextResponse.json({ success: true, setting: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Settings update failed' }, { status: 500 });
  }
}
