import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Mirsharai School and College ERP Seeding...');

  // Common demo password for testing: msc123456
  const passwordHash = await bcrypt.hash('msc123456', 10);

  // 1. Wipe existing data cleanly
  await prisma.auditLog.deleteMany();
  await prisma.backupRecord.deleteMany();
  await prisma.studentTransport.deleteMany();
  await prisma.transportVehicle.deleteMany();
  await prisma.transportStop.deleteMany();
  await prisma.transportRoute.deleteMany();
  await prisma.inventoryItem.deleteMany();
  await prisma.bookLoan.deleteMany();
  await prisma.libraryBook.deleteMany();
  await prisma.downloadItem.deleteMany();
  await prisma.galleryItem.deleteMany();
  await prisma.academicEvent.deleteMany();
  await prisma.notice.deleteMany();
  await prisma.staffLeave.deleteMany();
  await prisma.payrollRecord.deleteMany();
  await prisma.salaryStructure.deleteMany();
  await prisma.expense.deleteMany();
  await prisma.journalLine.deleteMany();
  await prisma.journalEntry.deleteMany();
  await prisma.account.deleteMany();
  await prisma.bankAccount.deleteMany();
  await prisma.refund.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.paymentAttempt.deleteMany();
  await prisma.feeAdjustment.deleteMany();
  await prisma.invoiceItem.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.feeStructure.deleteMany();
  await prisma.feeCategory.deleteMany();
  await prisma.mark.deleteMany();
  await prisma.examSchedule.deleteMany();
  await prisma.exam.deleteMany();
  await prisma.routine.deleteMany();
  await prisma.attendance.deleteMany();
  await prisma.admissionApplication.deleteMany();
  await prisma.studentGuardian.deleteMany();
  await prisma.guardian.deleteMany();
  await prisma.student.deleteMany();
  await prisma.staff.deleteMany();
  await prisma.subject.deleteMany();
  await prisma.section.deleteMany();
  await prisma.class.deleteMany();
  await prisma.academicSession.deleteMany();
  await prisma.schoolSetting.deleteMany();
  await prisma.user.deleteMany();

  console.log('🧹 Cleaned existing database.');

  // 2. School Settings
  const schoolSetting = await prisma.schoolSetting.create({
    data: {
      nameBn: 'মিরসরাই স্কুল এন্ড কলেজ',
      nameEn: 'Mirsharai School and College',
      eiin: '104523',
      collegeCode: '3201',
      establishedYear: 1972,
      addressBn: 'মিরসরাই, চট্টগ্রাম, বাংলাদেশ',
      addressEn: 'Mirsharai, Chattogram, Bangladesh',
      phone: '+880 1812-345678',
      email: 'info@mirsharaicollege.edu.bd',
      website: 'https://mirsharaicollege.edu.bd',
      logoUrl: '/images/logo.png',
      principalNameBn: 'প্রফেসর মোঃ কামরুল হাসান',
      principalNameEn: 'Prof. Md. Kamrul Hasan',
    },
  });

  // 3. Academic Sessions
  const session2026 = await prisma.academicSession.create({
    data: {
      name: '2026',
      year: 2026,
      isCurrent: true,
      startDate: new Date('2026-01-01'),
      endDate: new Date('2026-12-31'),
    },
  });

  const session2025 = await prisma.academicSession.create({
    data: {
      name: '2025',
      year: 2025,
      isCurrent: false,
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-12-31'),
    },
  });

  // 4. Classes 1 to 12
  const classList = [
    { num: 1, bn: 'প্রথম শ্রেণি', en: 'Class 1', level: 'PRIMARY' },
    { num: 2, bn: 'দ্বিতীয় শ্রেণি', en: 'Class 2', level: 'PRIMARY' },
    { num: 3, bn: 'তৃতীয় শ্রেণি', en: 'Class 3', level: 'PRIMARY' },
    { num: 4, bn: 'চতুর্থ শ্রেণি', en: 'Class 4', level: 'PRIMARY' },
    { num: 5, bn: 'পঞ্চম শ্রেণি', en: 'Class 5', level: 'PRIMARY' },
    { num: 6, bn: 'ষষ্ঠ শ্রেণি', en: 'Class 6', level: 'JUNIOR' },
    { num: 7, bn: 'সপ্তম শ্রেণি', en: 'Class 7', level: 'JUNIOR' },
    { num: 8, bn: 'অষ্টম শ্রেণি', en: 'Class 8', level: 'JUNIOR' },
    { num: 9, bn: 'নবম শ্রেণি', en: 'Class 9', level: 'SECONDARY' },
    { num: 10, bn: 'দশম শ্রেণি', en: 'Class 10', level: 'SECONDARY' },
    { num: 11, bn: 'একাদশ শ্রেণি (কলেজ)', en: 'Class 11 (College)', level: 'HIGHER_SECONDARY' },
    { num: 12, bn: 'দ্বাদশ শ্রেণি (কলেজ)', en: 'Class 12 (College)', level: 'HIGHER_SECONDARY' },
  ];

  const createdClasses = {};
  for (const c of classList) {
    createdClasses[c.num] = await prisma.class.create({
      data: {
        numericValue: c.num,
        nameBn: c.bn,
        nameEn: c.en,
        level: c.level,
      },
    });
  }

  // 5. Sections
  const sec10A = await prisma.section.create({
    data: {
      classId: createdClasses[10].id,
      nameBn: 'ক শাখা (বিজ্ঞান)',
      nameEn: 'Section A (Science)',
      roomNo: 'Room-201',
      capacity: 60,
    },
  });

  const sec10B = await prisma.section.create({
    data: {
      classId: createdClasses[10].id,
      nameBn: 'খ শাখা (ব্যবসায় শিক্ষা ও মানবিক)',
      nameEn: 'Section B (Commerce & Arts)',
      roomNo: 'Room-202',
      capacity: 60,
    },
  });

  const sec11Sci = await prisma.section.create({
    data: {
      classId: createdClasses[11].id,
      nameBn: 'একাদশ বিজ্ঞান',
      nameEn: 'Class 11 Science',
      roomNo: 'Col-101',
      capacity: 70,
    },
  });

  const sec11Com = await prisma.section.create({
    data: {
      classId: createdClasses[11].id,
      nameBn: 'একাদশ ব্যবসায় শিক্ষা',
      nameEn: 'Class 11 Commerce',
      roomNo: 'Col-102',
      capacity: 70,
    },
  });

  // 6. Subjects
  const subBangla = await prisma.subject.create({
    data: {
      classId: createdClasses[10].id,
      code: '101',
      nameBn: 'বাংলা ১ম ও ২য় পত্র',
      nameEn: 'Bangla 1st & 2nd Paper',
      fullMarks: 100,
      passMarks: 33,
    },
  });

  const subEnglish = await prisma.subject.create({
    data: {
      classId: createdClasses[10].id,
      code: '107',
      nameBn: 'ইংরেজি ১ম ও ২য় পত্র',
      nameEn: 'English 1st & 2nd Paper',
      fullMarks: 100,
      passMarks: 33,
    },
  });

  const subMath = await prisma.subject.create({
    data: {
      classId: createdClasses[10].id,
      code: '109',
      nameBn: 'সাধারণ গণিত',
      nameEn: 'Mathematics',
      fullMarks: 100,
      passMarks: 33,
    },
  });

  const subPhysics = await prisma.subject.create({
    data: {
      classId: createdClasses[10].id,
      code: '136',
      nameBn: 'পদার্থবিজ্ঞান',
      nameEn: 'Physics',
      group: 'SCIENCE',
      fullMarks: 100,
      passMarks: 33,
    },
  });

  const subChemistry = await prisma.subject.create({
    data: {
      classId: createdClasses[10].id,
      code: '137',
      nameBn: 'রসায়ন',
      nameEn: 'Chemistry',
      group: 'SCIENCE',
      fullMarks: 100,
      passMarks: 33,
    },
  });

  const subBiology = await prisma.subject.create({
    data: {
      classId: createdClasses[10].id,
      code: '138',
      nameBn: 'জীববিজ্ঞান',
      nameEn: 'Biology',
      group: 'SCIENCE',
      fullMarks: 100,
      passMarks: 33,
    },
  });

  const subICT = await prisma.subject.create({
    data: {
      classId: createdClasses[10].id,
      code: '154',
      nameBn: 'তথ্য ও যোগাযোগ প্রযুক্তি',
      nameEn: 'ICT',
      fullMarks: 50,
      passMarks: 17,
    },
  });

  // 7. Core User Accounts (All 7 Roles)
  // 1) SUPER_ADMIN
  const superAdminUser = await prisma.user.create({
    data: {
      username: 'superadmin',
      email: 'superadmin@mirsharaicollege.edu.bd',
      passwordHash,
      role: 'SUPER_ADMIN',
    },
  });

  // 2) ADMIN
  const adminUser = await prisma.user.create({
    data: {
      username: 'admin',
      email: 'admin@mirsharaicollege.edu.bd',
      passwordHash,
      role: 'ADMIN',
    },
  });

  // 3) TEACHER (Senior Teacher & Faculty)
  const teacherUser = await prisma.user.create({
    data: {
      username: 'teacher',
      email: 'teacher@mirsharaicollege.edu.bd',
      passwordHash,
      role: 'TEACHER',
    },
  });

  const teacherStaff = await prisma.staff.create({
    data: {
      userId: teacherUser.id,
      employeeId: 'MSC-TEA-001',
      nameBn: 'প্রফেসর মোঃ রফিকুল ইসলাম',
      nameEn: 'Prof. Md. Rafiqul Islam',
      designationBn: 'সহকারী অধ্যাপক (পদার্থবিজ্ঞান)',
      designationEn: 'Assistant Professor (Physics)',
      department: 'Science',
      phone: '+880 1819-234567',
      email: 'teacher@mirsharaicollege.edu.bd',
      qualification: 'M.Sc (Physics, DU), B.Ed',
      joiningDate: new Date('2015-02-01'),
      photoUrl: '/images/school-assembly.jpg',
      isTeacher: true,
      order: 1,
    },
  });

  // Principal Profile
  await prisma.staff.create({
    data: {
      employeeId: 'MSC-PRIN-001',
      nameBn: 'প্রফেসর মোঃ কামরুল হাসান',
      nameEn: 'Prof. Md. Kamrul Hasan',
      designationBn: 'অধ্যক্ষ',
      designationEn: 'Principal',
      department: 'Administration',
      phone: '+880 1812-345678',
      email: 'principal@mirsharaicollege.edu.bd',
      qualification: 'M.Sc (Physics), B.Ed (First Class)',
      joiningDate: new Date('2010-01-15'),
      photoUrl: '/images/school-campus.jpg',
      isTeacher: true,
      order: 0,
    },
  });

  // 4) STUDENT
  const studentUser = await prisma.user.create({
    data: {
      username: 'student',
      email: 'student@mirsharaicollege.edu.bd',
      passwordHash,
      role: 'STUDENT',
    },
  });

  const demoStudent = await prisma.student.create({
    data: {
      userId: studentUser.id,
      studentId: 'MSC-2026-1001',
      admissionNo: 'ADM-2026-001',
      roll: 1,
      nameBn: 'তানভীর আহমেদ',
      nameEn: 'Tanvir Ahmed',
      classId: createdClasses[10].id,
      sectionId: sec10A.id,
      sessionId: session2026.id,
      group: 'SCIENCE',
      gender: 'MALE',
      dob: new Date('2010-04-12'),
      bloodGroup: 'B+',
      phone: '+880 1711-223344',
      address: 'মিরসরাই পৌরসভা, চট্টগ্রাম',
      photoUrl: '/images/school-banner.jpg',
    },
  });

  // 5) PARENT
  const parentUser = await prisma.user.create({
    data: {
      username: 'parent',
      email: 'parent@mirsharaicollege.edu.bd',
      passwordHash,
      role: 'PARENT',
    },
  });

  const guardian = await prisma.guardian.create({
    data: {
      userId: parentUser.id,
      nameBn: 'জনাব নুরুল ইসলাম',
      nameEn: 'Nurul Islam',
      relation: 'FATHER',
      phone: '+880 1819-998877',
      email: 'parent@mirsharaicollege.edu.bd',
      occupation: 'Government Officer',
      address: 'মিরসরাই, চট্টগ্রাম',
    },
  });

  await prisma.studentGuardian.create({
    data: {
      studentId: demoStudent.id,
      guardianId: guardian.id,
    },
  });

  // 6) ACCOUNTANT
  const accountantUser = await prisma.user.create({
    data: {
      username: 'accountant',
      email: 'accountant@mirsharaicollege.edu.bd',
      passwordHash,
      role: 'ACCOUNTANT',
    },
  });

  await prisma.staff.create({
    data: {
      userId: accountantUser.id,
      employeeId: 'MSC-ACC-001',
      nameBn: 'মোঃ শাহাদাত হোসেন',
      nameEn: 'Md. Shahadat Hossain',
      designationBn: 'প্রধান হিসাবরক্ষক',
      designationEn: 'Chief Accountant',
      department: 'Accounts',
      phone: '+880 1814-556677',
      email: 'accountant@mirsharaicollege.edu.bd',
      qualification: 'M.Com (Accounting), CA (Inter)',
      isTeacher: false,
    },
  });

  // 7) STAFF
  const staffUser = await prisma.user.create({
    data: {
      username: 'staff',
      email: 'staff@mirsharaicollege.edu.bd',
      passwordHash,
      role: 'STAFF',
    },
  });

  await prisma.staff.create({
    data: {
      userId: staffUser.id,
      employeeId: 'MSC-STAFF-001',
      nameBn: 'আব্দুল মালেক',
      nameEn: 'Abdul Malek',
      designationBn: 'উচ্চমান সহকারী ও ল্যাব ইনচার্জ',
      designationEn: 'Senior Assistant & Lab In-charge',
      department: 'Office',
      phone: '+880 1815-667788',
      email: 'staff@mirsharaicollege.edu.bd',
      isTeacher: false,
    },
  });

  // Additional 5 Students for realistic table displays
  const sampleStudents = [
    { roll: 2, bn: 'ফাতেমা তুজ জোহরা', en: 'Fatema Tuz Zohra', gender: 'FEMALE', blood: 'O+' },
    { roll: 3, bn: 'সাদিয়া জাহান', en: 'Sadia Jahan', gender: 'FEMALE', blood: 'A+' },
    { roll: 4, bn: 'রাকিবুল হাসান', en: 'Rakibul Hasan', gender: 'MALE', blood: 'B+' },
    { roll: 5, bn: 'মেহেদী হাসান রনি', en: 'Mehedi Hasan Roni', gender: 'MALE', blood: 'AB+' },
    { roll: 6, bn: 'নুসরাত জাহান মিম', en: 'Nusrat Jahan Mim', gender: 'FEMALE', blood: 'A-' },
  ];

  for (const s of sampleStudents) {
    await prisma.student.create({
      data: {
        studentId: `MSC-2026-100${s.roll}`,
        admissionNo: `ADM-2026-00${s.roll}`,
        roll: s.roll,
        nameBn: s.bn,
        nameEn: s.en,
        classId: createdClasses[10].id,
        sectionId: sec10A.id,
        sessionId: session2026.id,
        group: 'SCIENCE',
        gender: s.gender,
        bloodGroup: s.blood,
        phone: `+880 1810-00000${s.roll}`,
        address: 'মিরসরাই, চট্টগ্রাম',
      },
    });
  }

  // 8. Timetable / Routine for Class 10 (Science)
  const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY'];
  for (const day of days) {
    await prisma.routine.create({
      data: {
        classId: createdClasses[10].id,
        sectionId: sec10A.id,
        subjectId: subMath.id,
        teacherId: teacherStaff.id,
        dayOfWeek: day,
        period: 1,
        startTime: '10:00 AM',
        endTime: '10:45 AM',
        roomNo: 'Room-201',
      },
    });
    await prisma.routine.create({
      data: {
        classId: createdClasses[10].id,
        sectionId: sec10A.id,
        subjectId: subEnglish.id,
        teacherId: teacherStaff.id,
        dayOfWeek: day,
        period: 2,
        startTime: '10:45 AM',
        endTime: '11:30 AM',
        roomNo: 'Room-201',
      },
    });
    await prisma.routine.create({
      data: {
        classId: createdClasses[10].id,
        sectionId: sec10A.id,
        subjectId: subPhysics.id,
        teacherId: teacherStaff.id,
        dayOfWeek: day,
        period: 3,
        startTime: '11:30 AM',
        endTime: '12:15 PM',
        roomNo: 'Room-201',
      },
    });
  }

  // 9. Attendance
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  await prisma.attendance.create({
    data: {
      studentId: demoStudent.id,
      classId: createdClasses[10].id,
      sectionId: sec10A.id,
      date: today,
      status: 'PRESENT',
      remarks: 'On time',
    },
  });

  // 10. Examinations & Marks
  const annualExam = await prisma.exam.create({
    data: {
      sessionId: session2026.id,
      titleBn: 'বার্ষিক পরীক্ষা ২০২৬',
      titleEn: 'Annual Examination 2026',
      examType: 'ANNUAL',
      startDate: new Date('2026-11-15'),
      endDate: new Date('2026-11-30'),
      isPublished: true,
    },
  });

  const halfYearlyExam = await prisma.exam.create({
    data: {
      sessionId: session2026.id,
      titleBn: 'অর্ধবার্ষিক পরীক্ষা ২০২৬',
      titleEn: 'Half-Yearly Examination 2026',
      examType: 'HALF_YEARLY',
      startDate: new Date('2026-06-10'),
      endDate: new Date('2026-06-25'),
      isPublished: true,
    },
  });

  // Exam Schedule
  await prisma.examSchedule.create({
    data: {
      examId: annualExam.id,
      subjectId: subBangla.id,
      examDate: new Date('2026-11-15'),
      startTime: '10:00 AM',
      endTime: '01:00 PM',
      roomNo: 'Hall-1',
    },
  });

  await prisma.examSchedule.create({
    data: {
      examId: annualExam.id,
      subjectId: subEnglish.id,
      examDate: new Date('2026-11-17'),
      startTime: '10:00 AM',
      endTime: '01:00 PM',
      roomNo: 'Hall-1',
    },
  });

  await prisma.examSchedule.create({
    data: {
      examId: annualExam.id,
      subjectId: subMath.id,
      examDate: new Date('2026-11-20'),
      startTime: '10:00 AM',
      endTime: '01:00 PM',
      roomNo: 'Hall-1',
    },
  });

  // Demo Student Marks
  await prisma.mark.create({
    data: {
      examId: annualExam.id,
      subjectId: subBangla.id,
      studentId: demoStudent.id,
      writtenMarks: 60,
      mcqMarks: 26,
      practicalMarks: 0,
      totalMarks: 86,
      grade: 'A+',
      gpa: 5.0,
      isPassed: true,
      isApproved: true,
    },
  });

  await prisma.mark.create({
    data: {
      examId: annualExam.id,
      subjectId: subMath.id,
      studentId: demoStudent.id,
      writtenMarks: 65,
      mcqMarks: 28,
      practicalMarks: 0,
      totalMarks: 93,
      grade: 'A+',
      gpa: 5.0,
      isPassed: true,
      isApproved: true,
    },
  });

  await prisma.mark.create({
    data: {
      examId: annualExam.id,
      subjectId: subPhysics.id,
      studentId: demoStudent.id,
      writtenMarks: 48,
      mcqMarks: 22,
      practicalMarks: 23,
      totalMarks: 93,
      grade: 'A+',
      gpa: 5.0,
      isPassed: true,
      isApproved: true,
    },
  });

  // 11. Fee Categories & Invoices
  const feeTuition = await prisma.feeCategory.create({
    data: {
      code: 'TUITION',
      nameBn: 'মাসিক টিউশন ফি',
      nameEn: 'Monthly Tuition Fee',
      isMonthly: true,
    },
  });

  const feeExam = await prisma.feeCategory.create({
    data: {
      code: 'EXAM',
      nameBn: 'পরীক্ষা ফি',
      nameEn: 'Examination Fee',
      isMonthly: false,
    },
  });

  const feeLab = await prisma.feeCategory.create({
    data: {
      code: 'LAB',
      nameBn: 'বিজ্ঞান ও কম্পিউটার ল্যাব ফি',
      nameEn: 'Lab & Computer Fee',
      isMonthly: false,
    },
  });

  const feeLibrary = await prisma.feeCategory.create({
    data: {
      code: 'LIBRARY',
      nameBn: 'গ্রন্থাগার উন্নয়ন ফি',
      nameEn: 'Library Development Fee',
      isMonthly: false,
    },
  });

  // Invoices for Demo Student
  const inv1 = await prisma.invoice.create({
    data: {
      invoiceNo: 'INV-2026-1001',
      studentId: demoStudent.id,
      sessionId: session2026.id,
      feeCategoryId: feeTuition.id,
      title: 'October 2026 Tuition Fee',
      month: 'October',
      amount: 1500,
      discount: 0,
      lateFee: 0,
      totalPayable: 1500,
      paidAmount: 0,
      status: 'UNPAID',
      dueDate: new Date('2026-11-10'),
    },
  });

  await prisma.invoiceItem.create({
    data: {
      invoiceId: inv1.id,
      description: 'Monthly Tuition - Class 10 (Science)',
      amount: 1500,
    },
  });

  const inv2 = await prisma.invoice.create({
    data: {
      invoiceNo: 'INV-2026-1002',
      studentId: demoStudent.id,
      sessionId: session2026.id,
      feeCategoryId: feeExam.id,
      title: 'Annual Examination Fee 2026',
      amount: 1000,
      discount: 0,
      lateFee: 0,
      totalPayable: 1000,
      paidAmount: 0,
      status: 'UNPAID',
      dueDate: new Date('2026-11-15'),
    },
  });

  await prisma.invoiceItem.create({
    data: {
      invoiceId: inv2.id,
      description: 'Annual Examination Admit Card & Assessment Fee',
      amount: 1000,
    },
  });

  const inv3 = await prisma.invoice.create({
    data: {
      invoiceNo: 'INV-2026-1003',
      studentId: demoStudent.id,
      sessionId: session2026.id,
      feeCategoryId: feeTuition.id,
      title: 'September 2026 Tuition Fee',
      month: 'September',
      amount: 1500,
      discount: 0,
      lateFee: 0,
      totalPayable: 1500,
      paidAmount: 1500,
      status: 'PAID',
      dueDate: new Date('2026-10-10'),
      paidDate: new Date('2026-10-05'),
    },
  });

  await prisma.invoiceItem.create({
    data: {
      invoiceId: inv3.id,
      description: 'September 2026 Tuition Fee',
      amount: 1500,
    },
  });

  // Recorded Payment for inv3
  await prisma.payment.create({
    data: {
      receiptNo: 'RCT-2026-0001',
      invoiceId: inv3.id,
      studentId: demoStudent.id,
      amount: 1500,
      paymentMethod: 'BKASH',
      transactionId: 'TRX-BKASH-20261005-7842',
      status: 'VERIFIED',
      paidAt: new Date('2026-10-05T10:15:00Z'),
      receivedBy: 'ONLINE_BKASH',
      notes: 'Payer: +880 1819-998877',
    },
  });

  // 12. Public Notices
  await prisma.notice.create({
    data: {
      titleBn: '২০২৬ শিক্ষাবর্ষে ১ম থেকে ১২শ শ্রেণিতে ভর্তি বিজ্ঞপ্তি',
      titleEn: 'Admission Open for Session 2026 (Class 1 to 12)',
      contentBn: 'মিরসরাই স্কুল এন্ড কলেজে ২০২৬ শিক্ষাবর্ষে ১ম থেকে ১২শ শ্রেণি (বিজ্ঞান, মানবিক ও ব্যবসায় শিক্ষা) পর্যন্ত ভর্তি আবেদন গ্রহণ করা হচ্ছে। আগ্রহী অভিভাবক ও শিক্ষার্থীদের অনলাইন পোর্টালের মাধ্যমে আবেদন করার অনুরোধ করা হচ্ছে।',
      contentEn: 'Mirsharai School and College is accepting online admission applications for Classes 1 to 12 (Science, Humanities, and Business Studies) for the academic session 2026. Interested candidates are requested to apply through our digital portal.',
      category: 'ADMISSION',
      isPinned: true,
      status: 'PUBLISHED',
      publishedAt: new Date('2026-10-15'),
    },
  });

  await prisma.notice.create({
    data: {
      titleBn: '৯ম থেকে ১২শ শ্রেণির বার্ষিক পরীক্ষার সময়সূচি প্রকাশ',
      titleEn: 'Exam Routine Published for Class 9 to 12',
      contentBn: 'আসন্ন বার্ষিক পরীক্ষা ২০২৬ আগামী ১৫ নভেম্বর থেকে অনুষ্ঠিত হবে। বিস্তারিত পরীক্ষার রুটিন প্রতিষ্ঠান ওয়েবসাইট এবং নোটিশ বোর্ডে দেওয়া হলো। সকল পরীক্ষার্থীদের নির্ধারিত ইউনিফর্মে উপস্থিত হতে হবে।',
      contentEn: 'The Annual Examination 2026 for Class 9 to 12 will commence on 15 November 2026. The comprehensive exam timetable is now accessible via the school portal and notice board.',
      category: 'EXAM',
      isPinned: true,
      status: 'PUBLISHED',
      publishedAt: new Date('2026-10-20'),
    },
  });

  await prisma.notice.create({
    data: {
      titleBn: 'পবিত্র ঈদে মিলাদুন্নবী (সাঃ) উপলক্ষে বিদ্যালয় ছুটি',
      titleEn: 'School Holiday Notice on Holy Eid-e-Miladunnabi',
      contentBn: 'পবিত্র ঈদে মিলাদুন্নবী (সাঃ) উপলক্ষে আগামী রবিবার বিদ্যালয়ের সকল পাঠদান ও প্রশাসনিক কার্যক্রম বন্ধ থাকবে। পরবর্তী কার্যদিবস থেকে স্বাভাবিক কার্যক্রম চলবে।',
      contentEn: 'The school and college administrative operations will remain closed on Sunday on the auspicious occasion of Holy Eid-e-Miladunnabi. Regular classes will resume the next working day.',
      category: 'HOLIDAY',
      isPinned: false,
      status: 'PUBLISHED',
      publishedAt: new Date('2026-10-22'),
    },
  });

  await prisma.notice.create({
    data: {
      titleBn: 'অর্ধবার্ষিক পরীক্ষার ডিজিটাল ফলাফল ও মার্কশিট প্রকাশ',
      titleEn: 'Result Publication Notice: Half-Yearly Exam 2026',
      contentBn: '২০২৬ শিক্ষাবর্ষের অর্ধবার্ষিক পরীক্ষার ফলাফল শিক্ষার্থীদের অনলাইন পোর্টালে প্রকাশ করা হয়েছে। শিক্ষার্থী ও অভিভাবকগণ নিজ নিজ আইডি ব্যবহার করে মার্কশিট ডাউনলোড করতে পারবেন।',
      contentEn: 'The results for the Half-Yearly Examination 2026 have been published in the student portal. Students and parents can log in to view and download official digital marksheets.',
      category: 'ACADEMIC',
      isPinned: false,
      status: 'PUBLISHED',
      publishedAt: new Date('2026-07-05'),
    },
  });

  // 13. Events
  await prisma.academicEvent.create({
    data: {
      titleBn: 'বার্ষিক ক্রীড়া প্রতিযোগিতা ও পুরস্কার বিতরণী ২০২৬',
      titleEn: 'Annual Sports Day & Prize Giving Ceremony 2026',
      descriptionBn: 'মিরসরাই স্কুল এন্ড কলেজের কেন্দ্রীয় খেলার মাঠে আয়োজিত হবে বর্ণাঢ্য বার্ষিক ক্রীড়া উৎসব।',
      descriptionEn: 'The colorful Annual Athletics & Sports Meet at the main college sports pavilion.',
      type: 'SPORTS',
      startDate: new Date('2026-11-25'),
      endDate: new Date('2026-11-26'),
      locationBn: 'কলেজ খেলার মাঠ, মিরসরাই',
      locationEn: 'College Sports Pavilion, Mirsharai',
    },
  });

  await prisma.academicEvent.create({
    data: {
      titleBn: 'আন্তঃকলেজ বিজ্ঞান মেলা ও উদ্ভাবনী প্রতিযোগিতা',
      titleEn: 'Science Fair & Innovation Expo 2026',
      descriptionBn: 'বিজ্ঞান বিভাগের শিক্ষার্থীদের উদ্ভাবনী প্রজেক্ট ও রোবটিক্স প্রদর্শনী।',
      descriptionEn: 'Science projects, robotics displays, and innovation exhibits by college students.',
      type: 'EVENT',
      startDate: new Date('2026-12-05'),
      endDate: new Date('2026-12-06'),
      locationBn: 'অডিটোরিয়াম ও বিজ্ঞান ভবন',
      locationEn: 'Main Auditorium & Science Complex',
    },
  });

  await prisma.academicEvent.create({
    data: {
      titleBn: 'অভিভাবক সমাবেশ ও মতবিনিময় সভা',
      titleEn: 'Parent-Teacher Meeting & Academic Review',
      descriptionBn: 'শিক্ষার্থীদের সার্বিক অগ্রগতি ও আচরণগত মানোন্নয়নে বিশেষ মতবিনিময়।',
      descriptionEn: 'Periodic discussion on student progress, attendance, and moral development.',
      type: 'EVENT',
      startDate: new Date('2026-11-10'),
      endDate: new Date('2026-11-10'),
      locationBn: 'সেমিনার হল',
      locationEn: 'College Seminar Hall',
    },
  });

  // 14. Gallery Items
  await prisma.galleryItem.createMany({
    data: [
      {
        titleBn: 'আধুনিক স্মার্ট ক্লাসরুমে পাঠদান',
        titleEn: 'Interactive Classroom Learning',
        category: 'CLASSROOM',
        imageUrl: '/images/school-campus.jpg',
        order: 1,
      },
      {
        titleBn: 'বিজ্ঞান গবেষণাগারে ব্যবহারিক ক্লাস',
        titleEn: 'Physics & Chemistry Science Lab',
        category: 'LAB',
        imageUrl: '/images/school-assembly.jpg',
        order: 2,
      },
      {
        titleBn: 'সমৃদ্ধ কেন্দ্রীয় লাইব্রেরি',
        titleEn: 'College Central Library',
        category: 'CAMPUS',
        imageUrl: '/images/school-banner.jpg',
        order: 3,
      },
      {
        titleBn: 'বার্ষিক ক্রীড়া প্রতিযোগিতা ও অ্যাথলেটিক্স',
        titleEn: 'Annual Sports Track & Field',
        category: 'SPORTS',
        imageUrl: '/images/school-campus.jpg',
        order: 4,
      },
    ],
  });

  // 15. Downloads
  await prisma.downloadItem.createMany({
    data: [
      {
        titleBn: '২০২৬ শিক্ষাবর্ষের একাডেমিক ক্যালেন্ডার ও ছুটির তালিকা',
        titleEn: 'Academic Calendar & Holiday List 2026',
        category: 'CALENDAR',
        fileUrl: '/downloads/academic-calendar-2026.pdf',
        fileSize: '1.2 MB',
      },
      {
        titleBn: '১ম থেকে ১২শ শ্রেণির পূর্ণাঙ্গ পাঠ্যক্রম ও সিলেবাস',
        titleEn: 'Complete Syllabus for Class 1 to 12',
        category: 'SYLLABUS',
        fileUrl: '/downloads/syllabus-class-1-12.pdf',
        fileSize: '3.4 MB',
      },
      {
        titleBn: 'ভর্তি আবেদন ফরম (অফলাইন ব্যবহারের জন্য)',
        titleEn: 'Admission Application Form (Printable)',
        category: 'FORM',
        fileUrl: '/downloads/admission-form.pdf',
        fileSize: '450 KB',
      },
    ],
  });

  // 16. Double Entry Accounts & Financial Setup
  const accCash = await prisma.account.create({
    data: {
      code: '1010',
      nameBn: 'নগদ তহবিল',
      nameEn: 'Cash in Hand',
      type: 'ASSET',
      balance: 154000,
    },
  });

  const accBank = await prisma.account.create({
    data: {
      code: '1020',
      nameBn: 'সোনালী ব্যাংক পিএলসি - জেনারেল ফান্ড',
      nameEn: 'Sonali Bank PLC - General Fund',
      type: 'ASSET',
      balance: 1250000,
    },
  });

  const accTuitionRev = await prisma.account.create({
    data: {
      code: '4010',
      nameBn: 'টিউশন ফি আয়',
      nameEn: 'Tuition Fee Revenue',
      type: 'REVENUE',
      balance: 850000,
    },
  });

  // Bank Account record
  await prisma.bankAccount.create({
    data: {
      bankName: 'Sonali Bank PLC',
      branchName: 'Mirsharai Branch',
      accountNumber: 'SB-0192837465',
      accountTitle: 'Mirsharai School and College Fund',
      routingNumber: '200150123',
      currentBalance: 1250000,
    },
  });

  // Sample Expense
  await prisma.expense.create({
    data: {
      voucherNo: 'EXP-2026-10-001',
      category: 'UTILITY',
      amount: 18500,
      description: 'Monthly electricity bill for October 2026 (PDB Mirsharai)',
      expenseDate: new Date('2026-10-18'),
      approvedBy: 'Prof. Md. Kamrul Hasan (Principal)',
    },
  });

  // Library Books
  await prisma.libraryBook.createMany({
    data: [
      {
        isbn: '978-984-500-112',
        title: 'Higher Secondary Physics (Vol 1 & 2)',
        author: 'Dr. Shahjahan Tapan',
        category: 'SCIENCE',
        copiesTotal: 40,
        copiesAvailable: 34,
        rackLocation: 'Rack S-12',
      },
      {
        isbn: '978-984-500-221',
        title: 'Sanchaita (রবীন্দ্রনাথ ঠাকুরের সঞ্চয়িতা)',
        author: 'Rabindranath Tagore',
        category: 'LITERATURE',
        copiesTotal: 25,
        copiesAvailable: 21,
        rackLocation: 'Rack L-04',
      },
      {
        isbn: '978-984-500-335',
        title: 'Higher Mathematics for Class 9-10',
        author: 'NCTB Bangladesh',
        category: 'TEXTBOOK',
        copiesTotal: 60,
        copiesAvailable: 55,
        rackLocation: 'Rack M-01',
      },
    ],
  });

  // Transport Route
  const route1 = await prisma.transportRoute.create({
    data: {
      routeName: 'মিরসরাই সদর - কলেজ ক্যাম্পাস রুট',
      routeCode: 'MSC-TR-01',
      startPoint: 'Mirsharai Sadar',
      endPoint: 'Mirsharai School & College Campus',
      monthlyFare: 800,
    },
  });

  await prisma.transportStop.createMany({
    data: [
      { routeId: route1.id, stopName: 'মিরসরাই পৌর বাস টার্মিনাল', pickupTime: '08:10 AM', dropTime: '04:30 PM', order: 1 },
      { routeId: route1.id, stopName: 'মহামায়া ইকো পার্ক মোড়', pickupTime: '08:25 AM', dropTime: '04:15 PM', order: 2 },
      { routeId: route1.id, stopName: 'বড়তাকিয়া বাজার', pickupTime: '08:40 AM', dropTime: '04:00 PM', order: 3 },
    ],
  });

  await prisma.transportVehicle.create({
    data: {
      routeId: route1.id,
      vehicleNo: 'চট্ট-মেট্রো-চ-১২-৯৮৭৬',
      driverName: 'মোখলেসুর রহমান',
      driverPhone: '+880 1818-776655',
      helperName: 'করিম উল্লাহ',
      capacity: 34,
    },
  });

  // Inventory Items
  await prisma.inventoryItem.createMany({
    data: [
      { itemNameBn: 'উচ্চমানের ডিজিটাল মাল্টিমিডিয়া প্রজেক্টর', itemNameEn: 'Digital HD Multimedia Projector', category: 'ELECTRONICS', quantity: 18, unit: 'Units', location: 'Classrooms & Labs' },
      { itemNameBn: 'বিজ্ঞান ল্যাবরেটরি মাইক্রোস্কোপ', itemNameEn: 'Compound Optical Microscope', category: 'LAB_EQUIPMENT', quantity: 25, unit: 'Units', location: 'Biology & Physics Lab' },
      { itemNameBn: 'শিক্ষার্থী বেঞ্চ ও ডেস্ক সেট', itemNameEn: 'Dual Student Desk & Bench', category: 'FURNITURE', quantity: 450, unit: 'Sets', location: 'Building A & B' },
    ],
  });

  // Sample Admission Application
  await prisma.admissionApplication.create({
    data: {
      applicationNo: 'MSC-ADM-2026-101',
      applicantBn: 'আব্দুল্লাহ আল নোমান',
      applicantEn: 'Abdullah Al Noman',
      applyingClass: 11,
      group: 'SCIENCE',
      gender: 'MALE',
      dob: new Date('2009-08-15'),
      bloodGroup: 'B+',
      guardianNameBn: 'কবির হোসেন',
      guardianNameEn: 'Kabir Hossain',
      guardianPhone: '+880 1812-998811',
      address: 'মিরসরাই, চট্টগ্রাম',
      previousSchool: 'Mirsharai Pilot Model High School',
      gpa: 5.0,
      status: 'PENDING',
    },
  });

  console.log('✅ Seeding completed successfully for Mirsharai School and College!');
  console.log('Credentials for all 7 roles (Password: msc123456):');
  console.log('  1. Super Admin: superadmin');
  console.log('  2. Admin:       admin');
  console.log('  3. Teacher:     teacher');
  console.log('  4. Student:     student (or MSC-2026-1001)');
  console.log('  5. Parent:      parent');
  console.log('  6. Accountant:  accountant');
  console.log('  7. Staff:       staff');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
