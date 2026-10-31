export interface FallbackNotice {
  id: string;
  titleBn: string;
  titleEn: string;
  contentBn: string;
  contentEn: string;
  category: string;
  isPinned: boolean;
  publishedAt: string | Date;
}

export interface FallbackEvent {
  id: string;
  titleBn: string;
  titleEn: string;
  descriptionBn: string;
  descriptionEn: string;
  type: string;
  startDate: string | Date;
  endDate: string | Date;
  locationBn: string;
  locationEn: string;
  isPublic: boolean;
}

export interface FallbackTeacher {
  id: string;
  nameBn: string;
  nameEn: string;
  designation: string;
  department: string;
  qualification: string;
  phone: string;
  email: string;
  avatarUrl: string;
  employeeId?: string;
  order: number;
}

export interface FallbackGalleryItem {
  id: string;
  titleBn: string;
  titleEn: string;
  imageUrl: string;
  category: string;
  order: number;
}

export const fallbackNotices: FallbackNotice[] = [
  {
    id: "notice-01",
    titleBn: "২০২৬ শিক্ষাবর্ষে ১ম থেকে ১২শ শ্রেণিতে ভর্তি সংক্রান্ত জরুরি বিজ্ঞপ্তি",
    titleEn: "Admission Open for Session 2026 (Classes 1 to 12)",
    contentBn: "এতদ্বারা মিরসরাই স্কুল এন্ড কলেজের সম্মানিত অভিভাবক ও শুভানুধ্যায়ীদের অবগতির জন্য জানানো যাচ্ছে যে, ২০২৬ শিক্ষাবর্ষে ১ম শ্রেণি থেকে দ্বাদশ শ্রেণি (বিজ্ঞান, ব্যবসায় শিক্ষা ও মানবিক বিভাগ) পর্যন্ত ভর্তি কার্যক্রম শুরু হয়েছে। আগ্রহী প্রার্থীদের প্রতিষ্ঠানের অফিসিয়াল ওয়েবসাইটে অনলাইন পোর্টালের মাধ্যমে নির্ধারিত সময়ের মধ্যে আবেদন সম্পন্ন করার জন্য অনুরোধ করা হচ্ছে। আবেদন ফি ও প্রয়োজনীয় সনদের তালিকা ওয়েবসাইটে পাওয়া যাবে।",
    contentEn: "This is to inform all respected guardians and well-wishers that online admission applications for the academic session 2026 are now open for Classes 1 to 12 across Science, Business Studies, and Humanities streams. Candidates are requested to submit applications online through the official school portal before the deadline.",
    category: "ADMISSION",
    isPinned: true,
    publishedAt: "2026-10-29T08:48:23.089Z",
  },
  {
    id: "notice-02",
    titleBn: "৯ম থেকে ১২শ শ্রেণির বার্ষিক পরীক্ষা ২০২৬ এর সময়সূচি প্রকাশ",
    titleEn: "Annual Examination Routine 2026 Published (Class 9 to 12)",
    contentBn: "চট্টগ্রাম মাধ্যমিক ও উচ্চ মাধ্যমিক শিক্ষা বোর্ডের নির্দেশনা মোতাবেক আগামী ১৫ নভেম্বর ২০২৬ তারিখ থেকে ৯ম, ১০ম, একাদশ ও দ্বাদশ শ্রেণির বার্ষিক পরীক্ষা অনুষ্ঠিত হবে। বিস্তারিত পরীক্ষার সময়সূচি বিদ্যালয়ের নোটিশ বোর্ড ও ওয়েবসাইটে প্রকাশ করা হলো। সকল পরীক্ষার্থীকে নির্ধারিত ইউনিফর্মে এবং পরীক্ষা শুরুর ৩০ মিনিট পূর্বে কেন্দ্রে উপস্থিত হতে হবে। পরীক্ষার হলে ডিজিটাল ডিভাইস আনা সম্পূর্ণ নিষিদ্ধ।",
    contentEn: "According to the directives of the Board of Intermediate and Secondary Education, Chattogram, the Annual Examination 2026 for Classes 9 to 12 will commence on 15 November 2026. The full routine is available on the notice board and digital portal.",
    category: "EXAM",
    isPinned: true,
    publishedAt: "2026-10-28T08:48:23.093Z",
  },
  {
    id: "notice-03",
    titleBn: "পবিত্র ঈদে মিলাদুন্নবী (সাঃ) উপলক্ষে প্রতিষ্ঠান ছুটি সংক্রান্ত নোটিশ",
    titleEn: "Institutional Holiday Notice on the Occasion of Holy Eid-e-Miladunnabi",
    contentBn: "মিরসরাই স্কুল এন্ড কলেজের সকল শিক্ষক, কর্মচারী, শিক্ষার্থী ও অভিভাবকদের জানানো যাচ্ছে যে, পবিত্র ঈদে মিলাদুন্নবী (সাঃ) উপলক্ষে আগামী রবিবার প্রতিষ্ঠানের সকল পাঠদান ও প্রশাসনিক কার্যক্রম বন্ধ থাকবে। পরবর্তী কার্যদিবস থেকে নিয়মিত সময়সূচি অনুযায়ী সকল শ্রেণি কার্যক্রম যথারীতি চলবে।",
    contentEn: "All teachers, employees, students, and guardians of Mirsharai School and College are hereby notified that the institution will remain closed on Sunday on the auspicious occasion of Holy Eid-e-Miladunnabi. Regular classes will resume on the next working day.",
    category: "HOLIDAY",
    isPinned: false,
    publishedAt: "2026-10-27T08:48:23.096Z",
  },
  {
    id: "notice-04",
    titleBn: "অর্ধবার্ষিক পরীক্ষার ডিজিটাল ফলাফল ও মার্কশিট ডাউনলোড",
    titleEn: "Half-Yearly Examination Result Publication & Marksheet Download",
    contentBn: "অত্যন্ত আনন্দের সাথে জানানো যাচ্ছে যে, ২০২৬ শিক্ষাবর্ষের অর্ধবার্ষিক পরীক্ষার ফলাফল ডিজিটাল শিক্ষার্থী পোর্টালে প্রকাশ করা হয়েছে। শিক্ষার্থী ও অভিভাবকগণ নিজ নিজ আইডি ও রোল নম্বর ব্যবহার করে ফলাফল দেখতে এবং প্রিন্টযোগ্য মার্কশিট ডাউনলোড করতে পারবেন। কোনো ফলাফল সংক্রান্ত আপত্তি থাকলে আগামী ৭ কর্মদিবসের মধ্যে পরীক্ষা নিয়ন্ত্রক শাখায় যোগাযোগ করতে হবে।",
    contentEn: "The results for the Half-Yearly Examination 2026 have been officially published on the digital student portal. Students and parents can access their grades and download verified printable marksheets using their ID and roll numbers.",
    category: "ACADEMIC",
    isPinned: false,
    publishedAt: "2026-10-26T08:48:23.099Z",
  },
];

