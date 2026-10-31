import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      applicantBn,
      applicantEn,
      applyingClass,
      group = 'GENERAL',
      gender,
      dob,
      bloodGroup,
      guardianNameBn,
      guardianNameEn,
      guardianPhone,
      guardianEmail,
      address,
      previousSchool,
      gpa,
    } = body;

    if (!applicantBn || !applicantEn || !applyingClass || !gender || !dob || !guardianPhone || !address) {
      return NextResponse.json({ error: 'Missing required admission fields' }, { status: 400 });
    }

    const count = await prisma.admissionApplication.count();
    let applicationNo = `MSC-ADM-2026-${(count + 1).toString().padStart(4, '0')}`;
    const existingApp = await prisma.admissionApplication.findUnique({ where: { applicationNo } });
    if (existingApp) {
      applicationNo = `MSC-ADM-2026-${(count + 10).toString().padStart(4, '0')}`;
      const existingApp2 = await prisma.admissionApplication.findUnique({ where: { applicationNo } });
      if (existingApp2) {
        applicationNo = `MSC-ADM-2026-${Date.now().toString().slice(-5)}`;
      }
    }

    const application = await prisma.admissionApplication.create({
      data: {
        applicationNo,
        applicantBn,
        applicantEn,
        applyingClass: parseInt(applyingClass, 10),
        group,
        gender,
        dob: new Date(dob),
        bloodGroup: bloodGroup || null,
        guardianNameBn: guardianNameBn || applicantBn + ' এর অভিভাবক',
        guardianNameEn: guardianNameEn || applicantEn + ' Guardian',
        guardianPhone,
        guardianEmail: guardianEmail || null,
        address,
        previousSchool: previousSchool || null,
        gpa: gpa ? parseFloat(gpa) : null,
        status: 'PENDING',
      },
    });

    return NextResponse.json({
      success: true,
      applicationNo: application.applicationNo,
      messageBn: 'আপনার ভর্তি আবেদন সফলভাবে জমা হয়েছে। আবেদন নম্বরটি সংরক্ষণ করুন।',
      messageEn: 'Your admission application has been submitted successfully. Please save your application number.',
    });
  } catch (error: any) {
    console.error('Admission submission error:', error);
    return NextResponse.json({ error: error.message || 'Submission failed' }, { status: 500 });
  }
}
