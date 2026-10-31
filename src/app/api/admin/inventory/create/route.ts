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
    const { itemNameBn, itemNameEn, category, quantity, unit, location } = body;

    if (!itemNameBn || !itemNameEn || !category || !quantity) {
      return NextResponse.json({ error: 'Name, category, and quantity are required' }, { status: 400 });
    }

    const item = await prisma.inventoryItem.create({
      data: {
        itemNameBn,
        itemNameEn,
        category,
        quantity: parseInt(quantity) || 1,
        unit: unit || 'PCS',
        location: location || 'Campus Store',
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: session.userId,
        action: 'INVENTORY_ADDED',
        entity: 'InventoryItem',
        entityId: item.id,
        details: `Added inventory asset: ${itemNameEn}`,
      },
    });

    return NextResponse.json({ success: true, item });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Inventory item creation failed' }, { status: 500 });
  }
}
