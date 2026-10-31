import { NextResponse } from 'next/server';
import { processOnlinePayment } from '@/lib/payment';
import { getSession } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const session = await getSession();
    // Student, Parent, Admin or Accountant can process payments
    if (!session) {
      return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 });
    }

    const body = await req.json();
    const { invoiceId, studentId, amount, paymentMethod, payerPhone } = body;

    if (!invoiceId || !studentId || !amount || !paymentMethod) {
      return NextResponse.json({ error: 'Missing required payment details' }, { status: 400 });
    }

    const result = await processOnlinePayment({
      invoiceId,
      studentId,
      amount: parseFloat(amount),
      paymentMethod,
      payerPhone,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Payment API error:', error);
    return NextResponse.json({ error: error.message || 'Payment processing failed' }, { status: 500 });
  }
}
