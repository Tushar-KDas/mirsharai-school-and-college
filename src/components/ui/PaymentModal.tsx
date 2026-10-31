'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { formatCurrency, toBengaliNumber } from '@/lib/utils';
import { CheckCircle2, ShieldCheck, X, CreditCard, ArrowRight, Printer } from 'lucide-react';
import ReceiptModal from './ReceiptModal';

interface PaymentModalProps {
  invoice: {
    id: string;
    invoiceNo: string;
    title: string;
    totalPayable: number;
    paidAmount: number;
    studentId: string;
    studentName?: string;
    studentCode?: string;
    className?: string;
    roll?: number;
  };
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess?: () => void;
}

export default function PaymentModal({
  invoice,
  isOpen,
  onClose,
  onPaymentSuccess,
}: PaymentModalProps) {
  const { locale, t } = useLanguage();
  const dueAmount = invoice.totalPayable - invoice.paidAmount;

  const [paymentMethod, setPaymentMethod] = useState<'BKASH' | 'NAGAD' | 'ROCKET' | 'SSLCOMMERZ'>('BKASH');
  const [payerPhone, setPayerPhone] = useState('01819998877');
  const [loading, setLoading] = useState(false);
  const [paymentResult, setPaymentResult] = useState<any | null>(null);
  const [showReceipt, setShowReceipt] = useState(false);

  if (!isOpen) return null;

  const handlePay = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/payment/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invoiceId: invoice.id,
          studentId: invoice.studentId,
          amount: dueAmount,
          paymentMethod,
          payerPhone,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setPaymentResult(data);
        if (onPaymentSuccess) onPaymentSuccess();
      } else {
        alert(data.error || 'Payment failed');
      }
    } catch (err) {
      console.error(err);
      alert('Network error while processing payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95">
          {/* Header */}
          <div className="bg-gradient-to-r from-navy-950 to-blue-900 text-white px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h3 className="font-bold text-sm sm:text-base">
                {locale === 'bn' ? 'নিরাপদ অনলাইন ফি পেমেন্ট' : 'Secure Online Fee Payment'}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            {!paymentResult ? (
              /* Step 1: Payment Checkout */
              <div className="space-y-5">
                {/* Invoice summary card */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>{t.fees.invoiceNo}:</span>
                    <span className="font-semibold text-slate-800">{invoice.invoiceNo}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>{t.fees.feeType}:</span>
                    <span className="font-semibold text-slate-800">{invoice.title}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
                    <span className="font-bold text-slate-700 text-sm">
                      {locale === 'bn' ? 'পরিশোধযোগ্য মোট টাকা' : 'Payable Amount'}:
                    </span>
                    <span className="font-extrabold text-blue-700 text-lg">
                      {formatCurrency(dueAmount, locale)}
                    </span>
                  </div>
                </div>

                {/* Gateway Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    {t.fees.selectPayment}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {/* bKash */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('BKASH')}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                        paymentMethod === 'BKASH'
                          ? 'border-pink-500 bg-pink-50/60 ring-2 ring-pink-500/20'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full bg-pink-600"></span>
                      <span className="font-bold text-xs text-pink-700">bKash</span>
                    </button>

                    {/* Nagad */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('NAGAD')}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                        paymentMethod === 'NAGAD'
                          ? 'border-amber-500 bg-amber-50/60 ring-2 ring-amber-500/20'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full bg-amber-600"></span>
                      <span className="font-bold text-xs text-amber-700">Nagad</span>
                    </button>

                    {/* Rocket */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('ROCKET')}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                        paymentMethod === 'ROCKET'
                          ? 'border-purple-500 bg-purple-50/60 ring-2 ring-purple-500/20'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full bg-purple-600"></span>
                      <span className="font-bold text-xs text-purple-700">Rocket</span>
                    </button>

                    {/* Cards / SSL */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('SSLCOMMERZ')}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                        paymentMethod === 'SSLCOMMERZ'
                          ? 'border-blue-500 bg-blue-50/60 ring-2 ring-blue-500/20'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 text-blue-600" />
                      <span className="font-bold text-xs text-blue-700">Cards</span>
                    </button>
                  </div>
                </div>

                {/* Payer Phone */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {locale === 'bn' ? 'মোবাইল ব্যাংকিং / পেমেন্ট নম্বর' : 'Payment Account / Mobile Number'}
                  </label>
                  <input
                    type="text"
                    value={payerPhone}
                    onChange={(e) => setPayerPhone(e.target.value)}
                    placeholder="01XXXXXXXXX"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>

                {/* Pay Action Button */}
                <button
                  type="button"
                  onClick={handlePay}
                  disabled={loading}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-md shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <span>{t.common.loading}</span>
                  ) : (
                    <>
                      <span>{t.fees.payNow} ({formatCurrency(dueAmount, locale)})</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            ) : (
              /* Step 2: Payment Success Confirmation */
              <div className="text-center py-4 space-y-4 animate-in zoom-in-95">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">
                  {t.fees.paymentSuccess}
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  {locale === 'bn'
                    ? 'আপনার ফি সফলভাবে পরিশোধ হয়েছে এবং মানি রিসিট প্রস্তুত করা হয়েছে।'
                    : 'Your payment was completed successfully and an official money receipt has been issued.'}
                </p>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t.fees.transactionId}:</span>
                    <span className="font-mono font-bold text-slate-800">{paymentResult.transactionId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">রসিদ নং / Receipt No:</span>
                    <span className="font-bold text-slate-800">{paymentResult.receiptNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">পরিশোধিত অর্থ / Amount:</span>
                    <span className="font-extrabold text-emerald-600">
                      {formatCurrency(paymentResult.amount, locale)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <button
                    onClick={() => setShowReceipt(true)}
                    className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Printer className="w-4 h-4" />
                    <span>{t.fees.receiptDownload}</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-all"
                  >
                    {locale === 'bn' ? 'ড্যাশবোর্ডে ফিরুন' : 'Back to Dashboard'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Printable / Downloadable Receipt Modal */}
      {showReceipt && paymentResult && (
        <ReceiptModal
          payment={{
            receiptNo: paymentResult.receiptNo,
            transactionId: paymentResult.transactionId,
            amount: paymentResult.amount,
            paymentMethod: paymentResult.paymentMethod,
            paidAt: paymentResult.paidAt,
            invoiceTitle: invoice.title,
            studentName: invoice.studentName || 'Tanvir Ahmed',
            studentCode: invoice.studentCode || 'MSC-2026-1001',
            className: invoice.className || 'Class 10 (Science)',
            roll: invoice.roll || 1,
          }}
          onClose={() => setShowReceipt(false)}
        />
      )}
    </>
  );
}
