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
    const { title, author, isbn, category, copiesTotal, rackLocation } = body;

    if (!title || !author || !category) {
      return NextResponse.json({ error: 'Title, author, and category are required' }, { status: 400 });
    }

    const total = parseInt(copiesTotal) || 1;

    const book = await prisma.libraryBook.create({
      data: {
        title,
        author,
        isbn: isbn || null,
        category,
        copiesTotal: total,
        copiesAvailable: total,
        rackLocation: rackLocation || null,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: session.userId,
        action: 'BOOK_ADDED',
        entity: 'LibraryBook',
        entityId: book.id,
        details: `Added library book: ${title}`,
      },
    });

    return NextResponse.json({ success: true, book });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Book addition failed' }, { status: 500 });
  }
}
