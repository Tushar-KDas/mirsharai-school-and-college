import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function POST(request: Request) {
  const session = await getSession();
  if (!session || (session.role !== 'SUPER_ADMIN' && session.role !== 'ADMIN')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { titleBn, titleEn, descriptionBn, descriptionEn, locationBn, locationEn, startDate, endDate, type } = body;

    const event = await prisma.academicEvent.create({
      data: {
        titleBn,
        titleEn,
        descriptionBn: descriptionBn || '',
        descriptionEn: descriptionEn || '',
        type: type || 'EVENT',
        locationBn: locationBn || 'কলেজ ক্যাম্পাস',
        locationEn: locationEn || 'College Campus',
        startDate: new Date(startDate || Date.now()),
        endDate: new Date(endDate || startDate || Date.now()),
        isPublic: true,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: session.userId,
        action: 'EVENT_CREATED',
        entity: 'AcademicEvent',
        entityId: event.id,
        details: `Created event: ${titleEn}`,
      },
    });

    return NextResponse.json({ success: true, event });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Event creation failed' }, { status: 500 });
  }
}
