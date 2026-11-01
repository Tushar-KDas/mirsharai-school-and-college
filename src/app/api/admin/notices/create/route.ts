import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { saveNoticeCloud } from '@/lib/cloudStore';

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

    // Cloud persistence for global Vercel serverless availability
    try {
      await saveNoticeCloud(notice);
    } catch (e) {
      console.warn('Cloud sync error for notice:', e);
    }

    await prisma.auditLog.create({
      data: {
        userId: session.userId,
        action: 'NOTICE_PUBLISHED',
        entity: 'Notice',
        entityId: notice.id,
        details: `Published notice: ${titleEn}`,
      },
    });

    try {
      revalidatePath('/', 'layout');
      revalidatePath('/[locale]', 'page');
      revalidatePath('/[locale]/notices', 'page');
      revalidatePath('/bn');
      revalidatePath('/en');
      revalidatePath('/bn/notices');
      revalidatePath('/en/notices');
    } catch {}

    return NextResponse.json({ success: true, notice });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Notice publication failed' }, { status: 500 });
  }
}
