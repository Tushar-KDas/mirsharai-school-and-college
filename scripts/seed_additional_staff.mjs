import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const additionalStaff = [
  {
    employeeId: 'MSC-STF-004',
    nameBn: 'শিরিন সুলতানা',
    nameEn: 'Shirin Sultana',
    designationBn: 'সহকারী গ্রন্থাগারিক',
    designationEn: 'Assistant Librarian',
    department: 'Library',
    phone: '01815-778899',
    email: 'library@mirsharaicollege.edu.bd',
    qualification: 'Diploma in Library Science',
    isTeacher: false,
    order: 4,
  },
  {
    employeeId: 'MSC-STF-005',
    nameBn: 'মো. দেলোয়ার হোসেন',
    nameEn: 'Md. Delowar Hossain',
    designationBn: 'পদার্থবিজ্ঞান ল্যাব সহকারী',
    designationEn: 'Physics Lab Assistant',
    department: 'Science Labs',
    phone: '01818-223344',
    email: 'physicslab@mirsharaicollege.edu.bd',
    qualification: 'HSC Science',
    isTeacher: false,
    order: 5,
  },
  {
    employeeId: 'MSC-STF-006',
    nameBn: 'ফারহানা ইয়াসমিন',
    nameEn: 'Farhana Yasmin',
    designationBn: 'রসায়ন ল্যাব সহকারী',
    designationEn: 'Chemistry Lab Assistant',
    department: 'Science Labs',
    phone: '01818-334455',
    email: 'chemlab@mirsharaicollege.edu.bd',
    qualification: 'B.Sc (Pass)',
    isTeacher: false,
    order: 6,
  },
  {
    employeeId: 'MSC-STF-007',
    nameBn: 'মো. কামরুল ইসলাম',
    nameEn: 'Md. Kamrul Islam',
    designationBn: 'আইসিটি ও কম্পিউটার ল্যাব টেকনিশিয়ান',
    designationEn: 'IT & Hardware Technician',
    department: 'ICT Cell',
    phone: '01819-445566',
    email: 'ithelp@mirsharaicollege.edu.bd',
    qualification: 'Diploma in Computer Tech',
    isTeacher: false,
    order: 7,
  },
  {
    employeeId: 'MSC-STF-008',
    nameBn: 'জাহাঙ্গীর আলম',
    nameEn: 'Jahangir Alam',
    designationBn: 'পরিবহন সুপারভাইজার',
    designationEn: 'Transport Fleet Supervisor',
    department: 'Transport',
    phone: '01819-987654',
    email: 'transport@mirsharaicollege.edu.bd',
    qualification: 'BA (Pass)',
    isTeacher: false,
    order: 8,
  },
  {
    employeeId: 'MSC-STF-009',
    nameBn: 'নুরুল আফসার',
    nameEn: 'Nurul Afsar',
    designationBn: 'সিনিয়র বাস চালক (রুট-১)',
    designationEn: 'Senior Bus Driver (Route 1)',
    department: 'Transport',
    phone: '01812-776655',
    email: null,
    qualification: 'BRTA Heavy License',
    isTeacher: false,
    order: 9,
  },
  {
    employeeId: 'MSC-STF-010',
    nameBn: 'মো. জসিম উদ্দিন',
    nameEn: 'Md. Jasim Uddin',
    designationBn: 'বাস চালক (রুট-২)',
    designationEn: 'Bus Driver (Route 2)',
    department: 'Transport',
    phone: '01813-887766',
    email: null,
    qualification: 'BRTA Medium License',
    isTeacher: false,
    order: 10,
  },
  {
    employeeId: 'MSC-STF-011',
    nameBn: 'বাবুল মিয়া',
    nameEn: 'Babul Mia',
    designationBn: 'প্রধান নিরাপত্তা প্রহরী',
    designationEn: 'Chief Security Guard',
    department: 'Security',
    phone: '01814-998877',
    email: null,
    qualification: 'Security Certified',
    isTeacher: false,
    order: 11,
  },
  {
    employeeId: 'MSC-STF-012',
    nameBn: 'আবুল কাশেম',
    nameEn: 'Abul Kashem',
    designationBn: 'ইলেকট্রিশিয়ান ও ক্যাম্পাস রক্ষণাবেক্ষণ কর্মী',
    designationEn: 'Electrician & Campus Maintenance',
    department: 'Maintenance',
    phone: '01816-554433',
    email: null,
    qualification: 'Electrical Trade Course',
    isTeacher: false,
    order: 12,
  },
];

async function main() {
  for (const st of additionalStaff) {
    const existing = await prisma.staff.findUnique({
      where: { employeeId: st.employeeId },
    });
    if (!existing) {
      await prisma.staff.create({ data: st });
      console.log('Created staff:', st.employeeId, st.nameEn);
    }
  }
  const count = await prisma.staff.count({ where: { isTeacher: false } });
  console.log('Total non-teaching staff in DB:', count);
}

main().finally(() => prisma.$disconnect());
