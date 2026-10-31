import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding rich Admin Panel details...');

  // 1. EXPENSES
  console.log('Seeding Expenses...');
  const expensesData = [
    {
      voucherNo: 'VCH-2026-001',
      category: 'UTILITY',
      amount: 45200,
      description: 'পল্লী বিদ্যুৎ সমিতি (পবিস) ক্যাম্পাস বিদ্যুৎ বিল - অক্টোবর ২০২৬',
      expenseDate: new Date('2026-10-25'),
      approvedBy: 'Super Admin',
    },
    {
      voucherNo: 'VCH-2026-002',
      category: 'MAINTENANCE',
      amount: 18500,
      description: 'কম্পিউটার ও আইসিটি ল্যাব গিগাবিট নেটওয়ার্কিং সুইচ মেরামত ও অপটিক্যাল ক্যাবলিং',
      expenseDate: new Date('2026-10-24'),
      approvedBy: 'Principal',
    },
    {
      voucherNo: 'VCH-2026-003',
      category: 'UTILITY',
      amount: 12000,
      description: 'ক্যাম্পাস ১০০ এমবিপিএস ব্রডব্যান্ড ডেডিকেটেড অপটিক্যাল ফাইবার ইন্টারনেট ব্যান্ডউইথ বিল',
      expenseDate: new Date('2026-10-23'),
      approvedBy: 'Super Admin',
    },
    {
      voucherNo: 'VCH-2026-004',
      category: 'LAB_EQUIPMENT',
      amount: 34500,
      description: 'উচ্চ মাধ্যমিক বিজ্ঞানাগারের রসায়ন বিকারক, রাসায়নিক কেমিক্যালস ও টেস্টটিউব সেট ক্রয়',
      expenseDate: new Date('2026-10-22'),
      approvedBy: 'Academic Head',
    },
    {
      voucherNo: 'VCH-2026-005',
      category: 'TRANSPORT',
      amount: 42000,
      description: 'স্কুল বাস ও পরিবহন বহরের ডিজেল জ্বালানি, মবিল ও লুব্রিকেন্ট ক্রয়',
      expenseDate: new Date('2026-10-20'),
      approvedBy: 'Admin',
    },
    {
      voucherNo: 'VCH-2026-006',
      category: 'STATIONERY',
      amount: 31000,
      description: 'বার্ষিক পরীক্ষা ২০২৬ এর অফসেট মূল্যায়ন খাতা, উত্তরপত্র ও প্রশ্নপত্র মুদ্রণ সামগ্রী',
      expenseDate: new Date('2026-10-18'),
      approvedBy: 'Admin',
    },
    {
      voucherNo: 'VCH-2026-007',
      category: 'MAINTENANCE',
      amount: 28000,
      description: 'ক্যাম্পাস কেন্দ্রীয় ৬০ কেভিএ জেনারেটরের ডিজেল ক্রয় ও রুটিন সার্ভিসিং',
      expenseDate: new Date('2026-10-16'),
      approvedBy: 'Super Admin',
    },
    {
      voucherNo: 'VCH-2026-008',
      category: 'ACADEMIC',
      amount: 25000,
      description: 'কেন্দ্রীয় লাইব্রেরির জন্য বাংলা একাডেমি ও জাতীয় পাঠ্যপুস্তক রেফারেন্স গ্রন্থ ক্রয়',
      expenseDate: new Date('2026-10-15'),
      approvedBy: 'Principal',
    },
    {
      voucherNo: 'VCH-2026-009',
      category: 'SPORTS',
      amount: 21500,
      description: 'আন্তঃশ্রেণি ফুটবল টুর্নামেন্ট ও বার্ষিক ক্রীড়া সরঞ্জাম ক্রয়',
      expenseDate: new Date('2026-10-14'),
      approvedBy: 'Admin',
    },
    {
      voucherNo: 'VCH-2026-010',
      category: 'MAINTENANCE',
      amount: 14200,
      description: 'ক্যাম্পাস ও ওয়াশরুম স্যানিটেশন সামগ্রী, জীবাণুনাশক ফিনাইল ও হারপিক ক্রয়',
      expenseDate: new Date('2026-10-12'),
      approvedBy: 'Admin',
    },
    {
      voucherNo: 'VCH-2026-011',
      category: 'EVENT',
      amount: 19500,
      description: 'মিরসরাই উপজেলা রোভার স্কাউট ও গার্ল গাইডস ডে ক্যাম্প আয়োজন ব্যয়',
      expenseDate: new Date('2026-10-10'),
      approvedBy: 'Principal',
    },
    {
      voucherNo: 'VCH-2026-012',
      category: 'ACADEMIC',
      amount: 22000,
      description: 'নতুন শিক্ষাক্রম বাস্তবায়নে সম্মানিত শিক্ষকবৃন্দের বিশেষ কর্মশালা ও আপ্যায়ন ব্যয়',
      expenseDate: new Date('2026-10-08'),
      approvedBy: 'Super Admin',
    },
    {
      voucherNo: 'VCH-2026-013',
      category: 'MAINTENANCE',
      amount: 16800,
      description: 'কেন্দ্রীয় অডিটোরিয়াম অ্যাকোস্টিক সাউন্ড সিস্টেম ও সিলিং প্রজেক্টর সার্ভিসিং',
      expenseDate: new Date('2026-10-05'),
      approvedBy: 'Admin',
    },
    {
      voucherNo: 'VCH-2026-014',
      category: 'UTILITY',
      amount: 8500,
      description: 'ক্যাম্পাস ফার্স্ট এইড মেডিকেল বক্সের জরুরি ওষুধ, স্যাভলন ও ব্যান্ডেজ সামগ্রী',
      expenseDate: new Date('2026-10-02'),
      approvedBy: 'Admin',
    },
    {
      voucherNo: 'VCH-2026-015',
      category: 'MAINTENANCE',
      amount: 55000,
      description: 'কলেজ প্রশাসনিক ও একাডেমিক ভবনের সম্মুখভাগ রং ও সংস্কার কাজের অগ্রিম বিল',
      expenseDate: new Date('2026-09-28'),
      approvedBy: 'Super Admin',
    },
  ];

  for (const exp of expensesData) {
    await prisma.expense.upsert({
      where: { voucherNo: exp.voucherNo },
      update: exp,
      create: exp,
    });
  }

  // 2. LIBRARY BOOKS & LOANS
  console.log('Seeding Library Books...');
  const booksData = [
    {
      isbn: '978-984-4001',
      title: 'সঞ্চয়িতা (কাব্যসংকলন)',
      author: 'রবীন্দ্রনাথ ঠাকুর',
      category: 'LITERATURE',
      copiesTotal: 15,
      copiesAvailable: 12,
      rackLocation: 'Rack A-1 (Bengali Classics)',
    },
    {
      isbn: '978-984-4002',
      title: 'অগ্নিবীণা (কাব্যগ্রন্থ)',
      author: 'কাজী নজরুল ইসলাম',
      category: 'LITERATURE',
      copiesTotal: 12,
      copiesAvailable: 9,
      rackLocation: 'Rack A-2 (Bengali Classics)',
    },
    {
      isbn: '978-984-4003',
      title: 'পদার্থবিজ্ঞান ১ম ও ২য় পত্র (একাদশ-দ্বাদশ শ্রেণি)',
      author: 'ড. শাহজাহান তপন ও মুহাম্মদ আজিজ হাসান',
      category: 'SCIENCE',
      copiesTotal: 25,
      copiesAvailable: 18,
      rackLocation: 'Rack S-1 (Physics)',
    },
    {
      isbn: '978-984-4004',
      title: 'উচ্চতর রসায়ন ১ম ও ২য় পত্র (একাদশ-দ্বাদশ শ্রেণি)',
      author: 'প্রফেসর ড. গাজী মোঃ আহসানুল কবীর',
      category: 'SCIENCE',
      copiesTotal: 20,
      copiesAvailable: 15,
      rackLocation: 'Rack S-2 (Chemistry)',
    },
    {
      isbn: '978-984-4005',
      title: 'উচ্চতর জীববিজ্ঞান (উদ্ভিদবিজ্ঞান ও প্রাণিবিজ্ঞান)',
      author: 'ড. মোহাম্মদ আবুল হাসান ও ড. গাজী আজমল',
      category: 'SCIENCE',
      copiesTotal: 20,
      copiesAvailable: 14,
      rackLocation: 'Rack S-3 (Biology)',
    },
    {
      isbn: '978-984-4006',
      title: 'উচ্চতর গণিত ১ম ও ২য় পত্র',
      author: 'এস ইউ আহাম্মদ ও এম এ জব্বার',
      category: 'SCIENCE',
      copiesTotal: 30,
      copiesAvailable: 22,
      rackLocation: 'Rack M-1 (Mathematics)',
    },
    {
      isbn: '978-0553380163',
      title: 'A Brief History of Time',
      author: 'Stephen Hawking',
      category: 'SCIENCE',
      copiesTotal: 10,
      copiesAvailable: 7,
      rackLocation: 'Rack E-1 (Cosmology & Science)',
    },
    {
      isbn: '978-984-4008',
      title: 'English Grammar in Use & Composition',
      author: 'Raymond Murphy',
      category: 'REFERENCE',
      copiesTotal: 35,
      copiesAvailable: 28,
      rackLocation: 'Rack E-2 (English Language)',
    },
    {
      isbn: '978-984-4009',
      title: 'তথ্য ও যোগাযোগ প্রযুক্তি (আইসিটি) একাদশ-দ্বাদশ শ্রেণি',
      author: 'প্রকৌশলী মুজিবুর রহমান',
      category: 'TEXTBOOK',
      copiesTotal: 40,
      copiesAvailable: 32,
      rackLocation: 'Rack C-1 (ICT & Computing)',
    },
    {
      isbn: '978-984-4010',
      title: 'বাংলাদেশের ইতিহাস ও বিশ্বসভ্যতা (৯ম-১০ম শ্রেণি)',
      author: 'জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB)',
      category: 'HISTORY',
      copiesTotal: 25,
      copiesAvailable: 20,
      rackLocation: 'Rack H-1 (History & Culture)',
    },
    {
      isbn: '978-984-4011',
      title: 'একাত্তরের দিনগুলি',
      author: 'জাহানারা ইমাম',
      category: 'HISTORY',
      copiesTotal: 18,
      copiesAvailable: 14,
      rackLocation: 'Rack H-2 (Liberation War)',
    },
    {
      isbn: '978-984-4012',
      title: 'আমার বন্ধু রাশেদ',
      author: 'মুহম্মদ জাফর ইকবাল',
      category: 'LITERATURE',
      copiesTotal: 20,
      copiesAvailable: 16,
      rackLocation: 'Rack L-1 (Juvenile Fiction)',
    },
    {
      isbn: '978-984-4013',
      title: 'বাংলা একাডেমি ব্যবহারিক বাংলা অভিধান',
      author: 'বাংলা একাডেমি সংকলন',
      category: 'REFERENCE',
      copiesTotal: 10,
      copiesAvailable: 10,
      rackLocation: 'Rack R-1 (Dictionaries)',
    },
    {
      isbn: '978-984-4014',
      title: 'হিসাববিজ্ঞান ১ম ও ২য় পত্র (একাদশ-দ্বাদশ শ্রেণি)',
      author: 'অধ্যাপক দীপক কুমার সেন',
      category: 'TEXTBOOK',
      copiesTotal: 22,
      copiesAvailable: 17,
      rackLocation: 'Rack B-1 (Commerce & Business)',
    },
    {
      isbn: '978-984-4015',
      title: 'ব্যবসায় সংগঠন ও ব্যবস্থাপনা',
      author: 'মোহাম্মদ খালিদ খালিকুজ্জামান',
      category: 'TEXTBOOK',
      copiesTotal: 20,
      copiesAvailable: 16,
      rackLocation: 'Rack B-2 (Business Studies)',
    },
    {
      isbn: '978-984-4016',
      title: 'অসমাপ্ত আত্মজীবনী',
      author: 'শেখ মুজিবুর রহমান',
      category: 'HISTORY',
      copiesTotal: 25,
      copiesAvailable: 21,
      rackLocation: 'Rack H-3 (Autobiographies)',
    },
  ];

  const createdBooks = [];
  for (const b of booksData) {
    const existing = await prisma.libraryBook.findFirst({ where: { title: b.title } });
    if (existing) {
      createdBooks.push(existing);
    } else {
      const created = await prisma.libraryBook.create({ data: b });
      createdBooks.push(created);
    }
  }

  // Seed some BookLoans for real students
  const sampleStudents = await prisma.student.findMany({ take: 6 });
  if (sampleStudents.length > 0 && createdBooks.length >= 6) {
    const loanDates = [
      { borrow: new Date('2026-10-15'), due: new Date('2026-10-29'), status: 'BORROWED' },
      { borrow: new Date('2026-10-18'), due: new Date('2026-11-01'), status: 'BORROWED' },
      { borrow: new Date('2026-10-10'), due: new Date('2026-10-24'), status: 'RETURNED' },
      { borrow: new Date('2026-10-20'), due: new Date('2026-11-03'), status: 'BORROWED' },
      { borrow: new Date('2026-10-05'), due: new Date('2026-10-19'), status: 'RETURNED' },
      { borrow: new Date('2026-10-22'), due: new Date('2026-11-05'), status: 'BORROWED' },
    ];

    for (let i = 0; i < 6; i++) {
      const student = sampleStudents[i];
      const book = createdBooks[i];
      const existingLoan = await prisma.bookLoan.findFirst({
        where: { studentId: student.id, bookId: book.id },
      });
      if (!existingLoan) {
        await prisma.bookLoan.create({
          data: {
            bookId: book.id,
            studentId: student.id,
            borrowDate: loanDates[i].borrow,
            dueDate: loanDates[i].due,
            status: loanDates[i].status,
            returnDate: loanDates[i].status === 'RETURNED' ? loanDates[i].due : null,
          },
        });
      }
    }
  }

  // 3. TRANSPORT ROUTES, VEHICLES & STOPS
  console.log('Seeding Transport...');
  const routesData = [
    {
      routeName: 'বারইয়ারহাট - মিরসরাই কলেজ ক্যাম্পাস রুট',
      routeCode: 'MSC-TR-01',
      startPoint: 'Baraiyarhat Bus Stand',
      endPoint: 'Mirsharai School and College',
      monthlyFare: 800,
      stops: [
        { stopName: 'বারইয়ারহাট বাস স্ট্যান্ড', pickupTime: '07:45 AM', dropTime: '04:45 PM', order: 1 },
        { stopName: 'শান্তিরহাট মোড়', pickupTime: '08:00 AM', dropTime: '04:30 PM', order: 2 },
        { stopName: 'জোরারগঞ্জ বাজার', pickupTime: '08:15 AM', dropTime: '04:15 PM', order: 3 },
        { stopName: 'মিঠাছড়া রেলগেট মোড়', pickupTime: '08:30 AM', dropTime: '04:00 PM', order: 4 },
        { stopName: 'মিরসরাই কলেজ গেইট', pickupTime: '08:45 AM', dropTime: '03:45 PM', order: 5 },
      ],
      vehicles: [
        {
          vehicleNo: 'চট্ট-মেট্রো-ব-১১-২০২৪',
          driverName: 'মোঃ আবুল কালাম',
          driverPhone: '01812-334411',
          helperName: 'করিম মিয়া',
          capacity: 40,
        },
        {
          vehicleNo: 'চট্ট-মেট্রো-ব-১১-২০২৫',
          driverName: 'মোঃ রফিকুল ইসলাম',
          driverPhone: '01812-334422',
          helperName: 'সুমন দাশ',
          capacity: 40,
        },
      ],
    },
    {
      routeName: 'সীতাকুণ্ড - মিরসরাই কলেজ ক্যাম্পাস রুট',
      routeCode: 'MSC-TR-02',
      startPoint: 'Sitakunda Sadar',
      endPoint: 'Mirsharai School and College',
      monthlyFare: 900,
      stops: [
        { stopName: 'সীতাকুণ্ড বাস টার্মিনাল', pickupTime: '07:30 AM', dropTime: '05:00 PM', order: 1 },
        { stopName: 'বাড়বকুণ্ড বাজার', pickupTime: '07:50 AM', dropTime: '04:40 PM', order: 2 },
        { stopName: 'নিজামপুর সরকারি কলেজ মোড়', pickupTime: '08:10 AM', dropTime: '04:20 PM', order: 3 },
        { stopName: 'বড়তাকিয়া বাজার', pickupTime: '08:25 AM', dropTime: '04:05 PM', order: 4 },
        { stopName: 'মিরসরাই কলেজ গেইট', pickupTime: '08:45 AM', dropTime: '03:45 PM', order: 5 },
      ],
      vehicles: [
        {
          vehicleNo: 'চট্ট-মেট্রো-ব-১১-২০২৬',
          driverName: 'মোঃ জসিম উদ্দিন',
          driverPhone: '01812-334433',
          helperName: 'বাবুল মিয়া',
          capacity: 36,
        },
      ],
    },
    {
      routeName: 'জোরারগঞ্জ - হিঙ্গুলী - মিরসরাই কলেজ রুট',
      routeCode: 'MSC-TR-03',
      startPoint: 'Zorarganj - Hinguli',
      endPoint: 'Mirsharai School and College',
      monthlyFare: 750,
      stops: [
        { stopName: 'হিঙ্গুলী ব্রীজ মোড়', pickupTime: '08:00 AM', dropTime: '04:30 PM', order: 1 },
        { stopName: 'করেরহাট বিশ্বরোড মোড়', pickupTime: '08:15 AM', dropTime: '04:15 PM', order: 2 },
        { stopName: 'মহামায়া ইকো পার্ক গেইট', pickupTime: '08:30 AM', dropTime: '04:00 PM', order: 3 },
        { stopName: 'মিরসরাই কলেজ গেইট', pickupTime: '08:45 AM', dropTime: '03:45 PM', order: 4 },
      ],
      vehicles: [
        {
          vehicleNo: 'চট্ট-মেট্রো-চ-৫১-১০২০',
          driverName: 'মোঃ কামাল হোসেন',
          driverPhone: '01812-334444',
          helperName: 'নুর নবী',
          capacity: 18,
        },
      ],
    },
    {
      routeName: 'মিরসরাই সদর অভ্যন্তরীণ শাটল সার্ভিস',
      routeCode: 'MSC-TR-04',
      startPoint: 'Mirsharai Sadar Thana',
      endPoint: 'Mirsharai School and College',
      monthlyFare: 600,
      stops: [
        { stopName: 'মিরসরাই থানা মোড়', pickupTime: '08:10 AM', dropTime: '04:10 PM', order: 1 },
        { stopName: 'পৌরসভা কার্যালয় চত্বর', pickupTime: '08:20 AM', dropTime: '04:00 PM', order: 2 },
        { stopName: 'উপজেলা স্বাস্থ্য কমপ্লেক্স গেইট', pickupTime: '08:30 AM', dropTime: '03:50 PM', order: 3 },
        { stopName: 'মিরসরাই কলেজ গেইট', pickupTime: '08:40 AM', dropTime: '03:40 PM', order: 4 },
      ],
      vehicles: [
        {
          vehicleNo: 'চট্ট-মেট্রো-ব-১১-২০২৭',
          driverName: 'মোঃ শাহ আলম',
          driverPhone: '01812-334455',
          helperName: 'রাসেল মিয়া',
          capacity: 32,
        },
      ],
    },
  ];

  for (const r of routesData) {
    const route = await prisma.transportRoute.upsert({
      where: { routeCode: r.routeCode },
      update: {
        routeName: r.routeName,
        startPoint: r.startPoint,
        endPoint: r.endPoint,
        monthlyFare: r.monthlyFare,
      },
      create: {
        routeName: r.routeName,
        routeCode: r.routeCode,
        startPoint: r.startPoint,
        endPoint: r.endPoint,
        monthlyFare: r.monthlyFare,
      },
    });

    for (const s of r.stops) {
      const existingStop = await prisma.transportStop.findFirst({
        where: { routeId: route.id, stopName: s.stopName },
      });
      if (!existingStop) {
        await prisma.transportStop.create({
          data: {
            routeId: route.id,
            stopName: s.stopName,
            pickupTime: s.pickupTime,
            dropTime: s.dropTime,
            order: s.order,
          },
        });
      }
    }

    for (const v of r.vehicles) {
      const existingVehicle = await prisma.transportVehicle.findFirst({
        where: { vehicleNo: v.vehicleNo },
      });
      if (!existingVehicle) {
        await prisma.transportVehicle.create({
          data: {
            routeId: route.id,
            vehicleNo: v.vehicleNo,
            driverName: v.driverName,
            driverPhone: v.driverPhone,
            helperName: v.helperName,
            capacity: v.capacity,
          },
        });
      }
    }
  }

  // 4. INVENTORY ITEMS
  console.log('Seeding Inventory Items...');
  const inventoryData = [
    {
      itemNameBn: 'ডেল অপটিপ্লেক্স আই৫ ব্র্যান্ড ডেস্কটপ কম্পিউটার',
      itemNameEn: 'Dell OptiPlex Core i5 Workstations (16GB RAM, 512GB SSD)',
      category: 'ELECTRONICS',
      quantity: 60,
      unit: 'Set',
      location: 'Computer & ICT Lab (Room 201)',
    },
    {
      itemNameBn: 'ইন্টারেক্টিভ ডিজিটাল স্মার্ট ফ্ল্যাট প্যানেল (৭৫ ইঞ্চি ৪কে)',
      itemNameEn: 'Interactive 75" 4K UHD Smart Touch Display Panels',
      category: 'ELECTRONICS',
      quantity: 12,
      unit: 'Units',
      location: 'Smart Classrooms (Academic Building)',
    },
    {
      itemNameBn: 'অলিম্পাস হাই-পাওয়ার যৌগিক অপটিক্যাল অণুবীক্ষণ যন্ত্র',
      itemNameEn: 'Olympus Compound Biological Laboratory Microscopes',
      category: 'LAB_EQUIPMENT',
      quantity: 25,
      unit: 'Units',
      location: 'Biology & Life Science Lab (Room 302)',
    },
    {
      itemNameBn: 'ডিজিটাল রাসায়নিক ব্যালেন্স স্কেল (০.০০০১ গ্রাম সংবেদনশীল)',
      itemNameEn: 'Analytical Digital Precision Chemical Balance Scale',
      category: 'LAB_EQUIPMENT',
      quantity: 8,
      unit: 'Units',
      location: 'Chemistry Research Lab (Room 303)',
    },
    {
      itemNameBn: 'পদার্থবিজ্ঞান অপটিক্যাল স্পেকট্রোমিটার ও লেজার কিট',
      itemNameEn: 'Physics Optical Spectrometer, Prism & Laser Reflection Kit',
      category: 'LAB_EQUIPMENT',
      quantity: 18,
      unit: 'Sets',
      location: 'Physics Laboratory (Room 301)',
    },
    {
      itemNameBn: 'ইমারসন ১৫ কেভিএ হেভি ডিউটি অনলাইন সেন্ট্রাল ইউপিএস',
      itemNameEn: 'Emerson 15KVA Heavy Duty Online Central Industrial UPS',
      category: 'ELECTRONICS',
      quantity: 2,
      unit: 'Sets',
      location: 'Central ICT Server & Lab Facility',
    },
    {
      itemNameBn: 'পারকিন্স ৬০ কেভিএ সাউন্ডপ্রুফ অটোমেটিক ডিজেল জেনারেটর',
      itemNameEn: 'Perkins 60KVA Soundproof Silent Automatic Diesel Generator',
      category: 'ELECTRONICS',
      quantity: 1,
      unit: 'Unit',
      location: 'Campus Electrical Substation Enclosure',
    },
    {
      itemNameBn: 'সিসকো ক্যাটালিস্ট ২৪-পোর্ট গিগাবিট ম্যানেজড নেটওয়ার্ক সুইচ',
      itemNameEn: 'Cisco Catalyst 24-Port Gigabit Managed Switches',
      category: 'ELECTRONICS',
      quantity: 8,
      unit: 'Units',
      location: 'Campus Server Room & Distribution Racks',
    },
    {
      itemNameBn: 'উচ্চমানের সেগুন কাঠের শিক্ষার্থী বেঞ্চ ও যৌথ ডেস্ক',
      itemNameEn: 'Heavy Duty Dual Wooden Student Desks & Benches',
      category: 'FURNITURE',
      quantity: 250,
      unit: 'Sets',
      location: 'Classrooms 101 to 210',
    },
    {
      itemNameBn: 'শিক্ষক সেমিনার কনফারেন্স টেবিল ও এক্সিকিউটিভ রিভলভিং চেয়ার',
      itemNameEn: 'Faculty Conference Seminar Table & Ergonomic Chairs',
      category: 'FURNITURE',
      quantity: 40,
      unit: 'Sets',
      location: 'Teachers Common Lounge & Conference Room',
    },
    {
      itemNameBn: 'স্টেইনলেস স্টিল আল্ট্রাভায়োলেট বিশুদ্ধ পানি ফিল্ট্রেশন প্ল্যান্ট',
      itemNameEn: 'Commercial UV RO Stainless Steel Clean Drinking Water Plant',
      category: 'OTHER',
      quantity: 6,
      unit: 'Units',
      location: 'Academic Corridor & Student Dining Hall',
    },
    {
      itemNameBn: 'কেন্দ্রীয় অডিটোরিয়াম অ্যাকোস্টিক ডিজিটাল পিএ সাউন্ড সিস্টেম',
      itemNameEn: 'Auditorium 2000W Acoustic PA Surround Sound Audio System',
      category: 'ELECTRONICS',
      quantity: 2,
      unit: 'Sets',
      location: 'Central Multipurpose Auditorium',
    },
    {
      itemNameBn: 'এপসন ৪০০০ লুমেন ফুল এইচডি মাল্টিমিডিয়া সিলিং প্রজেক্টর',
      itemNameEn: 'Epson 4000-Lumens Full HD Ceiling Mounted Projectors',
      category: 'ELECTRONICS',
      quantity: 14,
      unit: 'Units',
      location: 'Multimedia Classrooms & Seminar Halls',
    },
    {
      itemNameBn: 'আন্তর্জাতিক মানের টেবিল টেনিস বোর্ড ও অলিম্পিক নেট সেট',
      itemNameEn: 'International Standard Indoor Table Tennis Boards',
      category: 'SPORTS',
      quantity: 3,
      unit: 'Sets',
      location: 'Indoor Gymnasium & Recreation Zone',
    },
    {
      itemNameBn: 'ইংলিশ উইলো ক্রিকেট কিট, লেদার বল ও প্র্যাকটিস নেট',
      itemNameEn: 'Professional English Willow Cricket Kits & Nets',
      category: 'SPORTS',
      quantity: 6,
      unit: 'Sets',
      location: 'Central Sports Complex Pavilion',
    },
    {
      itemNameBn: 'ভারী স্টিলের লাইব্রেরি বুক স্ট্যাক শেলফ ও ক্যাটালগ র্যাক',
      itemNameEn: 'Heavy Duty Double-Sided Steel Library Book Shelves',
      category: 'FURNITURE',
      quantity: 30,
      unit: 'Units',
      location: 'Central Library Stacks',
    },
    {
      itemNameBn: 'দাহুয়া ৬৪-চ্যানেল এইচডি সিসিটিভি এনভিআর ও ইনফারেড ক্যামেরা',
      itemNameEn: 'Dahua 64-Channel HD Security Surveillance NVR & Cameras',
      category: 'ELECTRONICS',
      quantity: 48,
      unit: 'Units',
      location: 'Entire Campus Perimeter & Corridors',
    },
    {
      itemNameBn: 'এবিসি ড্রাই কেমিক্যাল ফায়ার এক্সটিংগুইশার সিলিন্ডার (৫ কেজি)',
      itemNameEn: 'Fire Extinguisher ABC Dry Chemical Powder 5KG Cylinders',
      category: 'OTHER',
      quantity: 24,
      unit: 'Units',
      location: 'All Building Corridors, Labs & Library',
    },
  ];

  for (const item of inventoryData) {
    const existing = await prisma.inventoryItem.findFirst({
      where: { itemNameEn: item.itemNameEn },
    });
    if (!existing) {
      await prisma.inventoryItem.create({ data: item });
    }
  }

  // 5. EXAMINATIONS & SCHEDULES
  console.log('Seeding Exams & Timetables...');
  const academicSession = await prisma.academicSession.findFirst();
  const subjects = await prisma.subject.findMany();

  if (academicSession && subjects.length > 0) {
    // Annual Exam
    const annualExam = await prisma.exam.upsert({
      where: { id: 'annual-exam-2026' },
      update: {},
      create: {
        id: 'annual-exam-2026',
        sessionId: academicSession.id,
        titleBn: 'বার্ষিক পরীক্ষা ২০২৬ (১ম-১২শ শ্রেণি)',
        titleEn: 'Annual Examination 2026 (Class 1–12)',
        examType: 'ANNUAL',
        startDate: new Date('2026-11-15'),
        endDate: new Date('2026-11-30'),
        isPublished: true,
      },
    });

    // Pre-test Exam
    const preTestExam = await prisma.exam.upsert({
      where: { id: 'pretest-exam-2026' },
      update: {},
      create: {
        id: 'pretest-exam-2026',
        sessionId: academicSession.id,
        titleBn: 'এসএসসি ও এইচএসসি প্রাক-নির্বাচনী মূল্যায়ন ২০২৬',
        titleEn: 'SSC & HSC Pre-Test Assessment 2026',
        examType: 'PRE_TEST',
        startDate: new Date('2026-12-05'),
        endDate: new Date('2026-12-18'),
        isPublished: true,
      },
    });

    // Populate schedules for Annual Exam
    const examDates = [
      '2026-11-15',
      '2026-11-17',
      '2026-11-19',
      '2026-11-21',
      '2026-11-23',
      '2026-11-25',
      '2026-11-27',
    ];
    for (let idx = 0; idx < subjects.length && idx < examDates.length; idx++) {
      const sub = subjects[idx];
      const existingSch = await prisma.examSchedule.findFirst({
        where: { examId: annualExam.id, subjectId: sub.id },
      });
      if (!existingSch) {
        await prisma.examSchedule.create({
          data: {
            examId: annualExam.id,
            subjectId: sub.id,
            examDate: new Date(examDates[idx]),
            startTime: '10:00 AM',
            endTime: '01:00 PM',
            roomNo: `Rooms 101-${105 + idx}`,
          },
        });
      }
    }
  }

  // 6. MARKS / RESULTS TABULATION
  console.log('Seeding Marks & Results Tabulation...');
  const exams = await prisma.exam.findMany();
  const studentsList = await prisma.student.findMany({ take: 20 });
  if (exams.length > 0 && studentsList.length > 0 && subjects.length > 0) {
    const targetExam = exams[0];
    const markScores = [
      { score: 92, grade: 'A+', gpa: 5.0 },
      { score: 86, grade: 'A+', gpa: 5.0 },
      { score: 78, grade: 'A', gpa: 4.0 },
      { score: 84, grade: 'A+', gpa: 5.0 },
      { score: 72, grade: 'A-', gpa: 3.5 },
      { score: 88, grade: 'A+', gpa: 5.0 },
      { score: 95, grade: 'A+', gpa: 5.0 },
    ];

    for (let sIdx = 0; sIdx < studentsList.length; sIdx++) {
      const stu = studentsList[sIdx];
      for (let subIdx = 0; subIdx < Math.min(subjects.length, 3); subIdx++) {
        const sub = subjects[subIdx];
        const markChoice = markScores[(sIdx + subIdx) % markScores.length];

        const existingMark = await prisma.mark.findFirst({
          where: { examId: targetExam.id, subjectId: sub.id, studentId: stu.id },
        });

        if (!existingMark) {
          await prisma.mark.create({
            data: {
              examId: targetExam.id,
              subjectId: sub.id,
              studentId: stu.id,
              writtenMarks: markChoice.score - 20,
              mcqMarks: 16,
              practicalMarks: 4,
              totalMarks: markChoice.score,
              grade: markChoice.grade,
              gpa: markChoice.gpa,
              isPassed: true,
              isApproved: true,
            },
          });
        }
      }
    }
  }

  // 7. ATTENDANCE SEEDING FOR 5 RECENT WORKING DAYS
  console.log('Seeding Attendance records...');
  const classes = await prisma.class.findMany({ include: { sections: true } });
  const sampleStu = await prisma.student.findMany({ take: 30 });
  const pastDays = [
    new Date('2026-10-25'),
    new Date('2026-10-26'),
    new Date('2026-10-27'),
    new Date('2026-10-28'),
    new Date('2026-10-29'),
  ];

  for (const date of pastDays) {
    for (let i = 0; i < sampleStu.length; i++) {
      const stu = sampleStu[i];
      const status = i % 15 === 0 ? 'ABSENT' : i % 8 === 0 ? 'LATE' : 'PRESENT';
      const existingAtt = await prisma.attendance.findUnique({
        where: {
          studentId_date: {
            studentId: stu.id,
            date: date,
          },
        },
      });
      if (!existingAtt) {
        await prisma.attendance.create({
          data: {
            studentId: stu.id,
            classId: stu.classId,
            sectionId: stu.sectionId,
            date: date,
            status: status,
            remarks: status === 'LATE' ? 'Late arrival 15 mins' : status === 'ABSENT' ? 'Fever / Sick' : 'On-time',
          },
        });
      }
    }
  }

  // 8. ADMISSION APPLICATIONS
  console.log('Seeding Admission Applications...');
  const applications = [
    {
      applicationNo: 'ADM-2026-1001',
      applicantBn: 'আফরিন জাহান নিহা',
      applicantEn: 'Afrin Jahan Niha',
      applyingClass: 11,
      group: 'SCIENCE',
      gender: 'FEMALE',
      dob: new Date('2010-04-12'),
      bloodGroup: 'O+',
      guardianNameBn: 'জাহাঙ্গীর আলম',
      guardianNameEn: 'Jahangir Alam',
      guardianPhone: '01819-876543',
      guardianEmail: 'jahangir.alam@gmail.com',
      address: 'গ্রাম: শান্তিরহাট, ডাকঘর: জোরারগঞ্জ, মিরসরাই, চট্টগ্রাম',
      previousSchool: 'মিরসরাই পাইলট উচ্চ বিদ্যালয় (SSC GPA: 5.00)',
      gpa: 5.0,
      status: 'PENDING',
    },
    {
      applicationNo: 'ADM-2026-1002',
      applicantBn: 'মোহাম্মদ রাফসানুল হক',
      applicantEn: 'Md. Rafsanul Haque',
      applyingClass: 9,
      group: 'SCIENCE',
      gender: 'MALE',
      dob: new Date('2011-08-20'),
      bloodGroup: 'A+',
      guardianNameBn: 'মোঃ এনামুল হক',
      guardianNameEn: 'Md. Enamul Haque',
      guardianPhone: '01812-765432',
      guardianEmail: 'enamul.haque@gmail.com',
      address: 'গ্রাম: মহামায়া, ডাকঘর: মিঠাছড়া, মিরসরাই, চট্টগ্রাম',
      previousSchool: 'মিরসরাই মডেল সরকারি প্রাথমিক ও জুনিয়র স্কুল',
      gpa: 4.88,
      status: 'PENDING',
    },
    {
      applicationNo: 'ADM-2026-1003',
      applicantBn: 'ফাতেমা তুজ জোহরা',
      applicantEn: 'Fatema Tuz Zohra',
      applyingClass: 6,
      group: 'GENERAL',
      gender: 'FEMALE',
      dob: new Date('2014-01-15'),
      bloodGroup: 'B+',
      guardianNameBn: 'হাফেজ নুরুল ইসলাম',
      guardianNameEn: 'Hafez Nurul Islam',
      guardianPhone: '01815-654321',
      guardianEmail: 'nurul.islam@gmail.com',
      address: 'গ্রাম: বারইয়ারহাট পৌরসভা, মিরসরাই, চট্টগ্রাম',
      previousSchool: 'বারইয়ারহাট আদর্শ সরকারি প্রাথমিক বিদ্যালয়',
      gpa: 5.0,
      status: 'APPROVED',
    },
    {
      applicationNo: 'ADM-2026-1004',
      applicantBn: 'সায়েম মাহমুদ সিফাত',
      applicantEn: 'Sayem Mahmud Sifat',
      applyingClass: 11,
      group: 'BUSINESS_STUDIES',
      gender: 'MALE',
      dob: new Date('2010-09-05'),
      bloodGroup: 'AB+',
      guardianNameBn: 'মোঃ মাহাবুবুর রহমান',
      guardianNameEn: 'Md. Mahabubur Rahman',
      guardianPhone: '01816-543210',
      guardianEmail: 'mahabub.sifat@gmail.com',
      address: 'গ্রাম: নিজামপুর, ডাকঘর: বাড়বকুণ্ড, মিরসরাই',
      previousSchool: 'নিজামপুর মুসলিম উচ্চ বিদ্যালয়',
      gpa: 4.67,
      status: 'APPROVED',
    },
    {
      applicationNo: 'ADM-2026-1005',
      applicantBn: 'নুসরাত জাহান মীম',
      applicantEn: 'Nusrat Jahan Meem',
      applyingClass: 1,
      group: 'GENERAL',
      gender: 'FEMALE',
      dob: new Date('2019-11-10'),
      bloodGroup: 'O+',
      guardianNameBn: 'মোঃ মোরশেদ আলম',
      guardianNameEn: 'Md. Morshed Alam',
      guardianPhone: '01817-432109',
      guardianEmail: 'morshed.meem@gmail.com',
      address: 'কলেজ রোড, মিরসরাই সদর, চট্টগ্রাম',
      previousSchool: 'লিটল ফ্লাওয়ার কিন্ডারগার্টেন',
      gpa: null,
      status: 'PENDING',
    },
    {
      applicationNo: 'ADM-2026-1006',
      applicantBn: 'তানজিমুল হাসান আবিদ',
      applicantEn: 'Tanjimul Hasan Abid',
      applyingClass: 11,
      group: 'HUMANITIES',
      gender: 'MALE',
      dob: new Date('2010-06-25'),
      bloodGroup: 'B+',
      guardianNameBn: 'মাওলানা আবুল হোসেন',
      guardianNameEn: 'Mawlana Abul Hossain',
      guardianPhone: '01818-321098',
      guardianEmail: 'abul.hossain@gmail.com',
      address: 'গ্রাম: করেরহাট, মিরসরাই, চট্টগ্রাম',
      previousSchool: 'করেরহাট কামিল মাদ্রাসা ও হাইস্কুল',
      gpa: 4.75,
      status: 'PENDING',
    },
  ];

  for (const app of applications) {
    const existing = await prisma.admissionApplication.findFirst({
      where: { applicantEn: app.applicantEn },
    });
    if (!existing) {
      await prisma.admissionApplication.create({ data: app });
    }
  }

  console.log('✅ Admin Panel Details successfully seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
