import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function POST(request: Request) {
  const session = await getSession();
  if (!session || (session.role !== 'SUPER_ADMIN' && session.role !== 'ADMIN' && session.role !== 'ACCOUNTANT')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { voucherNo, category, amount, description, expenseDate, approvedBy } = body;

    if (!voucherNo || !category || !amount || !description) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    let finalVoucherNo = voucherNo;
    const existingVoucher = await prisma.expense.findUnique({ where: { voucherNo: finalVoucherNo } });
    if (existingVoucher) {
      finalVoucherNo = `${voucherNo}-${Date.now().toString().slice(-4)}`;
    }

    const expense = await prisma.expense.create({
      data: {
        voucherNo: finalVoucherNo,
        category,
        amount: parseFloat(amount),
        description,
        expenseDate: expenseDate ? new Date(expenseDate) : new Date(),
        approvedBy: approvedBy || session.displayName,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: session.userId,
        action: 'EXPENSE_RECORDED',
        entity: 'Expense',
        entityId: expense.id,
        details: `Recorded voucher ${voucherNo} - BDT ${amount}`,
      },
    });

    return NextResponse.json({ success: true, expense });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Expense creation failed' }, { status: 500 });
  }
}