export const fallbackEvents: FallbackEvent[] = [
  {
    id: "event-01",
    titleBn: "বার্ষিক ক্রীড়া প্রতিযোগিতা ও পুরস্কার বিতরণী ২০২৬",
    titleEn: "Annual Athletics Meet & Prize Distribution 2026",
    descriptionBn: "মিরসরাই স্কুল এন্ড কলেজের কেন্দ্রীয় খেলার মাঠে আয়োজিত হবে বর্ণাঢ্য ক্রীড়া উৎসব।",
    descriptionEn: "The colorful Annual Athletics Meet at the college central sports pavilion.",
    type: "SPORTS",
    startDate: "2026-11-25T00:00:00.000Z",
    endDate: "2026-11-26T00:00:00.000Z",
    locationBn: "কলেজ খেলার মাঠ, মিরসরাই",
    locationEn: "College Sports Pavilion, Mirsharai",
    isPublic: true,
  },
  {
    id: "event-02",
    titleBn: "আন্তঃকলেজ বিজ্ঞান মেলা ও উদ্ভাবনী প্রজেক্ট প্রদর্শনী",
    titleEn: "Science Fair & Innovation Expo 2026",
    descriptionBn: "বিজ্ঞান বিভাগের শিক্ষার্থীদের উদ্ভাবনী রোবটিক্স ও পরিবেশবান্ধব প্রজেক্ট প্রদর্শনী।",
    descriptionEn: "Robotics, IoT, and environmental innovation projects created by our college scholars.",
    type: "EVENT",
    startDate: "2026-12-05T00:00:00.000Z",
    endDate: "2026-12-06T00:00:00.000Z",
    locationBn: "অডিটোরিয়াম ও বিজ্ঞান ভবন",
    locationEn: "Main Auditorium & Science Complex",
    isPublic: true,
  },
  {
    id: "event-03",
    titleBn: "অভিভাবক সমাবেশ ও মতবিনিময় সভা",
    titleEn: "Parent-Teacher Meeting & Academic Review",
    descriptionBn: "শিক্ষার্থীদের সার্বিক মূল্যায়ন, উপস্থিতি ও নৈতিক মানোন্নয়নে অভিভাবক সমাবেশ।",
    descriptionEn: "Interactive review session discussing student academic growth and discipline.",
    type: "EVENT",
    startDate: "2026-11-10T00:00:00.000Z",
    endDate: "2026-11-10T00:00:00.000Z",
    locationBn: "সেমিনার হল",
    locationEn: "College Seminar Hall",
    isPublic: true,
  },
];

