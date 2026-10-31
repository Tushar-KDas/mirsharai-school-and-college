import { PrismaClient } from '@prisma/client';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const prisma = new PrismaClient();

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyDuwddr0viqFH9QUkA1SIAOLC7_FbcwbTI',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'mirsharai-school-and-college.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'mirsharai-school-and-college',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'mirsharai-school-and-college.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '410698632400',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:410698632400:web:718cee40dbaecfe03da2d5',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function clean(obj) {
  const res = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined && v !== null) {
      if (Array.isArray(v)) {
        res[k] = v.map((item) => (typeof item === 'object' && item !== null ? clean(item) : item));
      } else if (typeof v === 'object' && !(v instanceof Date)) {
        res[k] = clean(v);
      } else {
        res[k] = v;
      }
    }
  }
  return res;
}

async function syncAll() {
  console.log('🚀 Starting sync from local database to Firebase Cloud Firestore...');

  // 1. Institution Metadata
  console.log('1. Syncing Institution Profile...');
  await setDoc(doc(db, 'institution', 'settings'), clean({
    nameBn: 'মিরসরাই স্কুল এন্ড কলেজ',
    nameEn: 'Mirsharai School and College',
    eiin: '104523',
    established: 1972,
    location: 'Mirsharai, Chattogram, Bangladesh',
    email: 'info@mirsharaicollege.edu.bd',
    phone: '+880 1812-345678',
    lastSyncAt: new Date().toISOString(),
  }));

  // 2. Notices
  console.log('2. Syncing Notices...');
  const notices = await prisma.notice.findMany();
  for (const n of notices) {
    await setDoc(doc(db, 'notices', n.id), clean({
      titleBn: n.titleBn,
      titleEn: n.titleEn,
      contentBn: n.contentBn,
      contentEn: n.contentEn,
      category: n.category,
      isPinned: n.isPinned,
      publishedAt: n.publishedAt ? n.publishedAt.toISOString() : new Date().toISOString(),
    }));
  }

  // 3. Classes & Sections
  console.log('3. Syncing Classes & Sections...');
  const classes = await prisma.class.findMany({ include: { sections: true } });
  for (const c of classes) {
    await setDoc(doc(db, 'classes', c.id), clean({
      nameBn: c.nameBn,
      nameEn: c.nameEn,
      numericValue: c.numericValue,
      level: c.level,
      sections: c.sections.map((s) => ({
        id: s.id,
        nameBn: s.nameBn,
        nameEn: s.nameEn,
        roomNo: s.roomNo || 'Room 101',
        capacity: s.capacity,
      })),
    }));
  }

  // 4. Teachers (30 faculty members)
  console.log('4. Syncing Teachers...');
  const teachers = await prisma.staff.findMany({ where: { isTeacher: true } });
  for (const t of teachers) {
    await setDoc(doc(db, 'teachers', t.id), clean({
      nameBn: t.nameBn,
      nameEn: t.nameEn,
      designation: t.designation || 'Lecturer / Assistant Teacher',
      department: t.department || 'General Academic',
      qualification: t.qualification || 'M.Sc / M.A',
      phone: t.phone || '01812-000000',
      email: t.email || 'teacher@mirsharaicollege.edu.bd',
      avatarUrl: t.avatarUrl || '/images/teachers/principal.jpg',
      employeeId: t.employeeId,
      order: t.order,
    }));
  }

  // 5. Staff (12 non-teaching staff)
  console.log('5. Syncing Staff...');
  const staff = await prisma.staff.findMany({ where: { isTeacher: false } });
  for (const s of staff) {
    await setDoc(doc(db, 'staff', s.id), clean({
      nameBn: s.nameBn,
      nameEn: s.nameEn,
      designation: s.designation || 'Officer / Staff',
      department: s.department || 'Administration',
      phone: s.phone || '01812-000000',
      email: s.email || 'staff@mirsharaicollege.edu.bd',
      employeeId: s.employeeId,
    }));
  }

  // 6. Expenses (16 vouchers)
  console.log('6. Syncing Expenses...');
  const expenses = await prisma.expense.findMany();
  for (const exp of expenses) {
    await setDoc(doc(db, 'expenses', exp.id), clean({
      voucherNo: exp.voucherNo,
      category: exp.category,
      amount: exp.amount,
      description: exp.description,
      expenseDate: exp.expenseDate ? exp.expenseDate.toISOString() : new Date().toISOString(),
      approvedBy: exp.approvedBy || 'Admin Approved',
    }));
  }

  // 7. Library (16 book titles)
  console.log('7. Syncing Library Books...');
  const books = await prisma.libraryBook.findMany();
  for (const b of books) {
    await setDoc(doc(db, 'library_books', b.id), clean({
      title: b.title,
      author: b.author,
      isbn: b.isbn || 'N/A',
      category: b.category,
      copiesTotal: b.copiesTotal,
      copiesAvailable: b.copiesAvailable,
      rackLocation: b.rackLocation || 'General Stacks',
    }));
  }

  // 8. Transport Routes & Vehicles
  console.log('8. Syncing Transport...');
  const routes = await prisma.transportRoute.findMany({
    include: { stops: true, vehicles: true },
  });
  for (const r of routes) {
    await setDoc(doc(db, 'transport_routes', r.id), clean({
      routeName: r.routeName,
      routeCode: r.routeCode,
      startPoint: r.startPoint,
      endPoint: r.endPoint,
      monthlyFare: r.monthlyFare,
      stops: r.stops.map((st) => ({
        stopName: st.stopName,
        pickupTime: st.pickupTime,
        dropTime: st.dropTime,
        order: st.order,
      })),
      vehicles: r.vehicles.map((v) => ({
        vehicleNo: v.vehicleNo,
        driverName: v.driverName || 'Driver',
        driverPhone: v.driverPhone || '01812-000000',
        capacity: v.capacity,
      })),
    }));
  }

  // 9. Inventory Assets
  console.log('9. Syncing Inventory Assets...');
  const items = await prisma.inventoryItem.findMany();
  for (const it of items) {
    await setDoc(doc(db, 'inventory', it.id), clean({
      itemNameBn: it.itemNameBn,
      itemNameEn: it.itemNameEn,
      category: it.category,
      quantity: it.quantity,
      unit: it.unit,
      location: it.location || 'Central Campus',
    }));
  }

  // 10. Exams & Routine
  console.log('10. Syncing Examinations...');
  const exams = await prisma.exam.findMany({
    include: { schedules: { include: { subject: true } } },
  });
  for (const ex of exams) {
    await setDoc(doc(db, 'exams', ex.id), clean({
      titleBn: ex.titleBn,
      titleEn: ex.titleEn,
      examType: ex.examType,
      startDate: ex.startDate ? ex.startDate.toISOString() : new Date().toISOString(),
      endDate: ex.endDate ? ex.endDate.toISOString() : new Date().toISOString(),
      schedules: ex.schedules.map((sch) => ({
        subject: sch.subject.nameEn,
        code: sch.subject.code,
        examDate: sch.examDate ? sch.examDate.toISOString() : new Date().toISOString(),
        time: `${sch.startTime} - ${sch.endTime}`,
        fullMarks: sch.subject.fullMarks,
      })),
    }));
  }

  // 11. Students Sample
  console.log('11. Syncing Students...');
  const students = await prisma.student.findMany({ take: 30, include: { class: true } });
  for (const stu of students) {
    await setDoc(doc(db, 'students', stu.id), clean({
      studentId: stu.studentId,
      roll: stu.roll,
      nameBn: stu.nameBn,
      nameEn: stu.nameEn,
      class: stu.class.nameEn,
      gender: stu.gender,
      bloodGroup: stu.bloodGroup || 'A+',
    }));
  }

  console.log('✅ ALL MODULES SUCCESSFULLY SYNCED TO FIREBASE CLOUD FIRESTORE!');
}

syncAll()
  .catch((e) => {
    console.error('Sync failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
