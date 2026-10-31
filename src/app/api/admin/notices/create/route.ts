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
    const { titleBn, titleEn, contentBn, contentEn, category, isPinned, attachmentUrl } = body;

    if (!titleBn || !titleEn || !contentBn || !contentEn) {
      return NextResponse.json({ error: 'Title and content are required in both languages' }, { status: 400 });
    }

    const notice = await prisma.notice.create({
      data: {
        titleBn,
        titleEn,
        contentBn,
        contentEn,
        category: category || 'GENERAL',
        isPinned: isPinned === true,
        attachmentUrl: attachmentUrl || null,
        status: 'PUBLISHED',
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: session.userId,
        action: 'NOTICE_PUBLISHED',
        entity: 'Notice',
        entityId: notice.id,
        details: `Published notice: ${titleEn}`,
      },
    });

    return NextResponse.json({ success: true, notice });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Notice publication failed' }, { status: 500 });
  }
}