export const fallbackTeachers: FallbackTeacher[] = [
  {
    id: "t-001",
    nameBn: "প্রফেসর মোঃ কামরুল হাসান",
    nameEn: "Prof. Md. Kamrul Hasan",
    designation: "অধ্যক্ষ (Principal)",
    department: "প্রশাসন ও বাংলা অনুষদ",
    qualification: "এম.এ, বি.এড (১ম শ্রেণি), চট্টগ্রাম বিশ্ববিদ্যালয়",
    phone: "01812-345678",
    email: "principal@mirsharaicollege.edu.bd",
    avatarUrl: "/images/teachers/msc-tea-001.jpg",
    employeeId: "MSC-FAC-001",
    order: 1,
  },
  {
    id: "t-002",
    nameBn: "সুরাইয়া ইয়াসমিন",
    nameEn: "Suraiya Yasmin",
    designation: "সহ-অধ্যক্ষ (Vice Principal)",
    department: "পদার্থবিজ্ঞান অনুষদ",
    qualification: "এম.এসসি (পদার্থবিজ্ঞান), বুয়েট",
    phone: "01812-345679",
    email: "viceprincipal@mirsharaicollege.edu.bd",
    avatarUrl: "/images/teachers/msc-tea-002.jpg",
    employeeId: "MSC-FAC-002",
    order: 2,
  },
  {
    id: "t-003",
    nameBn: "আব্দুল হান্নান চৌধুরী",
    nameEn: "Abdul Hannan Chowdhury",
    designation: "বিভাগীয় প্রধান (রসায়ন)",
    department: "বিজ্ঞান অনুষদ",
    qualification: "এম.এসসি (রসায়ন), ঢাবি",
    phone: "01812-345680",
    email: "hannan.chem@mirsharaicollege.edu.bd",
    avatarUrl: "/images/teachers/msc-tea-003.jpg",
    employeeId: "MSC-FAC-003",
    order: 3,
  },
  {
    id: "t-004",
    nameBn: "নাসরিন সুলতানা",
    nameEn: "Nasreen Sultana",
    designation: "সিনিয়র লেকচারার (জীববিজ্ঞান)",
    department: "বিজ্ঞান অনুষদ",
    qualification: "এম.এসসি (উদ্ভিদবিজ্ঞান), চবি",
    phone: "01812-345681",
    email: "nasreen.bio@mirsharaicollege.edu.bd",
    avatarUrl: "/images/teachers/msc-tea-004.jpg",
    employeeId: "MSC-FAC-004",
    order: 4,
  },
  {
    id: "t-005",
    nameBn: "মোহাম্মদ রফিকুল ইসলাম",
    nameEn: "Mohammad Rafiqul Islam",
    designation: "বিভাগীয় প্রধান (উচ্চতর গণিত)",
    department: "বিজ্ঞান অনুষদ",
    qualification: "এম.এসসি (ফলিত গণিত), শাবিপ্রবি",
    phone: "01812-345682",
    email: "rafiq.math@mirsharaicollege.edu.bd",
    avatarUrl: "/images/teachers/msc-tea-005.jpg",
    employeeId: "MSC-FAC-005",
    order: 5,
  },
  {
    id: "t-006",
    nameBn: "রেহানা আক্তার",
    nameEn: "Rehana Akter",
    designation: "সহকারী অধ্যাপক (ইংরেজি)",
    department: "কলা অনুষদ",
    qualification: "এম.এ (ইংরেজি সাহিত্য), জাহাঙ্গীরনগর বিশ্ববিদ্যালয়",
    phone: "01812-345683",
    email: "rehana.eng@mirsharaicollege.edu.bd",
    avatarUrl: "/images/teachers/msc-tea-006.jpg",
    employeeId: "MSC-FAC-006",
    order: 6,
  },
  {
    id: "t-007",
    nameBn: "মুহাম্মদ মিজানুর রহমান",
    nameEn: "Muhammad Mizanur Rahman",
    designation: "বিভাগীয় প্রধান (হিসাববিজ্ঞান)",
    department: "ব্যবসায় শিক্ষা অনুষদ",
    qualification: "এম.কম (একাউন্টিং), চবি, সিএ (সিসি)",
    phone: "01812-345684",
    email: "mizan.acc@mirsharaicollege.edu.bd",
    avatarUrl: "/images/teachers/msc-tea-007.jpg",
    employeeId: "MSC-FAC-007",
    order: 7,
  },
  {
    id: "t-008",
    nameBn: "ফারহানা জাহান",
    nameEn: "Farhana Jahan",
    designation: "লেকচারার (তথ্য ও যোগাযোগ প্রযুক্তি)",
    department: "আইসিটি অনুষদ",
    qualification: "বি.এসসি ইন সিএসই, চুয়েট",
    phone: "01812-345685",
    email: "farhana.ict@mirsharaicollege.edu.bd",
    avatarUrl: "/images/teachers/msc-tea-008.jpg",
    employeeId: "MSC-FAC-008",
    order: 8,
  },
  {
    id: "t-009",
    nameBn: "কাজী শফিউল আলম",
    nameEn: "Kazi Shafiul Alam",
    designation: "সহকারী শিক্ষক (পৌরনীতি ও সমাজবিজ্ঞান)",
    department: "মানবিক অনুষদ",
    qualification: "এম.এস.এস (রাষ্ট্রবিজ্ঞান), চবি",
    phone: "01812-345686",
    email: "shafiul.soc@mirsharaicollege.edu.bd",
    avatarUrl: "/images/teachers/msc-tea-009.jpg",
    employeeId: "MSC-FAC-009",
    order: 9,
  },
  {
    id: "t-010",
    nameBn: "মাহমুদা খানম",
    nameEn: "Mahmuda Khanam",
    designation: "সহকারী শিক্ষক (ইসলাম শিক্ষা ও আরবি)",
    department: "ধর্মীয় ও নৈতিক শিক্ষা",
    qualification: "কামিল (হাদিস), সরকারি মাদ্রাসা-ই-আলিয়া",
    phone: "01812-345687",
    email: "mahmuda.rel@mirsharaicollege.edu.bd",
    avatarUrl: "/images/teachers/msc-tea-010.jpg",
    employeeId: "MSC-FAC-010",
    order: 10,
  },
  {
    id: "t-011",
    nameBn: "তপন কুমার দে",
    nameEn: "Tapan Kumar Dey",
    designation: "সহকারী শিক্ষক (হিন্দুধর্ম ও নৈতিক শিক্ষা)",
    department: "ধর্মীয় শিক্ষা",
    qualification: "এম.এ (সংস্কৃত ও পালি), ঢাবি",
    phone: "01812-345688",
    email: "tapan.dey@mirsharaicollege.edu.bd",
    avatarUrl: "/images/teachers/msc-tea-011.jpg",
    employeeId: "MSC-FAC-011",
    order: 11,
  },
  {
    id: "t-012",
    nameBn: "মোঃ আনোয়ার হোসেন",
    nameEn: "Md. Anwar Hossain",
    designation: "ক্রীড়া শিক্ষক (শারীরিক শিক্ষা)",
    department: "শারীরিক শিক্ষা ও ক্রীড়া",
    qualification: "বি.পি.এড, জাতীয় ক্রীড়া শিক্ষা প্রতিষ্ঠান (BKSP)",
    phone: "01812-345689",
    email: "anwar.sports@mirsharaicollege.edu.bd",
    avatarUrl: "/images/teachers/msc-tea-012.jpg",
    employeeId: "MSC-FAC-012",
    order: 12,
  },
];

