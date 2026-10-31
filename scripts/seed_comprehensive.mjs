import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Starting Comprehensive Seeding for Mirsharai School and College...');

  const passwordHash = await bcrypt.hash('msc123456', 10);

  // 1. Clean existing records
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

  console.log('🧹 Database wiped.');

  // 2. School Settings
  await prisma.schoolSetting.create({
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

  // 4. Classes 1 to 12
  const classDefs = [
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

  const classesMap = {};
  const sectionsMap = {};

  for (const c of classDefs) {
    const createdClass = await prisma.class.create({
      data: {
        numericValue: c.num,
        nameBn: c.bn,
        nameEn: c.en,
        level: c.level,
      },
    });
    classesMap[c.num] = createdClass;

    // Create Section A and Section B for each class
    const secA = await prisma.section.create({
      data: {
        classId: createdClass.id,
        nameBn: 'ক শাখা (পদ্মা)',
        nameEn: 'Section A (Padma)',
        roomNo: `Room-${c.num}01`,
        capacity: 60,
      },
    });
    sectionsMap[c.num] = secA;

    await prisma.section.create({
      data: {
        classId: createdClass.id,
        nameBn: 'খ শাখা (মেঘনা)',
        nameEn: 'Section B (Meghna)',
        roomNo: `Room-${c.num}02`,
        capacity: 60,
      },
    });
  }

  // 5. Subjects Setup
  const subBangla = await prisma.subject.create({
    data: { classId: classesMap[10].id, code: '101', nameBn: 'বাংলা', nameEn: 'Bangla', fullMarks: 100, passMarks: 33 },
  });
  const subEnglish = await prisma.subject.create({
    data: { classId: classesMap[10].id, code: '107', nameBn: 'ইংরেজি', nameEn: 'English', fullMarks: 100, passMarks: 33 },
  });
  const subMath = await prisma.subject.create({
    data: { classId: classesMap[10].id, code: '109', nameBn: 'গণিত', nameEn: 'Mathematics', fullMarks: 100, passMarks: 33 },
  });
  const subPhysics = await prisma.subject.create({
    data: { classId: classesMap[10].id, code: '136', nameBn: 'পদার্থবিজ্ঞান', nameEn: 'Physics', group: 'SCIENCE', fullMarks: 100, passMarks: 33 },
  });
  const subChemistry = await prisma.subject.create({
    data: { classId: classesMap[10].id, code: '137', nameBn: 'রসায়ন', nameEn: 'Chemistry', group: 'SCIENCE', fullMarks: 100, passMarks: 33 },
  });
  const subBiology = await prisma.subject.create({
    data: { classId: classesMap[10].id, code: '138', nameBn: 'জীববিজ্ঞান', nameEn: 'Biology', group: 'SCIENCE', fullMarks: 100, passMarks: 33 },
  });
  const subICT = await prisma.subject.create({
    data: { classId: classesMap[10].id, code: '154', nameBn: 'তথ্য ও যোগাযোগ প্রযুক্তি', nameEn: 'ICT', fullMarks: 50, passMarks: 17 },
  });

  // 6. Create Exactly 30 Teachers with Complete Profiles
  const teacherDataList = [
    { empId: 'MSC-TEA-001', nameBn: 'প্রফেসর মোঃ কামরুল হাসান', nameEn: 'Prof. Md. Kamrul Hasan', desBn: 'অধ্যক্ষ', desEn: 'Principal', dept: 'Administration', qual: 'M.Sc (Physics), B.Ed (1st Class)', phone: '+880 1812-345678', email: 'principal@mirsharaicollege.edu.bd' },
    { empId: 'MSC-TEA-002', nameBn: 'প্রফেসর সুব্রত কুমার চৌধুরী', nameEn: 'Prof. Subrata Kumar Chowdhury', desBn: 'উপাধ্যক্ষ', desEn: 'Vice Principal', dept: 'Administration', qual: 'M.A (English), M.Ed', phone: '+880 1813-112233', email: 'subrata.vp@mirsharaicollege.edu.bd' },
    { empId: 'MSC-TEA-003', nameBn: 'প্রফেসর মোঃ রফিকুল ইসলাম', nameEn: 'Prof. Md. Rafiqul Islam', desBn: 'সহকারী অধ্যাপক (পদার্থবিজ্ঞান)', desEn: 'Assistant Professor (Physics)', dept: 'Science', qual: 'M.Sc (Physics, DU), B.Ed', phone: '+880 1819-234567', email: 'teacher@mirsharaicollege.edu.bd', isUser: true },
    { empId: 'MSC-TEA-004', nameBn: 'ড. নাজমুল হক মজুমদার', nameEn: 'Dr. Nazmul Haque Mazumder', desBn: 'সহকারী অধ্যাপক (রসায়ন)', desEn: 'Assistant Professor (Chemistry)', dept: 'Science', qual: 'Ph.D, M.Sc (Chemistry, CU)', phone: '+880 1814-223344', email: 'nazmul.chem@mirsharaicollege.edu.bd' },
    { empId: 'MSC-TEA-005', nameBn: 'জনাব মোঃ জহিরুল আলম', nameEn: 'Md. Zahirul Alam', desBn: 'সহকারী অধ্যাপক (গণিত)', desEn: 'Assistant Professor (Mathematics)', dept: 'Mathematics', qual: 'M.Sc (Applied Math), B.Ed', phone: '+880 1815-334455', email: 'zahirul.math@mirsharaicollege.edu.bd' },
    { empId: 'MSC-TEA-006', nameBn: 'বেগম ফারহানা ইয়াসমিন', nameEn: 'Farhana Yasmin', desBn: 'সহকারী অধ্যাপক (জীববিজ্ঞান)', desEn: 'Assistant Professor (Biology)', dept: 'Science', qual: 'M.Sc (Botany, RU)', phone: '+880 1816-445566', email: 'farhana.bio@mirsharaicollege.edu.bd' },
    { empId: 'MSC-TEA-007', nameBn: 'জনাব মোহাম্মদ হোসেন ভূঁইয়া', nameEn: 'Mohammad Hossain Bhuiyan', desBn: 'সহকারী অধ্যাপক (হিসাববিজ্ঞান)', desEn: 'Assistant Professor (Accounting)', dept: 'Business Studies', qual: 'M.Com, MBA (Accounting)', phone: '+880 1817-556677', email: 'hossain.acc@mirsharaicollege.edu.bd' },
    { empId: 'MSC-TEA-008', nameBn: 'বেগম নাসরিন জাহান', nameEn: 'Nasrin Jahan', desBn: 'সহকারী অধ্যাপক (অর্থনীতি)', desEn: 'Assistant Professor (Economics)', dept: 'Humanities', qual: 'M.S.S (Economics, DU)', phone: '+880 1818-667788', email: 'nasrin.eco@mirsharaicollege.edu.bd' },
    { empId: 'MSC-TEA-009', nameBn: 'জনাব সৈয়দ আহমেদ রেজা', nameEn: 'Syed Ahmed Reza', desBn: 'সহকারী অধ্যাপক (ইংরেজি)', desEn: 'Assistant Professor (English)', dept: 'English', qual: 'M.A (English Literature, CU)', phone: '+880 1819-778899', email: 'reza.eng@mirsharaicollege.edu.bd' },
    { empId: 'MSC-TEA-010', nameBn: 'জনাব মোহাম্মদ আনিসুর রহমান', nameEn: 'Mohammad Anisur Rahman', desBn: 'সহকারী অধ্যাপক (বাংলা)', desEn: 'Assistant Professor (Bangla)', dept: 'Bangla', qual: 'M.A (Bangla, DU), M.Phil', phone: '+880 1820-889900', email: 'anisur.bangla@mirsharaicollege.edu.bd' },
    { empId: 'MSC-TEA-011', nameBn: 'জনাব তারেক মাহমুদ', nameEn: 'Tarek Mahmud', desBn: 'প্রভাষক (আইসিটি ও সিএসই)', desEn: 'Lecturer (ICT & Computer Science)', dept: 'ICT', qual: 'B.Sc (Engg) in CSE (CUET)', phone: '+880 1821-990011', email: 'tarek.ict@mirsharaicollege.edu.bd' },
    { empId: 'MSC-TEA-012', nameBn: 'জনাব মোঃ শওকত ওসমান', nameEn: 'Md. Shawkat Osman', desBn: 'প্রভাষক (ব্যবসায় সংগঠন)', desEn: 'Lecturer (Business Org & Mgt)', dept: 'Business Studies', qual: 'M.B.A (Management)', phone: '+880 1822-001122', email: 'shawkat.mgt@mirsharaicollege.edu.bd' },
    { empId: 'MSC-TEA-013', nameBn: 'বেগম শামীমা আক্তার', nameEn: 'Shamima Akter', desBn: 'প্রভাষক (পরিসংখ্যান)', desEn: 'Lecturer (Statistics)', dept: 'Science', qual: 'M.Sc (Statistics, CU)', phone: '+880 1823-112233', email: 'shamima.stat@mirsharaicollege.edu.bd' },
    { empId: 'MSC-TEA-014', nameBn: 'মাওলানা মোঃ আব্দুল কাদের', nameEn: 'Mawlana Md. Abdul Kader', desBn: 'সিনিয়র শিক্ষক (ইসলাম শিক্ষা)', desEn: 'Senior Teacher (Islamic Studies)', dept: 'Religious Studies', qual: 'Kamil (Hadith), M.A (Islamic Studies)', phone: '+880 1824-223344', email: 'kader.islamic@mirsharaicollege.edu.bd' },
    { empId: 'MSC-TEA-015', nameBn: 'জনাব বিপ্লব কান্তি দাশ', nameEn: 'Biplob Kanti Das', desBn: 'সিনিয়র শিক্ষক (গণিত)', desEn: 'Senior Teacher (Mathematics)', dept: 'Mathematics', qual: 'B.Sc (Honours), M.Sc, B.Ed', phone: '+880 1825-334455', email: 'biplob.math@mirsharaicollege.edu.bd' },
    { empId: 'MSC-TEA-016', nameBn: 'বেগম রুমানা আফরোজ', nameEn: 'Rumana Afroz', desBn: 'সিনিয়র শিক্ষক (ইংরেজি)', desEn: 'Senior Teacher (English)', dept: 'English', qual: 'M.A (English), B.Ed', phone: '+880 1826-445566', email: 'rumana.eng@mirsharaicollege.edu.bd' },
    { empId: 'MSC-TEA-017', nameBn: 'জনাব মোঃ আবুল কাশেম', nameEn: 'Md. Abul Kashem', desBn: 'সিনিয়র শিক্ষক (বিজ্ঞান)', desEn: 'Senior Teacher (General Science)', dept: 'Science', qual: 'B.Sc, B.Ed', phone: '+880 1827-556677', email: 'kashem.sci@mirsharaicollege.edu.bd' },
    { empId: 'MSC-TEA-018', nameBn: 'বেগম সাবিহা সুলতানা', nameEn: 'Sabiha Sultana', desBn: 'সিনিয়র শিক্ষক (বাংলা)', desEn: 'Senior Teacher (Bangla)', dept: 'Bangla', qual: 'M.A (Bangla), B.Ed', phone: '+880 1828-667788', email: 'sabiha.bangla@mirsharaicollege.edu.bd' },
    { empId: 'MSC-TEA-019', nameBn: 'জনাব উজ্জ্বল কুমার নাথ', nameEn: 'Ujjal Kumar Nath', desBn: 'সিনিয়র শিক্ষক (ভূগোল ও পরিবেশ)', desEn: 'Senior Teacher (Geography)', dept: 'Humanities', qual: 'M.Sc (Geography), B.Ed', phone: '+880 1829-778899', email: 'ujjal.geo@mirsharaicollege.edu.bd' },
    { empId: 'MSC-TEA-020', nameBn: 'জনাব মোঃ জসিম উদ্দিন', nameEn: 'Md. Jasim Uddin', desBn: 'সহকারী শিক্ষক (সামাজিক বিজ্ঞান)', desEn: 'Assistant Teacher (Social Science)', dept: 'Humanities', qual: 'B.A (Honours), M.A', phone: '+880 1830-889900', email: 'jasim.soc@mirsharaicollege.edu.bd' },
    { empId: 'MSC-TEA-021', nameBn: 'বেগম তানিয়া মোস্তফা', nameEn: 'Tania Mostafa', desBn: 'সহকারী শিক্ষক (ইংরেজি)', desEn: 'Assistant Teacher (English)', dept: 'English', qual: 'M.A (English)', phone: '+880 1831-990011', email: 'tania.eng@mirsharaicollege.edu.bd' },
    { empId: 'MSC-TEA-022', nameBn: 'জনাব মোঃ মাহবুবুল আলম', nameEn: 'Md. Mahbubul Alam', desBn: 'সহকারী শিক্ষক (শারীরিক শিক্ষা)', desEn: 'Physical Education Instructor', dept: 'Physical Education', qual: 'B.P.Ed, M.P.Ed', phone: '+880 1832-001122', email: 'mahbub.sports@mirsharaicollege.edu.bd' },
    { empId: 'MSC-TEA-023', nameBn: 'জনাব আশীষ রঞ্জন পাল', nameEn: 'Ashish Ranjan Paul', desBn: 'সহকারী শিক্ষক (চারু ও কারুকলা)', desEn: 'Art & Craft Instructor', dept: 'Fine Arts', qual: 'B.F.A (Fine Arts, Chittagong University)', phone: '+880 1833-112233', email: 'ashish.art@mirsharaicollege.edu.bd' },
    { empId: 'MSC-TEA-024', nameBn: 'বেগম নাজমুন নাহার', nameEn: 'Nazmun Nahar', desBn: 'সহকারী শিক্ষক (কৃষি শিক্ষা)', desEn: 'Assistant Teacher (Agriculture)', dept: 'Vocational', qual: 'B.Sc (Agri), B.Ed', phone: '+880 1834-223344', email: 'nazmun.agri@mirsharaicollege.edu.bd' },
    { empId: 'MSC-TEA-025', nameBn: 'জনাব মোঃ শাহিনুর রহমান', nameEn: 'Md. Shahinur Rahman', desBn: 'সহকারী শিক্ষক (কম্পিউটার)', desEn: 'Assistant Teacher (Computer)', dept: 'ICT', qual: 'B.Sc (Computer Science)', phone: '+880 1835-334455', email: 'shahinur.comp@mirsharaicollege.edu.bd' },
    { empId: 'MSC-TEA-026', nameBn: 'বেগম ফেরদৌসি বেগম', nameEn: 'Ferdousi Begum', desBn: 'সহকারী শিক্ষক (গার্হস্থ্য বিজ্ঞান)', desEn: 'Assistant Teacher (Home Science)', dept: 'Home Economics', qual: 'M.Sc (Home Economics)', phone: '+880 1836-445566', email: 'ferdousi.home@mirsharaicollege.edu.bd' },
    { empId: 'MSC-TEA-027', nameBn: 'জনাব মোঃ নুরুল করিম', nameEn: 'Md. Nurul Karim', desBn: 'সহকারী শিক্ষক (প্রাথমিক শাখা)', desEn: 'Assistant Teacher (Primary Wing)', dept: 'Primary', qual: 'B.Ed, C-in-Ed', phone: '+880 1837-556677', email: 'karim.prim@mirsharaicollege.edu.bd' },
    { empId: 'MSC-TEA-028', nameBn: 'বেগম তাহমিনা আক্তার', nameEn: 'Tahmina Akter', desBn: 'সহকারী শিক্ষক (প্রাথমিক শাখা)', desEn: 'Assistant Teacher (Primary Wing)', dept: 'Primary', qual: 'B.A, C-in-Ed', phone: '+880 1838-667788', email: 'tahmina.prim@mirsharaicollege.edu.bd' },
    { empId: 'MSC-TEA-029', nameBn: 'জনাব কাজী মোঃ ইমরান', nameEn: 'Kazi Md. Imran', desBn: 'সহকারী শিক্ষক (প্রাথমিক শাখা)', desEn: 'Assistant Teacher (Primary Wing)', dept: 'Primary', qual: 'B.Sc, B.Ed', phone: '+880 1839-778899', email: 'imran.prim@mirsharaicollege.edu.bd' },
    { empId: 'MSC-TEA-030', nameBn: 'বেগম শিরীন আক্তার', nameEn: 'Shirin Akter', desBn: 'সহকারী শিক্ষক (প্রাথমিক শাখা)', desEn: 'Assistant Teacher (Primary Wing)', dept: 'Primary', qual: 'M.A, B.Ed', phone: '+880 1840-889900', email: 'shirin.prim@mirsharaicollege.edu.bd' },
  ];

  let primaryTeacherStaff = null;
  let orderIndex = 1;

  for (const t of teacherDataList) {
    let createdUserId = null;
    if (t.isUser) {
      const u = await prisma.user.create({
        data: {
          username: 'teacher',
          email: t.email,
          passwordHash,
          role: 'TEACHER',
        },
      });
      createdUserId = u.id;
    }

    const st = await prisma.staff.create({
      data: {
        userId: createdUserId,
        employeeId: t.empId,
        nameBn: t.nameBn,
        nameEn: t.nameEn,
        designationBn: t.desBn,
        designationEn: t.desEn,
        department: t.dept,
        phone: t.phone,
        email: t.email,
        qualification: t.qual,
        joiningDate: new Date('2015-02-01'),
        photoUrl: '/images/school-assembly.jpg',
        isTeacher: true,
        order: orderIndex++,
      },
    });

    if (t.isUser) {
      primaryTeacherStaff = st;
    }
  }

  console.log('✅ 30 Teachers created successfully!');

  // 7. Core User Accounts (Super Admin, Admin, Parent, Accountant, Staff)
  await prisma.user.create({
    data: { username: 'superadmin', email: 'superadmin@mirsharaicollege.edu.bd', passwordHash, role: 'SUPER_ADMIN' },
  });
  await prisma.user.create({
    data: { username: 'admin', email: 'admin@mirsharaicollege.edu.bd', passwordHash, role: 'ADMIN' },
  });

  const parentUser = await prisma.user.create({
    data: { username: 'parent', email: 'parent@mirsharaicollege.edu.bd', passwordHash, role: 'PARENT' },
  });

  const guardian = await prisma.guardian.create({
    data: {
      userId: parentUser.id,
      nameBn: 'জনাব নুরুল ইসলাম',
      nameEn: 'Nurul Islam',
      relation: 'FATHER',
      phone: '+880 1819-998877',
      email: 'parent@mirsharaicollege.edu.bd',
      occupation: 'Government Service',
      address: 'মিরসরাই, চট্টগ্রাম',
    },
  });

  const accountantUser = await prisma.user.create({
    data: { username: 'accountant', email: 'accountant@mirsharaicollege.edu.bd', passwordHash, role: 'ACCOUNTANT' },
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

  const staffUser = await prisma.user.create({
    data: { username: 'staff', email: 'staff@mirsharaicollege.edu.bd', passwordHash, role: 'STAFF' },
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

  // Additional support staff
  await prisma.staff.create({
    data: {
      employeeId: 'MSC-STAFF-002',
      nameBn: 'মোহাম্মদ মোস্তফা',
      nameEn: 'Mohammad Mostafa',
      designationBn: 'গ্রন্থাগারিক',
      designationEn: 'Librarian',
      department: 'Library',
      phone: '+880 1816-778899',
      isTeacher: false,
    },
  });

  // 8. Create 20 Students per Class across all 12 Classes (Total 240 Students)
  const bengaliFirstNames = [
    { bn: 'তানভীর আহমেদ', en: 'Tanvir Ahmed', gender: 'MALE' },
    { bn: 'ফাতেমা তুজ জোহরা', en: 'Fatema Tuz Zohra', gender: 'FEMALE' },
    { bn: 'সাদিয়া জাহান', en: 'Sadia Jahan', gender: 'FEMALE' },
    { bn: 'রাকিবুল হাসান', en: 'Rakibul Hasan', gender: 'MALE' },
    { bn: 'মেহেদী হাসান রনি', en: 'Mehedi Hasan Roni', gender: 'MALE' },
    { bn: 'নুসরাত জাহান মিম', en: 'Nusrat Jahan Mim', gender: 'FEMALE' },
    { bn: 'আসিফ ইকবাল', en: 'Asif Iqbal', gender: 'MALE' },
    { bn: 'জান্নাতুল ফেরদৌস', en: 'Jannatul Ferdous', gender: 'FEMALE' },
    { bn: 'মাহমুদুল হক', en: 'Mahmudul Haque', gender: 'MALE' },
    { bn: 'আয়েশা সিদ্দিকা', en: 'Ayesha Siddika', gender: 'FEMALE' },
    { bn: 'শাকিব আল হাসান', en: 'Shakib Al Hasan', gender: 'MALE' },
    { bn: 'মারিয়া আক্তার', en: 'Maria Akter', gender: 'FEMALE' },
    { bn: 'সোহাগ মিয়া', en: 'Sohag Miah', gender: 'MALE' },
    { bn: 'তানজিনা সুলতানা', en: 'Tanjina Sultana', gender: 'FEMALE' },
    { bn: 'নাজমুল ইসলাম', en: 'Nazmul Islam', gender: 'MALE' },
    { bn: 'সুমাইয়া আক্তার', en: 'Sumaiya Akter', gender: 'FEMALE' },
    { bn: 'আরিফুল ইসলাম', en: 'Ariful Islam', gender: 'MALE' },
    { bn: 'সামিয়া তাসনিম', en: 'Samia Tasnim', gender: 'FEMALE' },
    { bn: 'জাহিদুল ইসলাম', en: 'Zahidul Islam', gender: 'MALE' },
    { bn: 'রুবাইয়া জাহান', en: 'Rubaiya Jahan', gender: 'FEMALE' },
  ];

  const bloodGroups = ['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-'];
  let totalStudentCount = 0;
  let demoStudent = null;

  // Fee Category setup
  const feeTuition = await prisma.feeCategory.create({
    data: { code: 'TUITION', nameBn: 'মাসিক টিউশন ফি', nameEn: 'Monthly Tuition Fee', isMonthly: true },
  });
  const feeExam = await prisma.feeCategory.create({
    data: { code: 'EXAM', nameBn: 'পরীক্ষা ফি', nameEn: 'Examination Fee', isMonthly: false },
  });

  for (let cNum = 1; cNum <= 12; cNum++) {
    const cls = classesMap[cNum];
    const sec = sectionsMap[cNum];

    for (let r = 1; r <= 20; r++) {
      const nameObj = bengaliFirstNames[r - 1];
      const studentId = `MSC-2026-${cNum.toString().padStart(2, '0')}${r.toString().padStart(2, '0')}`;
      const admissionNo = `ADM-2026-${cNum.toString().padStart(2, '0')}${r.toString().padStart(2, '0')}`;

      let studentUserId = null;
      // Connect first student of class 10 to student demo user
      if (cNum === 10 && r === 1) {
        const u = await prisma.user.create({
          data: {
            username: 'student',
            email: 'student@mirsharaicollege.edu.bd',
            passwordHash,
            role: 'STUDENT',
          },
        });
        studentUserId = u.id;
      }

      const grp = cNum >= 9 ? (r <= 10 ? 'SCIENCE' : (r <= 15 ? 'BUSINESS_STUDIES' : 'HUMANITIES')) : 'GENERAL';

      const s = await prisma.student.create({
        data: {
          userId: studentUserId,
          studentId,
          admissionNo,
          roll: r,
          nameBn: nameObj.bn,
          nameEn: nameObj.en,
          classId: cls.id,
          sectionId: sec.id,
          sessionId: session2026.id,
          group: grp,
          gender: nameObj.gender,
          dob: new Date(2010 + (10 - cNum), (r % 12), (r % 28) + 1),
          bloodGroup: bloodGroups[r % bloodGroups.length],
          phone: `+880 1810-${cNum.toString().padStart(2, '0')}${r.toString().padStart(4, '0')}`,
          address: 'মিরসরাই, চট্টগ্রাম',
          photoUrl: '/images/school-banner.jpg',
        },
      });

      totalStudentCount++;

      if (cNum === 10 && r === 1) {
        demoStudent = s;
        await prisma.studentGuardian.create({
          data: { studentId: s.id, guardianId: guardian.id },
        });
      }

      // Create an invoice for each student
      const tuitionAmt = cNum <= 5 ? 800 : (cNum <= 8 ? 1000 : (cNum <= 10 ? 1500 : 2000));
      const invStatus = r % 3 === 0 ? 'PAID' : (r % 3 === 1 ? 'UNPAID' : 'PARTIAL');
      const paidAmt = invStatus === 'PAID' ? tuitionAmt : (invStatus === 'PARTIAL' ? tuitionAmt / 2 : 0);

      const inv = await prisma.invoice.create({
        data: {
          invoiceNo: `INV-2026-${cNum.toString().padStart(2, '0')}${r.toString().padStart(2, '0')}`,
          studentId: s.id,
          sessionId: session2026.id,
          feeCategoryId: feeTuition.id,
          title: 'October 2026 Tuition Fee',
          month: 'October',
          amount: tuitionAmt,
          discount: 0,
          lateFee: 0,
          totalPayable: tuitionAmt,
          paidAmount: paidAmt,
          status: invStatus,
          dueDate: new Date('2026-11-10'),
          paidDate: invStatus === 'PAID' ? new Date('2026-10-15') : null,
        },
      });

      await prisma.invoiceItem.create({
        data: {
          invoiceId: inv.id,
          description: `Monthly Tuition - Class ${cNum}`,
          amount: tuitionAmt,
        },
      });

      if (invStatus === 'PAID') {
        await prisma.payment.create({
          data: {
            receiptNo: `RCT-2026-${cNum.toString().padStart(2, '0')}${r.toString().padStart(2, '0')}`,
            invoiceId: inv.id,
            studentId: s.id,
            amount: tuitionAmt,
            paymentMethod: r % 2 === 0 ? 'BKASH' : 'NAGAD',
            transactionId: `TRX-${r % 2 === 0 ? 'BKASH' : 'NAGAD'}-20261015-${r.toString().padStart(4, '0')}`,
            status: 'VERIFIED',
            paidAt: new Date('2026-10-15T11:00:00Z'),
            receivedBy: 'ONLINE_GATEWAY',
          },
        });
      }
    }
  }

  console.log(`✅ ${totalStudentCount} Students created across 12 Classes (20 per class)!`);

  // 9. Routine for Class 10
  const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY'];
  for (const day of days) {
    await prisma.routine.create({
      data: {
        classId: classesMap[10].id,
        sectionId: sectionsMap[10].id,
        subjectId: subMath.id,
        teacherId: primaryTeacherStaff.id,
        dayOfWeek: day,
        period: 1,
        startTime: '10:00 AM',
        endTime: '10:45 AM',
        roomNo: 'Room-1001',
      },
    });
    await prisma.routine.create({
      data: {
        classId: classesMap[10].id,
        sectionId: sectionsMap[10].id,
        subjectId: subEnglish.id,
        teacherId: primaryTeacherStaff.id,
        dayOfWeek: day,
        period: 2,
        startTime: '10:45 AM',
        endTime: '11:30 AM',
        roomNo: 'Room-1001',
      },
    });
    await prisma.routine.create({
      data: {
        classId: classesMap[10].id,
        sectionId: sectionsMap[10].id,
        subjectId: subPhysics.id,
        teacherId: primaryTeacherStaff.id,
        dayOfWeek: day,
        period: 3,
        startTime: '11:30 AM',
        endTime: '12:15 PM',
        roomNo: 'Room-1001',
      },
    });
  }

  // 10. Exam & Marks
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
      subjectId: subMath.id,
      examDate: new Date('2026-11-18'),
      startTime: '10:00 AM',
      endTime: '01:00 PM',
      roomNo: 'Hall-1',
    },
  });

  // Marks for demo student
  await prisma.mark.create({
    data: {
      examId: annualExam.id,
      subjectId: subBangla.id,
      studentId: demoStudent.id,
      writtenMarks: 62,
      mcqMarks: 26,
      practicalMarks: 0,
      totalMarks: 88,
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
      writtenMarks: 68,
      mcqMarks: 27,
      practicalMarks: 0,
      totalMarks: 95,
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
      writtenMarks: 49,
      mcqMarks: 23,
      practicalMarks: 24,
      totalMarks: 96,
      grade: 'A+',
      gpa: 5.0,
      isPassed: true,
      isApproved: true,
    },
  });

  // 11. Rich Official Notices with Details for Notice Board
  const noticesData = [
    {
      titleBn: '২০২৬ শিক্ষাবর্ষে ১ম থেকে ১২শ শ্রেণিতে ভর্তি সংক্রান্ত জরুরি বিজ্ঞপ্তি',
      titleEn: 'Admission Open for Session 2026 (Classes 1 to 12)',
      contentBn: 'এতদ্বারা মিরসরাই স্কুল এন্ড কলেজের সম্মানিত অভিভাবক ও শুভানুধ্যায়ীদের অবগতির জন্য জানানো যাচ্ছে যে, ২০২৬ শিক্ষাবর্ষে ১ম শ্রেণি থেকে দ্বাদশ শ্রেণি (বিজ্ঞান, ব্যবসায় শিক্ষা ও মানবিক বিভাগ) পর্যন্ত ভর্তি কার্যক্রম শুরু হয়েছে। আগ্রহী প্রার্থীদের প্রতিষ্ঠানের অফিসিয়াল ওয়েবসাইটে অনলাইন পোর্টালের মাধ্যমে নির্ধারিত সময়ের মধ্যে আবেদন সম্পন্ন করার জন্য অনুরোধ করা হচ্ছে। আবেদন ফি ও প্রয়োজনীয় সনদের তালিকা ওয়েবসাইটে পাওয়া যাবে।',
      contentEn: 'This is to inform all respected guardians and well-wishers that online admission applications for the academic session 2026 are now open for Classes 1 to 12 across Science, Business Studies, and Humanities streams. Candidates are requested to submit applications online through the official school portal before the deadline.',
      category: 'ADMISSION',
      isPinned: true,
    },
    {
      titleBn: '৯ম থেকে ১২শ শ্রেণির বার্ষিক পরীক্ষা ২০২৬ এর সময়সূচি প্রকাশ',
      titleEn: 'Annual Examination Routine 2026 Published (Class 9 to 12)',
      contentBn: 'চট্টগ্রাম মাধ্যমিক ও উচ্চ মাধ্যমিক শিক্ষা বোর্ডের নির্দেশনা মোতাবেক আগামী ১৫ নভেম্বর ২০২৬ তারিখ থেকে ৯ম, ১০ম, একাদশ ও দ্বাদশ শ্রেণির বার্ষিক পরীক্ষা অনুষ্ঠিত হবে। বিস্তারিত পরীক্ষার সময়সূচি বিদ্যালয়ের নোটিশ বোর্ড ও ওয়েবসাইটে প্রকাশ করা হলো। সকল পরীক্ষার্থীকে নির্ধারিত ইউনিফর্মে এবং পরীক্ষা শুরুর ৩০ মিনিট পূর্বে কেন্দ্রে উপস্থিত হতে হবে। পরীক্ষার হলে ডিজিটাল ডিভাইস আনা সম্পূর্ণ নিষিদ্ধ।',
      contentEn: 'According to the directives of the Board of Intermediate and Secondary Education, Chattogram, the Annual Examination 2026 for Classes 9 to 12 will commence on 15 November 2026. The full routine is available on the notice board and digital portal.',
      category: 'EXAM',
      isPinned: true,
    },
    {
      titleBn: 'পবিত্র ঈদে মিলাদুন্নবী (সাঃ) উপলক্ষে প্রতিষ্ঠান ছুটি সংক্রান্ত নোটিশ',
      titleEn: 'Institutional Holiday Notice on the Occasion of Holy Eid-e-Miladunnabi',
      contentBn: 'মিরসরাই স্কুল এন্ড কলেজের সকল শিক্ষক, কর্মচারী, শিক্ষার্থী ও অভিভাবকদের জানানো যাচ্ছে যে, পবিত্র ঈদে মিলাদুন্নবী (সাঃ) উপলক্ষে আগামী রবিবার প্রতিষ্ঠানের সকল পাঠদান ও প্রশাসনিক কার্যক্রম বন্ধ থাকবে। পরবর্তী কার্যদিবস থেকে নিয়মিত সময়সূচি অনুযায়ী সকল শ্রেণি কার্যক্রম যথারীতি চলবে।',
      contentEn: 'All teachers, employees, students, and guardians of Mirsharai School and College are hereby notified that the institution will remain closed on Sunday on the auspicious occasion of Holy Eid-e-Miladunnabi. Regular classes will resume on the next working day.',
      category: 'HOLIDAY',
      isPinned: false,
    },
    {
      titleBn: 'অর্ধবার্ষিক পরীক্ষার ডিজিটাল ফলাফল ও মার্কশিট ডাউনলোড',
      titleEn: 'Half-Yearly Examination Result Publication & Marksheet Download',
      contentBn: 'অত্যন্ত আনন্দের সাথে জানানো যাচ্ছে যে, ২০২৬ শিক্ষাবর্ষের অর্ধবার্ষিক পরীক্ষার ফলাফল ডিজিটাল শিক্ষার্থী পোর্টালে প্রকাশ করা হয়েছে। শিক্ষার্থী ও অভিভাবকগণ নিজ নিজ আইডি ও রোল নম্বর ব্যবহার করে ফলাফল দেখতে এবং প্রিন্টযোগ্য মার্কশিট ডাউনলোড করতে পারবেন। কোনো ফলাফল সংক্রান্ত আপত্তি থাকলে আগামী ৭ কর্মদিবসের মধ্যে পরীক্ষা নিয়ন্ত্রক শাখায় যোগাযোগ করতে হবে।',
      contentEn: 'The results for the Half-Yearly Examination 2026 have been officially published on the digital student portal. Students and parents can access their grades and download verified printable marksheets using their ID and roll numbers.',
      category: 'ACADEMIC',
      isPinned: false,
    },
    {
      titleBn: 'ডিজিটাল ল্যাব ও স্মার্ট ক্লাসরুম ব্যবহার নির্দেশিকা',
      titleEn: 'Guidelines for Digital Lab and Smart Classroom Access',
      contentBn: 'প্রতিষ্ঠানের নতুন মাল্টিমিডিয়া স্মার্ট ক্লাসরুম এবং শেখ রাসেল ডিজিটাল ল্যাব ব্যবহারের জন্য প্রণীত নতুন নিরাপত্তা ও ব্যবহারবিধি সকল শ্রেণির শিক্ষার্থীদের মেনে চলার নির্দেশ দেওয়া হলো। ল্যাবে খাদ্য ও পানীয় বহন নিষিদ্ধ।',
      contentEn: 'All students are requested to adhere strictly to the computer laboratory protocols and multimedia equipment guidelines. Food and beverages are prohibited inside laboratory premises.',
      category: 'GENERAL',
      isPinned: false,
    },
  ];

  for (const n of noticesData) {
    await prisma.notice.create({
      data: {
        titleBn: n.titleBn,
        titleEn: n.titleEn,
        contentBn: n.contentBn,
        contentEn: n.contentEn,
        category: n.category,
        isPinned: n.isPinned,
        status: 'PUBLISHED',
      },
    });
  }

  // 12. Events & Gallery & Downloads
  await prisma.academicEvent.createMany({
    data: [
      {
        titleBn: 'বার্ষিক ক্রীড়া প্রতিযোগিতা ও পুরস্কার বিতরণী ২০২৬',
        titleEn: 'Annual Athletics Meet & Prize Distribution 2026',
        descriptionBn: 'মিরসরাই স্কুল এন্ড কলেজের কেন্দ্রীয় খেলার মাঠে আয়োজিত হবে বর্ণাঢ্য ক্রীড়া উৎসব।',
        descriptionEn: 'The colorful Annual Athletics Meet at the college central sports pavilion.',
        type: 'SPORTS',
        startDate: new Date('2026-11-25'),
        endDate: new Date('2026-11-26'),
        locationBn: 'কলেজ খেলার মাঠ, মিরসরাই',
        locationEn: 'College Sports Pavilion, Mirsharai',
      },
      {
        titleBn: 'আন্তঃকলেজ বিজ্ঞান মেলা ও উদ্ভাবনী প্রজেক্ট প্রদর্শনী',
        titleEn: 'Science Fair & Innovation Expo 2026',
        descriptionBn: 'বিজ্ঞান বিভাগের শিক্ষার্থীদের উদ্ভাবনী রোবটিক্স ও পরিবেশবান্ধব প্রজেক্ট প্রদর্শনী।',
        descriptionEn: 'Robotics, IoT, and environmental innovation projects created by our college scholars.',
        type: 'EVENT',
        startDate: new Date('2026-12-05'),
        endDate: new Date('2026-12-06'),
        locationBn: 'অডিটোরিয়াম ও বিজ্ঞান ভবন',
        locationEn: 'Main Auditorium & Science Complex',
      },
      {
        titleBn: 'অভিভাবক সমাবেশ ও মতবিনিময় সভা',
        titleEn: 'Parent-Teacher Meeting & Academic Review',
        descriptionBn: 'শিক্ষার্থীদের সার্বিক মূল্যায়ন, উপস্থিতি ও নৈতিক মানোন্নয়নে অভিভাবক সমাবেশ।',
        descriptionEn: 'Interactive review session discussing student academic growth and discipline.',
        type: 'EVENT',
        startDate: new Date('2026-11-10'),
        endDate: new Date('2026-11-10'),
        locationBn: 'সেমিনার হল',
        locationEn: 'College Seminar Hall',
      },
    ],
  });

  await prisma.galleryItem.createMany({
    data: [
      { titleBn: 'স্মার্ট ক্লাসরুমে পাঠদান কার্যক্রম', titleEn: 'Smart Interactive Classroom', category: 'CLASSROOM', imageUrl: '/images/school-campus.jpg', order: 1 },
      { titleBn: 'বিজ্ঞান গবেষণাগারে ব্যবহারিক ক্লাস', titleEn: 'Physics & Chemistry Practical Lab', category: 'LAB', imageUrl: '/images/school-assembly.jpg', order: 2 },
      { titleBn: 'সমৃদ্ধ কেন্দ্রীয় গ্রন্থাগার', titleEn: 'Central College Library', category: 'CAMPUS', imageUrl: '/images/school-banner.jpg', order: 3 },
      { titleBn: 'বার্ষিক ক্রীড়া ও অ্যাথলেটিক্স', titleEn: 'Annual Athletics & Sports Field', category: 'SPORTS', imageUrl: '/images/school-campus.jpg', order: 4 },
    ],
  });

  await prisma.downloadItem.createMany({
    data: [
      { titleBn: '২০২৬ শিক্ষাবর্ষের একাডেমিক ক্যালেন্ডার ও ছুটির তালিকা', titleEn: 'Academic Calendar & Holiday List 2026', category: 'CALENDAR', fileUrl: '/downloads/academic-calendar-2026.pdf', fileSize: '1.2 MB' },
      { titleBn: '১ম থেকে ১২শ শ্রেণির পূর্ণাঙ্গ পাঠ্যক্রম ও সিলেবাস', titleEn: 'Complete Syllabus for Class 1 to 12', category: 'SYLLABUS', fileUrl: '/downloads/syllabus-class-1-12.pdf', fileSize: '3.4 MB' },
      { titleBn: 'ভর্তি আবেদন ফরম (প্রিন্ট অনুলিপি)', titleEn: 'Admission Application Form (Printable)', category: 'FORM', fileUrl: '/downloads/admission-form.pdf', fileSize: '450 KB' },
    ],
  });

  // 13. Financial Accounts & Expense records
  await prisma.account.create({ data: { code: '1010', nameBn: 'নগদ তহবিল', nameEn: 'Cash in Hand', type: 'ASSET', balance: 250000 } });
  await prisma.account.create({ data: { code: '1020', nameBn: 'সোনালী ব্যাংক পিএলসি - জেনারেল ফান্ড', nameEn: 'Sonali Bank PLC - General Fund', type: 'ASSET', balance: 2450000 } });
  await prisma.bankAccount.create({
    data: {
      bankName: 'Sonali Bank PLC',
      branchName: 'Mirsharai Branch',
      accountNumber: 'SB-0192837465',
      accountTitle: 'Mirsharai School and College Fund',
      routingNumber: '200150123',
      currentBalance: 2450000,
    },
  });

  await prisma.expense.create({
    data: {
      voucherNo: 'EXP-2026-10-001',
      category: 'UTILITY',
      amount: 22500,
      description: 'Electricity bill for October 2026 (PDB Mirsharai Substation)',
      expenseDate: new Date('2026-10-20'),
      approvedBy: 'Prof. Md. Kamrul Hasan (Principal)',
    },
  });

  // 14. Pending Admissions
  await prisma.admissionApplication.createMany({
    data: [
      {
        applicationNo: 'MSC-ADM-2026-001',
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
      {
        applicationNo: 'MSC-ADM-2026-002',
        applicantBn: 'মেহেদী হাসান শুভ',
        applicantEn: 'Mehedi Hasan Shuvo',
        applyingClass: 9,
        group: 'SCIENCE',
        gender: 'MALE',
        dob: new Date('2011-03-22'),
        bloodGroup: 'A+',
        guardianNameBn: 'আবুল কালাম',
        guardianNameEn: 'Abul Kalam',
        guardianPhone: '+880 1813-887766',
        address: 'বারতাকিয়া, মিরসরাই',
        previousSchool: 'Baratakia Government Primary School',
        gpa: 4.85,
        status: 'PENDING',
      },
    ],
  });

  console.log('🎉 COMPREHENSIVE SEEDING COMPLETED!');
  console.log(`- Teachers Created: 30`);
  console.log(`- Students Created: 240 (20 students in each of 12 classes)`);
  console.log(`- All Role Demo Accounts Ready: password "msc123456"`);
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
