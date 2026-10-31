import prisma from './prisma';

export interface PaymentRequest {
  invoiceId: string;
  studentId: string;
  amount: number;
  paymentMethod: 'BKASH' | 'NAGAD' | 'ROCKET' | 'SSLCOMMERZ' | 'CARD';
  payerPhone?: string;
}

export interface PaymentResponse {
  success: boolean;
  transactionId: string;
  receiptNo: string;
  amount: number;
  paymentMethod: string;
  paidAt: string;
  message: string;
}

export async function processOnlinePayment(data: PaymentRequest): Promise<PaymentResponse> {
  const { invoiceId, studentId, amount, paymentMethod, payerPhone } = data;

  // 1. Validate invoice exists and calculate balance
  const invoice = await prisma.invoice.findUnique({
    where: { id: invoiceId },
    include: { student: true },
  });

  if (!invoice) {
    throw new Error('INVOICE_NOT_FOUND');
  }

  const remainingDue = Math.max(0, Math.round((invoice.totalPayable - invoice.paidAmount) * 100) / 100);

  // Idempotency: If invoice is already fully paid, return existing verified payment
  if (invoice.status === 'PAID' || remainingDue <= 0) {
    const existingPayment = await prisma.payment.findFirst({
      where: { invoiceId: invoice.id },
      orderBy: { paidAt: 'desc' },
    });

    if (existingPayment) {
      return {
        success: true,
        transactionId: existingPayment.transactionId,
        receiptNo: existingPayment.receiptNo,
        amount: existingPayment.amount,
        paymentMethod: existingPayment.paymentMethod,
        paidAt: existingPayment.paidAt.toISOString(),
        message: 'This invoice has already been fully settled.',
      };
    }
  }

  // Calculate actual payable portion (safe against minor float precision discrepancies)
  const payableAmount = Math.min(amount, remainingDue > 0 ? remainingDue : invoice.totalPayable);
  if (payableAmount <= 0) {
    throw new Error('INVALID_PAYMENT_AMOUNT');
  }

  // 2. Generate unique Transaction ID & Receipt No
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const transactionId = `TRX-${paymentMethod}-${dateStr}-${randomSuffix}`;
  const receiptCount = await prisma.payment.count();
  const receiptNo = `RCT-${dateStr}-${(receiptCount + 1).toString().padStart(4, '0')}`;

  // 3. Create payment attempt record (Idempotency & audit)
  const attempt = await prisma.paymentAttempt.create({
    data: {
      attemptId: `ATT-${Date.now()}-${randomSuffix}`,
      studentId,
      amount: payableAmount,
      currency: 'BDT',
      gateway: paymentMethod,
      status: 'SUCCESS',
      gatewayTrxId: transactionId,
      completedAt: new Date(),
    },
  });

  // 4. Record Payment in DB transaction
  const payment = await prisma.$transaction(async (tx) => {
    const p = await tx.payment.create({
      data: {
        receiptNo,
        invoiceId,
        paymentAttemptId: attempt.id,
        studentId,
        amount: payableAmount,
        paymentMethod,
        transactionId,
        status: 'VERIFIED',
        paidAt: new Date(),
        receivedBy: `ONLINE_${paymentMethod}`,
        notes: payerPhone ? `Payer Phone: ${payerPhone}` : 'Online simulated sandbox settlement',
      },
    });

    const newPaidAmount = invoice.paidAmount + payableAmount;
    const newStatus = newPaidAmount >= invoice.totalPayable - 0.01 ? 'PAID' : 'PARTIAL';

    await tx.invoice.update({
      where: { id: invoiceId },
      data: {
        paidAmount: newPaidAmount,
        status: newStatus,
        paidDate: newStatus === 'PAID' ? new Date() : null,
      },
    });

    return p;
  });

  return {
    success: true,
    transactionId: payment.transactionId,
    receiptNo: payment.receiptNo,
    amount: payment.amount,
    paymentMethod: payment.paymentMethod,
    paidAt: payment.paidAt.toISOString(),
    message: 'Payment processed and verified successfully.',
  };
}