export const fallbackGalleryItems: FallbackGalleryItem[] = [
  {
    id: "gal-01",
    titleBn: "আধুনিক স্মার্ট ক্লাসরুমে শিক্ষার্থীদের ডিজিটাল পাঠদান",
    titleEn: "Digital Smart Classroom Interactive Session",
    imageUrl: "/images/gallery/gallery-01.jpg",
    category: "CLASSROOM",
    order: 1,
  },
  {
    id: "gal-02",
    titleBn: "উচ্চতর রসায়ন গবেষণাগারে টাইট্রেশন ও দ্রবণ পরীক্ষা",
    titleEn: "Chemistry Practical Laboratory Titration Experiment",
    imageUrl: "/images/gallery/gallery-02.jpg",
    category: "LAB",
    order: 2,
  },
  {
    id: "gal-03",
    titleBn: "কেন্দ্রীয় লাইব্রেরির সমৃদ্ধ গ্রন্থসম্ভার ও শান্ত পাঠকক্ষ",
    titleEn: "Central Institutional Library & Quiet Reading Sanctuary",
    imageUrl: "/images/gallery/gallery-03.jpg",
    category: "CAMPUS",
    order: 3,
  },
  {
    id: "gal-04",
    titleBn: "বার্ষিক ক্রীড়া প্রতিযোগিতা ও অ্যাথলেটিক্স স্প্রিন্ট রেস",
    titleEn: "Annual Sports Meet 100m Sprint on Track",
    imageUrl: "/images/gallery/gallery-04.jpg",
    category: "SPORTS",
    order: 4,
  },
  {
    id: "gal-05",
    titleBn: "কম্পিউটার ও আইটি ল্যাবে পাইথন কোডিং ও সফটওয়্যার ক্লাস",
    titleEn: "Computer & IT Lab Python Programming Workshop",
    imageUrl: "/images/gallery/gallery-05.jpg",
    category: "LAB",
    order: 5,
  },
  {
    id: "gal-06",
    titleBn: "বার্ষিক সাংস্কৃতিক উৎসব ও আনন্দ সন্ধ্যার মঞ্চ পরিবেশনা",
    titleEn: "Annual Cultural Festival & Performing Arts Stage",
    imageUrl: "/images/gallery/gallery-06.jpg",
    category: "CULTURAL",
    order: 6,
  },
  {
    id: "gal-21",
    titleBn: "অমর একুশে ফেব্রুয়ারি ও আন্তর্জাতিক মাতৃভাষা দিবসের প্রভাতফেরি",
    titleEn: "Language Martyrs' Day (Ekushey February) Morning Rally",
    imageUrl: "/images/gallery/gallery-21.jpg",
    category: "CULTURAL",
    order: 21,
  },
];
