export interface FacilityItem {
  id: string;
  slug: string;
  nameBn: string;
  nameEn: string;
  taglineBn: string;
  taglineEn: string;
  iconName: 'Monitor' | 'BookOpen' | 'FlaskConical' | 'Laptop' | 'Trophy' | 'Bus';
  colorTheme: {
    bgLight: string;
    iconBg: string;
    iconColor: string;
    borderColor: string;
    badgeBg: string;
    badgeText: string;
    accentGradient: string;
  };
  summaryBn: string;
  summaryEn: string;
  detailedOverviewBn: string;
  detailedOverviewEn: string;
  quickStats: {
    labelBn: string;
    labelEn: string;
    valueBn: string;
    valueEn: string;
  }[];
  keyFeaturesBn: string[];
  keyFeaturesEn: string[];
  equipmentListBn: string[];
  equipmentListEn: string[];
  inCharge: {
    nameBn: string;
    nameEn: string;
    titleBn: string;
    titleEn: string;
    phone: string;
    email: string;
  };
  timingsBn: string;
  timingsEn: string;
  rulesBn: string[];
  rulesEn: string[];
}

export const campusFacilities: FacilityItem[] = [
  {
    id: 'smart-class',
    slug: 'smart-class',
    nameBn: 'স্মার্ট ক্লাসরুম',
    nameEn: 'Smart Classrooms',
    taglineBn: 'আধুনিক মাল্টিমিডিয়া ও ইন্টারঅ্যাক্টিভ ডিজিটাল লার্নিং ব্যবস্থা',
    taglineEn: 'Interactive 4K Multimedia & Experiential Learning Environment',
    iconName: 'Monitor',
    colorTheme: {
      bgLight: 'bg-blue-50/60',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-200',
      badgeBg: 'bg-blue-100 text-blue-800',
      badgeText: 'text-blue-700',
      accentGradient: 'from-blue-600 to-indigo-700',
    },
    summaryBn: '৭৫ ইঞ্চি ৪কে ইন্টারঅ্যাক্টিভ টাচ স্ক্রিন, ডিজিটাল অডিও সিস্টেম ও সার্বক্ষণিক ব্রডব্যান্ডসহ শীতাতপ নিয়ন্ত্রিত ১৮টি আধুনিক ডিজিটাল শ্রেণিকক্ষ।',
    summaryEn: '18 air-conditioned multimedia classrooms equipped with 75" 4K interactive flat touch panels, surround acoustics, and dedicated high-speed fiber internet.',
    detailedOverviewBn: 'মিরসরাই স্কুল এন্ড কলেজের প্রতিটি শ্রেণিকক্ষকে একবিংশ শতাব্দীর আধুনিক শিক্ষাদানের উপযোগী করে গড়ে তোলা হয়েছে। চিরাচরিত ব্ল্যাকবোর্ডের পাশাপাশি এখানে স্থাপন করা হয়েছে ৭৫ ইঞ্চি আল্ট্রা-এইচডি ৪কে ইন্টারঅ্যাক্টিভ টাচ প্যানেল ও হাই-লুমেন প্রজেক্টর। এর মাধ্যমে শিক্ষকবৃন্দ পাঠ্যবইয়ের জটিল তত্ত্বগুলোকে থ্রিডি অ্যানিমেশন, বৈজ্ঞানিক ভিডিও চিত্র ও ডিজিটাল সিমুলেশনের মাধ্যমে শিক্ষার্থীদের সামনে জীবন্ত করে তোলেন। প্রতিটি ক্লাসরুমে রয়েছে শব্দদূষণহীন অ্যাকোস্টিক ডিজাইন, নিরাপদ বৈদ্যুতিক ব্যবস্থা এবং সেন্ট্রাল অডিও সাউন্ড অ্যামপ্লিফায়ার।',
    detailedOverviewEn: 'Mirsharai School and College features 18 cutting-edge multimedia smart classrooms engineered for 21st-century pedagogy. Moving beyond traditional chalkboards, each classroom is equipped with a 75-inch Ultra-HD 4K interactive touch display and high-lumen digital projection. Faculty leverage immersive 3D simulations, animated modules, and national curriculum digital repositories to simplify complex concepts. Acoustic insulation, ergonomic seating, and high-speed fiber WiFi ensure an uninterrupted, student-centric learning environment.',
    quickStats: [
      { labelBn: 'ডিজিটাল ক্লাসরুম', labelEn: 'Smart Rooms', valueBn: '১৮ টি', valueEn: '18 Rooms' },
      { labelBn: 'ডিসপ্লে সাইজ', labelEn: 'Interactive Display', valueBn: '৭৫" ৪কে আল্ট্রা এইচডি', valueEn: '75" 4K UHD' },
      { labelBn: 'শীতাতপ নিয়ন্ত্রণ', labelEn: 'Air Conditioning', valueBn: '১০০% এসির সুবিধা', valueEn: '100% AC Fitted' },
      { labelBn: 'ইন্টারনেট ব্যাকবোন', labelEn: 'Broadband Speed', valueBn: '১০০ এমবিপিএস ফাইবার', valueEn: '100 Mbps Dedicated' },
    ],
    keyFeaturesBn: [
      '৭৫ ইঞ্চি ভিউসনিক ৪কে মাল্টি-টাচ ডিজিটাল হোয়াইটবোর্ড ও স্মার্ট পেন সাপোর্ট',
      'জাতীয় পাঠ্যক্রমের ই-বুক ও ডিজিটাল কনটেন্ট সরাসরি স্ক্রিনে উপস্থাপনার সুবিধা',
      'শিক্ষকদের ডিজিটাল লেকচার সংরক্ষণ ও অনলাইন পোর্টালে আপলোডের সুবিধা',
      'শব্দদূষণমুক্ত পরিবেশ ও পেছনের বেঞ্চ পর্যন্ত স্পষ্ট শোনার জন্য স্পিকার সিস্টেম',
      'রিমোট গেস্ট লেকচার ও আন্তর্জাতিক ওয়েবিনারের জন্য ডিজিটাল ক্যামেরা সংযোগ',
      'অবিচ্ছিন্ন পাঠদানের জন্য ১০০% অনলাইন সেন্ট্রাল জেনারেটর ব্যাকআপ'
    ],
    keyFeaturesEn: [
      '75-inch ViewSonic 4K multi-touch interactive flat panels with intelligent stylus',
      'Direct on-screen integration with NCTB digital curriculum and interactive modules',
      'Lecture recording capabilities allowing teachers to archive sessions for review',
      'Acoustically optimized audio reinforcement reaching every corner clearly',
      'Dedicated HD webcams for remote hybrid guest lectures and academic webinars',
      'Uninterrupted 100% power backup powered by automatic heavy-duty generators'
    ],
    equipmentListBn: [
      'ViewSonic IFP7550-3 75" 4K Interactive Flat Panels',
      'Epson EB-X51 High-Lumens Digital Presentation Projectors',
      'Yamaha Professional Wall-Mounted Surround Audio System',
      'Dual-Band Cisco Enterprise WiFi 6 Access Points',
      'Gree 2.5-Ton Heavy-Duty Inverter Air Conditioners'
    ],
    equipmentListEn: [
      'ViewSonic IFP7550-3 75" 4K Interactive Flat Panels',
      'Epson EB-X51 High-Lumens Digital Presentation Projectors',
      'Yamaha Professional Wall-Mounted Surround Audio System',
      'Dual-Band Cisco Enterprise WiFi 6 Access Points',
      'Gree 2.5-Ton Heavy-Duty Inverter Air Conditioners'
    ],
    inCharge: {
      nameBn: 'প্রকৌশলী তানভীর হাসান',
      nameEn: 'Engr. Tanveer Hasan',
      titleBn: 'সহকারী অধ্যাপক ও প্রধান, স্মার্ট ক্লাসরুম ও আইসিটি সেল',
      titleEn: 'Assistant Professor & Head, Smart Classroom & ICT Cell',
      phone: '+880 1812-445566',
      email: 'smartclass@mirsharaicollege.edu.bd'
    },
    timingsBn: 'রবিবার থেকে বৃহস্পতিবার: সকাল ৯:০০ টা - বিকাল ৪:১৫ টা',
    timingsEn: 'Sunday to Thursday: 9:00 AM - 4:15 PM',
    rulesBn: [
      'শিক্ষক বা ল্যাব টেকনিশিয়ানের অনুমতি ব্যতিরেকে টাচ ডিসপ্লে পরিবর্তন নিষিদ্ধ।',
      'ক্লাসরুমে খাদ্যদ্রব্য ও পানীয় বহন করা সম্পূর্ণরূপে নিষেধ।',
      'ক্লাস শেষ হওয়ার পর প্রজেক্টর ও লাইট সুইচ অফ করা ক্লাসের মনিটরের দায়িত্ব।'
    ],
    rulesEn: [
      'No modification of display settings without teacher or technician approval.',
      'Food and open drinks are strictly prohibited inside smart classrooms.',
      'Class captains must ensure interactive panels and projectors are powered off post-session.'
    ]
  },
  {
    id: 'library',
    slug: 'library',
    nameBn: 'কেন্দ্রীয় গ্রন্থাগার',
    nameEn: 'Central Library',
    taglineBn: '১২,৫০০+ বইয়ের বিশাল সংগ্রহ ও শীতাতপ নিয়ন্ত্রিত শান্ত পাঠকক্ষ',
    taglineEn: 'Extensive 12,500+ Book Archive & Peaceful Air-Conditioned Sanctuary',
    iconName: 'BookOpen',
    colorTheme: {
      bgLight: 'bg-emerald-50/60',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
      borderColor: 'border-emerald-200',
      badgeBg: 'bg-emerald-100 text-emerald-800',
      badgeText: 'text-emerald-700',
      accentGradient: 'from-emerald-600 to-teal-700',
    },
    summaryBn: '১২,৫০০-এর বেশি মুদ্রিত বই, ৮০ আসনবিশিষ্ট আধুনিক রিডিং হল, বারকোড অটোমেশন এবং প্রতিদিনের জাতীয় সংবাদপত্র ও সাময়িকী।',
    summaryEn: 'Over 12,500 curated volumes, an 80-seat silent study hall, computerized barcode circulation, and access to national journals.',
    detailedOverviewBn: 'জ্ঞানের আলো ছড়াতে আমাদের কেন্দ্রীয় লাইব্রেরি ক্যাম্পাসের অন্যতম প্রাণকেন্দ্র। এখানে রয়েছে বাংলা ও বিশ্বসাহিত্য, বিজ্ঞান বিশ্বকোষ, গণিত অলিম্পিয়াড প্রস্তুতি, মুক্তিযুদ্ধ ও বঙ্গবন্ধু গবেষণা কর্নার, এবং বিশ্ববিদ্যালয় ও মেডিক্যাল ভর্তি সহায়ক রেফারেন্স গ্রন্থ। লাইব্রেরিতে শিক্ষার্থীদের জন্য রয়েছে ৮০ আসনবিশিষ্ট শব্দহীন শীতাতপ নিয়ন্ত্রিত পাঠকক্ষ। সম্পূর্ণ লাইব্রেরিটি আধুনিক কোহা (Koha) সফটওয়্যারে ডিজিটালভাবে ক্যাটালগ করা হয়েছে, যার ফলে শিক্ষার্থীরা কম্পিউটার টার্মিনাল থেকেই যেকোনো বই মুহূর্তের মধ্যে খুঁজে নিতে পারে।',
    detailedOverviewEn: 'At the intellectual heart of the campus lies the Central Library, home to over 12,500 volumes spanning Bengali and international literature, scientific encyclopedias, historical documents, Liberation War archives, and competitive examination reference manuals. An 80-seat silent reading hall provides an idyllic academic atmosphere. The library catalog is fully digitized through Koha Open-Source Integrated Library System, allowing students to search the collection via OPAC terminals instantaneously.',
    quickStats: [
      { labelBn: 'সংরক্ষিত গ্রন্থ', labelEn: 'Total Books', valueBn: '১২,৫০০+ বই', valueEn: '12,500+ Books' },
      { labelBn: 'পাঠকক্ষের আসন', labelEn: 'Reading Capacity', valueBn: '৮০ টি আসন', valueEn: '80 Silent Seats' },
      { labelBn: 'ডিজিটাল টার্মিনাল', labelEn: 'OPAC Terminals', valueBn: '৬ টি কম্পিউটার', valueEn: '6 Search Terminals' },
      { labelBn: 'সংবাদপত্র ও সাময়িকী', labelEn: 'Daily Newspapers', valueBn: '১২ টি পত্রিকা', valueEn: '12 National Dailies' },
    ],
    keyFeaturesBn: [
      'বারকোড স্ক্যানার ও আইডি কার্ডের মাধ্যমে দ্রুত বই গ্রহণ ও প্রদানের কম্পিউটারাইজড ব্যবস্থা',
      'বঙ্গবন্ধু ও মুক্তিযুদ্ধ কর্নারে দুষ্প্রাপ্য ঐতিহাসিক দলিল ও মুক্তিযুদ্ধের আলোকচিত্র সংকলন',
      'মেডিক্যাল, ইঞ্জিনিয়ারিং ও সাধারণ বিশ্ববিদ্যালয় ভর্তি পরীক্ষার জন্য বিশেষ রেফারেন্স কর্নার',
      '৮টি আধুনিক কম্পিউটারের মাধ্যমে ই-বুক ও জার্নাল পড়ার সুযোগ',
      'শিক্ষার্থীদের জন্য সাশ্রয়ী মূল্যে ফটোকপি ও প্রিন্টিং সেবা'
    ],
    keyFeaturesEn: [
      'Automated computerized book borrowing and returns using student barcode IDs',
      'Dedicated Bangabandhu & Liberation War research corner with rare historical archives',
      'Specialized preparatory section for Medical, Engineering, and University admissions',
      'Dedicated digital e-library corner with high-speed internet for online journals',
      'Subsidized high-speed photocopy and laser printing facilities for study materials'
    ],
    equipmentListBn: [
      'Koha Integrated Open-Source Library Management System',
      'Honeywell Barcode Scanners & Citizen Thermal Printers',
      'Dell OptiPlex Desktop Stations for Student OPAC Search',
      'Teak-Wood Heavy Ergonomic Study Desks & Partitions',
      'Anti-theft Library Security Gates and CCTV Monitoring'
    ],
    equipmentListEn: [
      'Koha Integrated Open-Source Library Management System',
      'Honeywell Barcode Scanners & Citizen Thermal Printers',
      'Dell OptiPlex Desktop Stations for Student OPAC Search',
      'Teak-Wood Heavy Ergonomic Study Desks & Partitions',
      'Anti-theft Library Security Gates and CCTV Monitoring'
    ],
    inCharge: {
      nameBn: 'মোছা. শিরিন সুলতানা',
      nameEn: 'Mst. Shirin Sultana',
      titleBn: 'প্রধান গ্রন্থাগারিক (এমএ, গ্রন্থাগার ও তথ্যবিজ্ঞান)',
      titleEn: 'Chief Librarian (MA in Library & Information Science)',
      phone: '+880 1815-778899',
      email: 'library@mirsharaicollege.edu.bd'
    },
    timingsBn: 'রবিবার থেকে বৃহস্পতিবার: সকাল ৮:৩০ টা - বিকাল ৪:৩০ টা (শনিবার বিশেষ স্টাডি আওয়ার)',
    timingsEn: 'Sunday to Thursday: 8:30 AM - 4:30 PM (Saturday Special Study Hours)',
    rulesBn: [
      'লাইব্রেরির ভেতরে সম্পূর্ণ নীরবতা বজায় রাখা বাধ্যতামূলক।',
      'একবারে সর্বোচ্চ ২টি বই ১৪ দিনের জন্য ইস্যু করা যাবে।',
      'লাইব্রেরিতে ব্যাগ ও পার্স নিয়ে প্রবেশ নিষেধ; টোকেন লকারে জমা রাখতে হবে।'
    ],
    rulesEn: [
      'Absolute silence must be strictly maintained at all times inside the library.',
      'A student may borrow up to two books simultaneously for a maximum of 14 days.',
      'Personal bags and food must be deposited at the entrance counter lockers.'
    ]
  },
  {
    id: 'science-lab',
    slug: 'science-lab',
    nameBn: 'বিজ্ঞান গবেষণাগার',
    nameEn: 'Science Laboratories',
    taglineBn: 'পদার্থ, রসায়ন ও জীববিজ্ঞানের ৩টি পৃথক আন্তর্জাতিক মানের ল্যাব',
    taglineEn: 'Three Advanced Independent Labs for Physics, Chemistry & Biology',
    iconName: 'FlaskConical',
    colorTheme: {
      bgLight: 'bg-purple-50/60',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      borderColor: 'border-purple-200',
      badgeBg: 'bg-purple-100 text-purple-800',
      badgeText: 'text-purple-700',
      accentGradient: 'from-purple-600 to-pink-700',
    },
    summaryBn: 'পদার্থবিজ্ঞান, রসায়ন ও জীববিজ্ঞানের পৃথক ৩টি সমৃদ্ধ গবেষণাগার। আধুনিক মাইক্রোস্কোপ, অ্যানালিটিক্যাল ব্যালেন্স ও ফিউম হুড সম্বলিত।',
    summaryEn: 'Three independent experimental laboratories for Physics, Chemistry, and Biology, equipped with binocular microscopes, analytical balances, and fume hoods.',
    detailedOverviewBn: 'তাত্ত্বিক জ্ঞানের সাথে ব্যবহারিক বাস্তবতার মেলবন্ধন ঘটাতে আমাদের রয়েছে ৩টি সুসজ্জিত বিজ্ঞান গবেষণাগার। পদার্থবিজ্ঞান ল্যাবে অপটিক্যাল বেঞ্চ, স্ক্রু গেজ, সনোমিটার ও ইলেকট্রনিক সার্কিট বোর্ড; রসায়ন ল্যাবে টাইট্রেশন সেট, ডিজিটাল পিএইচ মিটার ও অ্যাসিড-প্রতিরোধী গ্রানাইট টেবিল; এবং জীববিজ্ঞান ল্যাবে রয়েছে উচ্চক্ষমতাসম্পন্ন বাইনোকুলার মাইক্রোস্কোপ, মানবদেহের অঙ্গসংস্থানিক থ্রিডি মডেল ও উদ্ভিদের সংরক্ষিত স্যাম্পল। প্রতিটি ব্যাচে ৩০ জন শিক্ষার্থী শিক্ষক ও ল্যাব সহকারীর তত্ত্বাবধানে সরাসরি পরীক্ষায় অংশ নিতে পারে।',
    detailedOverviewEn: 'Transforming theoretical textbook principles into tangible scientific discovery, our science facility features three fully equipped standalone laboratories for Physics, Chemistry, and Biology. The Physics lab houses optical benches, spectrometer prisms, sonometers, and analog-digital circuit boards; the Chemistry lab provides acid-resistant granite worktops, digital pH meters, and titration stations; the Biology lab contains precision binocular compound microscopes, 3D anatomical models, and botanical specimens. Up to 30 students per session conduct experiments simultaneously under faculty supervision.',
    quickStats: [
      { labelBn: 'বিশেষায়িত ল্যাব', labelEn: 'Dedicated Labs', valueBn: '৩ টি স্বতন্ত্র ল্যাব', valueEn: '3 Standalone Labs' },
      { labelBn: 'মোট ওয়ার্কস্টেশন', labelEn: 'Workstations', valueBn: '৯০ টি শিক্ষার্থী আসন', valueEn: '90 Workstations' },
      { labelBn: 'মাইক্রোস্কোপ সংখ্যা', labelEn: 'Compound Microscopes', valueBn: '৪০ টি আধুনিক সেট', valueEn: '40 Precision Sets' },
      { labelBn: 'নিরাপত্তা মান', labelEn: 'Safety Standards', valueBn: '১০০% ফায়ার ও আই-ওয়াশ', valueEn: '100% Eyewash & Safety' },
    ],
    keyFeaturesBn: [
      'প্রতিটি ল্যাবে স্বতন্ত্র গ্যাস পাইপলাইন, পানির বেসিন এবং কেমিক্যাল রেজিসট্যান্ট সারফেস',
      'ক্ষতিকর গ্যাসের নিরাপদ নিষ্কাশনের জন্য অটোমেটিক এক্সহস্ট ফিউম হুড চেম্বার',
      'জরুরি অবস্থার জন্য সেফটি শাওয়ার, আই-ওয়াশ স্টেশন এবং একাধিক ফায়ার এক্সটিংগুইশার',
      'ডিজিটাল সায়েন্টিফিক ব্যালেন্সের মাধ্যমে ০.০০১ গ্রাম পর্যন্ত সূক্ষ্ম পরিমাপের সক্ষমতা',
      'ল্যাব টেকনিশিয়ান ও অভিজ্ঞ বিষয়ভিত্তিক শিক্ষকদের সার্বক্ষণিক সরাসরি দিকনির্দেশনা'
    ],
    keyFeaturesEn: [
      'Individual Bunsen burner gas taps, water sinks, and chemical-resistant granite surfaces',
      'Heavy-duty powered fume extraction hood for safe handling of volatile chemicals',
      'Emergency safety shower, specialized eyewash fountain, and CO2 fire extinguishers',
      'Precision electronic analytical balances measuring accurately down to 0.001 grams',
      'Constant hands-on guidance by senior subject teachers and certified lab demonstrators'
    ],
    equipmentListBn: [
      'Olympus CX23 Binocular Compound Microscopes',
      'Shimadzu Analytical Electronic Precision Balance (0.001g)',
      'Digital pH Meters & Conductivity Meters',
      'Optical Benches with Sodium Vapor & Mercury Lamps',
      'Complete Borosilicate Glassware Sets (Beakers, Pipettes, Burettes)'
    ],
    equipmentListEn: [
      'Olympus CX23 Binocular Compound Microscopes',
      'Shimadzu Analytical Electronic Precision Balance (0.001g)',
      'Digital pH Meters & Conductivity Meters',
      'Optical Benches with Sodium Vapor & Mercury Lamps',
      'Complete Borosilicate Glassware Sets (Beakers, Pipettes, Burettes)'
    ],
    inCharge: {
      nameBn: 'ড. মোহাম্মদ ইকবাল',
      nameEn: 'Dr. Mohammad Iqbal',
      titleBn: 'সিনিয়র প্রভাষক (পদার্থবিজ্ঞান) ও ল্যাব সমন্বয়ক',
      titleEn: 'Senior Lecturer (Physics) & Science Labs Coordinator',
      phone: '+880 1818-112233',
      email: 'sciencelab@mirsharaicollege.edu.bd'
    },
    timingsBn: 'ব্যবহারিক ক্লাস শিডিউল: সকাল ৯:৩০ টা - বিকাল ৩:৪৫ টা',
    timingsEn: 'Practical Lab Schedule: 9:30 AM - 3:45 PM',
    rulesBn: [
      'ল্যাবরেটরিতে সাদা অ্যাপ্রন (Lab Coat) ও নিরাপদ জুতো পরিধান বাধ্যতামূলক।',
      'শিক্ষকের স্পষ্ট অনুমতি ব্যতীত কোনো কেমিক্যাল বা যন্ত্র স্পর্শ করা দণ্ডনীয় অপরাধ।',
      'পরীক্ষা শেষে সকল গ্লাসওয়্যার সাবান পানি দিয়ে ধুয়ে যথাস্থানে রাখতে হবে।'
    ],
    rulesEn: [
      'Wearing standard white laboratory coats and closed-toe footwear is mandatory.',
      'Handling chemicals or apparatus without prior teacher authorization is strictly prohibited.',
      'All glassware must be washed, dried, and returned to storage cabinets post-experiment.'
    ]
  },
  {
    id: 'computer-lab',
    slug: 'computer-lab',
    nameBn: 'কম্পিউটার ও আইটি ল্যাব',
    nameEn: 'Computer & IT Lab',
    taglineBn: '৬০টি কোর আই-৫ পিসি, ১০০ এমবিপিএস ব্রডব্যান্ড ও কোডিং কর্নার',
    taglineEn: '60 Core i5 Workstations, Dedicated Fiber & Robotics Corner',
    iconName: 'Laptop',
    colorTheme: {
      bgLight: 'bg-indigo-50/60',
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-600',
      borderColor: 'border-indigo-200',
      badgeBg: 'bg-indigo-100 text-indigo-800',
      badgeText: 'text-indigo-700',
      accentGradient: 'from-indigo-600 to-blue-800',
    },
    summaryBn: '৬০টি ব্র্যান্ড ডেস্কটপ কম্পিউটার, সেন্ট্রাল গিগাবিট লোকাল নেটওয়ার্ক, ১০০ এমবিপিএস ব্রডব্যান্ড এবং পাইথন প্রোগ্রামিং ও রোবটিক্স প্রশিক্ষণ একাডেমি।',
    summaryEn: '60 branded Intel Core i5 workstations, Gigabit local networking, 100 Mbps fiber internet, and specialized Python programming and robotics facilities.',
    detailedOverviewBn: 'ডিজিটাল বাংলাদেশ বিনির্মাণে শিক্ষার্থীদের তথ্যপ্রযুক্তি দক্ষতায় সমৃদ্ধ করতে ক্যাম্পাসে গড়ে তোলা হয়েছে অত্যাধুনিক সেন্ট্রাল কম্পিউটার ল্যাব। ল্যাবটিতে রয়েছে ৬০টি ব্রান্ডেড ডেল কোর আই-৫ ১২তম জেনারেশনের দ্রুতগতির কম্পিউটার। প্রতিটি পিসিতে ১৬ জিবি র্যাম ও হাই-স্পিড এনভিএমই এসএসডি সংযোজিত। জাতীয় শিক্ষাক্রমের আইসিটি ব্যবহারিক ক্লাসের পাশাপাশি শিক্ষার্থীদের পাইথন প্রোগ্রামিং, এইচটিএমএল/সিএসএস ওয়েব ডিজাইন, অফিস অ্যাপ্লিকেশন এবং বেসিক রোবটিক্স ও মাইক্রোকন্ট্রোলার ট্রেনিং প্রদান করা হয়।',
    detailedOverviewEn: 'Empowering learners with real-world digital proficiency, our centralized Computer & IT Lab features 60 branded Dell desktop workstations powered by 12th Gen Intel Core i5 processors, 16GB RAM, and blazing-fast NVMe storage. Connected via high-speed Gigabit Ethernet and 100 Mbps dedicated optical fiber, the lab supports secondary and higher secondary ICT curriculums, foundational coding in Python and C++, web development, graphic design basics, and Arduino robotics club projects.',
    quickStats: [
      { labelBn: 'ডেস্কটপ পিসি', labelEn: 'Desktop Computers', valueBn: '৬০ টি ব্র্যান্ড পিসি', valueEn: '60 Branded PCs' },
      { labelBn: 'নেটওয়ার্ক স্পিড', labelEn: 'Dedicated Internet', valueBn: '১০০ এমবিপিএস ফাইবার', valueEn: '100 Mbps Fiber' },
      { labelBn: 'ইউপিএস ব্যাকআপ', labelEn: 'Power Resilience', valueBn: '২ ঘণ্টা সেন্ট্রাল অনলাইন', valueEn: '2 Hours Central UPS' },
      { labelBn: 'সফটওয়্যার স্যুট', labelEn: 'Software Suite', valueBn: 'Python, VS Code, Office', valueEn: 'Python, VS Code, Office' },
    ],
    keyFeaturesBn: [
      '৬০ জন শিক্ষার্থী একযোগে স্বতন্ত্র কম্পিউটারে বসে ব্যবহারিক কাজ করার সুবিধা',
      'উইন্ডোজ ১১ প্রো এবং লিনাক্স ডুয়াল-বুট অপারেটিং সিস্টেমের অভিজ্ঞতা',
      'শিক্ষকের মূল স্ক্রিন থেকে শিক্ষার্থীদের মনিটর নিয়ন্ত্রণের সেন্ট্রাল ল্যাব ম্যানেজমেন্ট সফটওয়্যার',
      'পাইথন, সি, জাভাস্ক্রিপ্ট কোডিং শেখার জন্য প্রি-কনফিগার করা ভিএস কোড ও পাইচার্ম',
      'রোবটিক্স ও স্টেম (STEM) ক্লাবের জন্য আরডুইনো এবং সেন্সর কিট কর্নার'
    ],
    keyFeaturesEn: [
      'Individual workstation per student ensuring 1:1 hands-on computing experience',
      'Dual-boot configurations featuring licensed Windows 11 Pro and Linux Ubuntu',
      'Central NetSupport classroom management software for real-time monitoring',
      'Pre-configured modern developer environments including Python, VS Code, and IDLE',
      'Dedicated STEM & Robotics club corner featuring Arduino kits, sensors, and servos'
    ],
    equipmentListBn: [
      'Dell OptiPlex 3000 Intel Core i5-12500, 16GB DDR4, 512GB NVMe SSD',
      'Dell 22-inch Full HD Eye-Care IPS Monitors',
      'Cisco Catalyst 24-Port Gigabit Managed Network Switches',
      'Emerson 15KVA Heavy Industrial Online Central UPS',
      'Sony Full HD Short-Throw Master Screen Projector'
    ],
    equipmentListEn: [
      'Dell OptiPlex 3000 Intel Core i5-12500, 16GB DDR4, 512GB NVMe SSD',
      'Dell 22-inch Full HD Eye-Care IPS Monitors',
      'Cisco Catalyst 24-Port Gigabit Managed Network Switches',
      'Emerson 15KVA Heavy Industrial Online Central UPS',
      'Sony Full HD Short-Throw Master Screen Projector'
    ],
    inCharge: {
      nameBn: 'সুব্রত ভৌমিক',
      nameEn: 'Subrata Bhowmik',
      titleBn: 'প্রভাষক (আইসিটি) ও সিস্টেম এডমিনিস্ট্রেটর',
      titleEn: 'Lecturer (ICT) & Campus Network Administrator',
      phone: '+880 1819-334455',
      email: 'itlab@mirsharaicollege.edu.bd'
    },
    timingsBn: 'ল্যাব ও প্র্যাকটিস সময়: সকাল ৯:০০ টা - বিকাল ৫:০০ টা',
    timingsEn: 'Lab & Open Practice Hours: 9:00 AM - 5:00 PM',
    rulesBn: [
      'ল্যাবের কম্পিউটারে যেকোনো বহিরাগত পেনড্রাইভ বা মেমোরি কার্ড প্রবেশ করানো নিষেধ।',
      'কম্পিউটারের কোনো সিস্টেম ফাইল বা পাসওয়ার্ড পরিবর্তন কঠোরভাবে নিষিদ্ধ।',
      'কাজ শেষে পিসি শাটডাউন ও কিবোর্ড-মাউস গুছিয়ে চেয়ার যথাস্থানে রাখতে হবে।'
    ],
    rulesEn: [
      'External flash drives and storage devices are restricted without staff scanning.',
      'Attempting to alter operating system files or administrative settings is strictly penalizable.',
      'Students must properly shut down workstations and arrange chairs neatly post-use.'
    ]
  },
  {
    id: 'sports-field',
    slug: 'sports-field',
    nameBn: 'খেলার মাঠ ও ক্রীড়া একাডেমি',
    nameEn: 'Sports Complex & Field',
    taglineBn: '৩.৫ একরের সুবিশাল সবুজ মাঠ, ক্রিকেট নেট ও ইনডোর গেমস',
    taglineEn: '3.5-Acre Sprawling Athletic Grounds, Cricket Turf Nets & Indoor Sports',
    iconName: 'Trophy',
    colorTheme: {
      bgLight: 'bg-amber-50/60',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
      borderColor: 'border-amber-200',
      badgeBg: 'bg-amber-100 text-amber-800',
      badgeText: 'text-amber-700',
      accentGradient: 'from-amber-500 to-orange-700',
    },
    summaryBn: '৩.৫ একর প্রাকৃতিক সবুজ খেলার মাঠ, ক্রিকেট প্র্যাকটিস নেট, ভলিবল কোর্ট, ইনডোর টেবিল টেনিস ও বার্ষিক ক্রীড়া একাডেমি।',
    summaryEn: 'Sprawling 3.5-acre lush athletic field, turf cricket practice nets, volleyball and badminton courts, table tennis, and annual coaching programs.',
    detailedOverviewBn: 'লেখাপড়ার পাশাপাশি শিক্ষার্থীদের শারীরিক সুস্থতা, শৃঙ্খলা ও নেতৃত্বের গুণাবলি বিকাশে মিরসরাই স্কুল এন্ড কলেজের রয়েছে ৩.৫ একর আয়তনের নিজস্ব নয়নজুড়ানো খেলার মাঠ। মাঠে রয়েছে ফুটবল খেলার স্ট্যান্ডার্ড পোস্ট, কংক্রিট ও টার্ফ ক্রিকেট প্র্যাকটিস পিচ, ভলিবল কোর্ট ও ২০০ মিটারের রানিং ট্র্যাক। এছাড়াও কলেজ ভবনের ইনডোরে টেবিল টেনিস, দাবা ও ক্যারাম খেলার ব্যবস্থা রয়েছে। প্রতি বছর জাঁকজমকপূর্ণ বার্ষিক ক্রীড়া প্রতিযোগিতা, আন্তঃহাউজ টুর্নামেন্ট এবং স্কাউট ও গার্ল গাইডসের মাঠ মহড়া এখানেই অনুষ্ঠিত হয়।',
    detailedOverviewEn: 'Instilling physical agility, discipline, sportsmanship, and teamwork, our campus features a scenic 3.5-acre natural athletic ground. The grounds house regulation football goals, dedicated cricket practice nets, floodlit volleyball and badminton courts, and a 200-meter sprint track. Indoor facilities include international-grade table tennis tables, tournament chess boards, and carrom setups. The campus hosts celebrated annual sports meets, inter-school championships, and national Scout camps.',
    quickStats: [
      { labelBn: 'খেলার মাঠের আয়তন', labelEn: 'Ground Area', valueBn: '৩.৫ একর সবুজ মাঠ', valueEn: '3.5-Acre Athletic Ground' },
      { labelBn: 'ক্রিকেট নেট প্র্যাকটিস', labelEn: 'Cricket Nets', valueBn: '২ টি সংরক্ষিত পিচ', valueEn: '2 Practice Nets' },
      { labelBn: 'ইনডোর গেমস সুবিধা', labelEn: 'Indoor Games', valueBn: 'টিটি, দাবা ও ক্যারাম', valueEn: 'Table Tennis & Chess' },
      { labelBn: 'ফ্লাডলাইট সুবিধা', labelEn: 'Night Floodlights', valueBn: 'কোর্ট ও মাঠে লাইটিং', valueEn: 'Courts & Pitch Lit' },
    ],
    keyFeaturesBn: [
      'নিয়মিত ফুটবল, ক্রিকেট ও ভলিবল টুর্নামেন্ট আয়োজনের আন্তর্জাতিক স্ট্যান্ডার্ড মাঠ',
      'প্রফেশনাল লেদার বল প্র্যাকটিসের জন্য সেফটি জালযুক্ত ২টি ক্রিকেট নেট',
      'বার্ষিক ক্রীড়া প্রতিযোগিতা ও পুরষ্কার বিতরণী অনুষ্ঠানের জন্য বিশাল স্টেডিয়াম প্যাভিলিয়ন',
      'মেয়ে শিক্ষার্থীদের জন্য নিরাপদ ইনডোর ক্রীড়া ও ব্যাডমিন্টন কোর্ট',
      'বাংলাদেশ স্কাউটস ও রেড ক্রিসেন্ট সোসাইটির নিয়মিত ড্রিল ও প্যারেড গ্রাউন্ড'
    ],
    keyFeaturesEn: [
      'Standardized natural grass pitch ideal for football, cricket, and athletic meets',
      'Enclosed safety practice nets tailored for hard leather-ball cricket bowling practice',
      'Spectator pavilion and stage accommodating major inter-school and district events',
      'Dedicated indoor sports area and badminton courts reserved for female students',
      'Certified parade ground for Bangladesh Scouts, Rover, and Red Crescent Youth drills'
    ],
    equipmentListBn: [
      'Stag International Tournament Table Tennis Tables',
      'SG & SS Full Cricket Match Kits, Bowling Gear & Safety Pads',
      'Nivia Regulation Footballs, Volleyballs & Net Assemblies',
      'High-Mast LED Stadium Floodlights for Evening Games',
      'Sports Medical First-Aid Kit & Stretcher Units'
    ],
    equipmentListEn: [
      'Stag International Tournament Table Tennis Tables',
      'SG & SS Full Cricket Match Kits, Bowling Gear & Safety Pads',
      'Nivia Regulation Footballs, Volleyballs & Net Assemblies',
      'High-Mast LED Stadium Floodlights for Evening Games',
      'Sports Medical First-Aid Kit & Stretcher Units'
    ],
    inCharge: {
      nameBn: 'মো. রেজাউল করিম',
      nameEn: 'Md. Rezaul Karim',
      titleBn: 'শারীরিক শিক্ষা শিক্ষক ও ক্রীড়া সমন্বয়ক',
      titleEn: 'Senior Physical Education Specialist & Sports Director',
      phone: '+880 1817-665544',
      email: 'sports@mirsharaicollege.edu.bd'
    },
    timingsBn: 'মাঠ অনুশীলনের সময়: বিকাল ৩:৩০ টা - সন্ধ্যা ৬:০০ টা',
    timingsEn: 'Ground Practice Hours: 3:30 PM - 6:00 PM',
    rulesBn: [
      'মাঠে খেলার সময় উপযুক্ত স্পোর্টস জুতো ও জার্সি পরিধান করা বাধ্যতামূলক।',
      'ক্রিকেট নেটে খেলার সময় হেলমেট ও প্যাড পরিধান ছাড়া বোলিং বা ব্যাটিং নিষিদ্ধ।',
      'মাঠের সবুজ ঘাস ও ড্রেনেজ ব্যবস্থা সুরক্ষায় কোনো প্রকার বর্জ্য ফেলা নিষিদ্ধ।'
    ],
    rulesEn: [
      'Standard sports trainers and active sportswear are mandatory on athletic grounds.',
      'Helmets and safety pads are strictly required when batting against hard leather cricket balls.',
      'Littering of plastic bottles or snacks is strictly penalized to maintain field turf.'
    ]
  },
  {
    id: 'transport',
    slug: 'transport',
    nameBn: 'কলেজ পরিবহন ব্যবস্থা',
    nameEn: 'College Transport Fleet',
    taglineBn: '৬টি নিজস্ব আধুনিক বাস, ৪টি প্রধান রুট ও লাইভ জিপিএস সুরক্ষা',
    taglineEn: 'Fleet of 6 Buses & Vans, 4 Arterial Routes & Real-Time GPS Tracking',
    iconName: 'Bus',
    colorTheme: {
      bgLight: 'bg-rose-50/60',
      iconBg: 'bg-rose-100',
      iconColor: 'text-rose-600',
      borderColor: 'border-rose-200',
      badgeBg: 'bg-rose-100 text-rose-800',
      badgeText: 'text-rose-700',
      accentGradient: 'from-rose-600 to-red-700',
    },
    summaryBn: 'প্রতিষ্ঠানের নিজস্ব ৬টি আধুনিক বাস ও মাইক্রোবাস। মীরসরাই, বারৈয়ারহাট, সীতাকুণ্ড ও জোরারগঞ্জ রুটে জিপিএস ট্র্যাকিং ও দক্ষ চালক দ্বারা পরিচালিত।',
    summaryEn: '6 dedicated college buses and vans covering 4 extensive routes across Mirsharai, Baraiyarhat, Sitakunda, and Zorarganj with live GPS security.',
    detailedOverviewBn: 'উপজেলার বিভিন্ন দূরবর্তী অঞ্চল থেকে শিক্ষার্থীদের নিরাপদ, সময়নিষ্ঠ ও স্বাচ্ছন্দ্যময় যাতায়াত নিশ্চিত করতে মিরসরাই স্কুল এন্ড কলেজের রয়েছে ৬টি নিজস্ব পরিবহন গাড়ির বহর। এর মধ্যে রয়েছে ৪টি বড় ৫২-সিটের বাস এবং ২টি মাইক্রোবাস। প্রতিটি গাড়িতে সার্বক্ষণিক স্যাটেলাইট জিপিএস ট্র্যাকার ও সিসিটিভি ক্যামেরা যুক্ত রয়েছে, যার ফলে প্রধান কার্যালয় থেকে যেকোনো সময় গাড়ির গতি ও সঠিক অবস্থান পর্যবেক্ষণ করা যায়। প্রশিক্ষিত ড্রাইভার এবং দায়িত্বশীল হেল্পারের মাধ্যমে শিক্ষার্থীদের নিরাপদ পিক-আপ ও ড্রপ-অফ নিশ্চিত করা হয়।',
    detailedOverviewEn: 'Ensuring secure, punctual, and comfortable daily transit for students across the upazila, Mirsharai School and College maintains an institutional fleet of 6 dedicated vehicles, including 4 heavy 52-seater buses and 2 microbuses. Each vehicle is equipped with active satellite GPS telematics and security surveillance, enabling real-time speed monitoring and trip tracking from the central admin office. Licensed drivers and trained helpers guarantee student safety and discipline at all times.',
    quickStats: [
      { labelBn: 'নিজস্ব গাড়ির বহর', labelEn: 'Transport Fleet', valueBn: '৬ টি বাস ও মাইক্রোবাস', valueEn: '6 Buses & Microbuses' },
      { labelBn: 'দৈনিক কভারেজ রুট', labelEn: 'Arterial Routes', valueBn: '৪ টি প্রধান রুট', valueEn: '4 Coverage Routes' },
      { labelBn: 'যাতায়াত সক্ষমতা', labelEn: 'Daily Capacity', valueBn: '২৪০+ শিক্ষার্থী', valueEn: '240+ Commuter Seats' },
      { labelBn: 'সুরক্ষা ব্যবস্থা', labelEn: 'Safety Equipment', valueBn: 'রিয়েলটাইম জিপিএস ও ক্যামেরা', valueEn: '100% Live GPS Tracked' },
    ],
    keyFeaturesBn: [
      'মীরসরাই উপজেলার প্রধান প্রধান সড়ক ও স্টপেজ থেকে নিয়মিত যাতায়াত সুবিধা',
      'অভিভাবকদের জন্য বাসের রিয়েলটাইম অবস্থান ও পৌঁছানোর সময় জানার হেল্পলাইন',
      'প্রতিটি বাসে স্পিড গভর্নর (সর্বোচ্চ গতিসীমা ৪০ কিমি/ঘণ্টা) এবং ফার্স্ট এইড বক্স',
      'নারী শিক্ষার্থীদের জন্য বিশেষ অগ্রাধিকার ও নিবেদিত মহিলা অ্যাটেনডেন্ট',
      'অভিজ্ঞ বিআরটিএ লাইসেন্সধারী পেশাদার চালক ও যাচাইকৃত সহকারী কর্মী'
    ],
    keyFeaturesEn: [
      'Comprehensive upazila-wide transit touching key transit hubs and residential clusters',
      'Dedicated transport hotline for parents to check vehicle ETA and route updates',
      'Strict speed governors capping speeds safely at 40 km/h alongside first aid units',
      'Reserved front seating and trained female attendants for younger learners',
      'BRTA-certified veteran commercial drivers with immaculate safety track records'
    ],
    equipmentListBn: [
      'Hino 52-Seater Heavy Institutional Buses (Air-Suspension)',
      'Toyota HiAce Commuter Microbuses for Express Pickup',
      'Concox GT06N Real-Time Satellite GPS Telematics Units',
      'Dual-Lens Dashcam & Interior Surveillance Cameras',
      'Automotive Heavy Fire Extinguishers & Emergency Glass Hammers'
    ],
    equipmentListEn: [
      'Hino 52-Seater Heavy Institutional Buses (Air-Suspension)',
      'Toyota HiAce Commuter Microbuses for Express Pickup',
      'Concox GT06N Real-Time Satellite GPS Telematics Units',
      'Dual-Lens Dashcam & Interior Surveillance Cameras',
      'Automotive Heavy Fire Extinguishers & Emergency Glass Hammers'
    ],
    inCharge: {
      nameBn: 'মো. শাহাদাত হোসেন',
      nameEn: 'Md. Shahadat Hossain',
      titleBn: 'পরিবহন কর্মকর্তা ও লজিস্টিকস ইন-চার্জ',
      titleEn: 'Transport Officer & Institutional Logistics Lead',
      phone: '+880 1819-987654',
      email: 'transport@mirsharaicollege.edu.bd'
    },
    timingsBn: 'সকালের ট্রিপ: সকাল ৭:১৫ টা - ৮:৪৫ টা | দুপুরের ট্রিপ: বিকাল ৩:৪৫ টা - ৫:১৫ টা',
    timingsEn: 'Morning Inward: 7:15 AM - 8:45 AM | Afternoon Outward: 3:45 PM - 5:15 PM',
    rulesBn: [
      'নির্ধারিত স্টপেজে বাস পৌঁছানোর ৫ মিনিট পূর্বে উপস্থিত থাকতে হবে।',
      'বাসে চলাচলের সময় জানালা দিয়ে হাত বা মাথা বের করা সম্পূর্ণ নিষিদ্ধ।',
      'পরিবহন আইডি কার্ড প্রদর্শন ব্যতিরেকে বাসে ওঠা যাবে না।'
    ],
    rulesEn: [
      'Students must arrive at designated pickup points 5 minutes before scheduled times.',
      'Extending heads or arms outside vehicle windows is strictly forbidden.',
      'Possession and display of an active student transport pass is mandatory.'
    ]
  }
];
