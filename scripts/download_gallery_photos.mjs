import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const galleryItemsData = [
  {
    order: 1,
    filename: 'gallery-01.jpg',
    url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
    category: 'CLASSROOM',
    titleBn: 'আধুনিক স্মার্ট ক্লাসরুমে শিক্ষার্থীদের ডিজিটাল পাঠদান',
    titleEn: 'Digital Smart Classroom Interactive Session',
  },
  {
    order: 2,
    filename: 'gallery-02.jpg',
    url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    category: 'LAB',
    titleBn: 'উচ্চতর রসায়ন গবেষণাগারে টাইট্রেশন ও দ্রবণ পরীক্ষা',
    titleEn: 'Chemistry Practical Laboratory Titration Experiment',
  },
  {
    order: 3,
    filename: 'gallery-03.jpg',
    url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
    category: 'CAMPUS',
    titleBn: 'কেন্দ্রীয় লাইব্রেরির সমৃদ্ধ গ্রন্থসম্ভার ও শান্ত পাঠকক্ষ',
    titleEn: 'Central Institutional Library & Quiet Reading Sanctuary',
  },
  {
    order: 4,
    filename: 'gallery-04.jpg',
    url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
    category: 'SPORTS',
    titleBn: 'বার্ষিক ক্রীড়া প্রতিযোগিতা ও অ্যাথলেটিক্স স্প্রিন্ট রেস',
    titleEn: 'Annual Sports Meet 100m Sprint on Track',
  },
  {
    order: 5,
    filename: 'gallery-05.jpg',
    url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    category: 'LAB',
    titleBn: 'কম্পিউটার ও আইটি ল্যাবে পাইথন কোডিং ও সফটওয়্যার ক্লাস',
    titleEn: 'Computer & IT Lab Python Programming Workshop',
  },
  {
    order: 6,
    filename: 'gallery-06.jpg',
    url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    category: 'CULTURAL',
    titleBn: 'বার্ষিক সাংস্কৃতিক উৎসব ও আনন্দ সন্ধ্যার মঞ্চ পরিবেশনা',
    titleEn: 'Annual Cultural Festival & Performing Arts Stage',
  },
  {
    order: 7,
    filename: 'gallery-07.jpg',
    url: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80',
    category: 'LAB',
    titleBn: 'পদার্থবিজ্ঞান ল্যাবে ইলেকট্রনিক সার্কিট ও অপটিক্যাল পরীক্ষা',
    titleEn: 'Physics Lab Optics & Electronics Circuit Exploration',
  },
  {
    order: 8,
    filename: 'gallery-08.jpg',
    url: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
    category: 'CAMPUS',
    titleBn: 'সবুজ প্রাঙ্গণ ও দৃষ্টিনন্দন প্রধান একাডেমিক ভবন',
    titleEn: 'Scenic Green Campus & Main Academic Faculty Complex',
  },
  {
    order: 9,
    filename: 'gallery-09.jpg',
    url: 'https://images.unsplash.com/photo-1531415074868-036b1c57e3ce?auto=format&fit=crop&w=800&q=80',
    category: 'SPORTS',
    titleBn: 'কলেজ মাঠে আন্তঃহাউজ ক্রিকেট টুর্নামেন্টের উত্তেজনাপূর্ণ ফাইনাল',
    titleEn: 'Inter-House Cricket Championship Final on Campus Ground',
  },
  {
    order: 10,
    filename: 'gallery-10.jpg',
    url: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=800&q=80',
    category: 'AWARDS',
    titleBn: 'কৃতী শিক্ষার্থীদের বার্ষিক মেধা পুরস্কার ও ট্রফি বিতরণ',
    titleEn: 'Academic Merit Excellence Trophies & Prize Giving Ceremony',
  },
  {
    order: 11,
    filename: 'gallery-11.jpg',
    url: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80',
    category: 'LAB',
    titleBn: 'জীববিজ্ঞান ল্যাবে কোষ ও অণুজীবের মাইক্রোস্কোপ পর্যবেক্ষণ',
    titleEn: 'Biology Lab Cellular Microscope Examination & Plant Specimen',
  },
  {
    order: 12,
    filename: 'gallery-12.jpg',
    url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
    category: 'CULTURAL',
    titleBn: 'আন্তঃস্কুল বাংলা ও ইংরেজি বিতর্ক প্রতিযোগিতা ও সেমিনার',
    titleEn: 'Inter-School Parliamentary Debate & Public Speaking Meet',
  },
  {
    order: 13,
    filename: 'gallery-13.jpg',
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    category: 'LAB',
    titleBn: 'জাতীয় বিজ্ঞান মেলা ও ইনোভেশন ফেস্টে রোবটিক্স প্রজেক্ট প্রদর্শনী',
    titleEn: 'Annual Science Fair & STEM Robotics Innovation Showcase',
  },
  {
    order: 14,
    filename: 'gallery-14.jpg',
    url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
    category: 'CAMPUS',
    titleBn: 'ক্যাম্পাস প্রাঙ্গণে সকালের সমাবেশ ও জাতীয় সংগীত পরিবেশন',
    titleEn: 'Morning Assembly, National Anthem & Daily Values Drill',
  },
  {
    order: 15,
    filename: 'gallery-15.jpg',
    url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
    category: 'SPORTS',
    titleBn: 'সবুজ মাঠে ফুটবল টুর্নামেন্টের জমজমাট ম্যাচ',
    titleEn: 'Inter-Class Football Championship on Lush Field',
  },
  {
    order: 16,
    filename: 'gallery-16.jpg',
    url: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80',
    category: 'SPORTS',
    titleBn: 'বাংলাদেশ স্কাউটস ও গার্ল গাইডের মাঠ মহড়া ও ক্যাম্পিং',
    titleEn: 'Bangladesh Scouts & Guides Field Drill & Camporee',
  },
  {
    order: 17,
    filename: 'gallery-17.jpg',
    url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80',
    category: 'CLASSROOM',
    titleBn: 'প্রাথমিক শাখার চিত্রাঙ্কন ও সৃজনশীল চারু-কারুকলা প্রদর্শনী',
    titleEn: 'Primary Section Creative Fine Arts & Painting Workshop',
  },
  {
    order: 18,
    filename: 'gallery-18.jpg',
    url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
    category: 'AWARDS',
    titleBn: 'দ্বাদশ শ্রেণির সমাবর্তন ও বিদায়ী সংবর্ধনা অনুষ্ঠান',
    titleEn: 'HSC Outgoing Batch Graduation & Farewell Ceremony',
  },
  {
    order: 19,
    filename: 'gallery-19.jpg',
    url: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80',
    category: 'CAMPUS',
    titleBn: 'কলেজের নিজস্ব আধুনিক বাস বহর ও নিরাপদ যাতায়াত সেবা',
    titleEn: 'College Transport Fleet Ready at Campus Terminal',
  },
  {
    order: 20,
    filename: 'gallery-20.jpg',
    url: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=800&q=80',
    category: 'CLASSROOM',
    titleBn: 'গণিত উৎসব ও অলিম্পিয়াড প্রশিক্ষণ ক্লাসে শিক্ষক ও শিক্ষার্থী',
    titleEn: 'Math Olympiad Problem-Solving & Advanced Geometry Workshop',
  },
  {
    order: 21,
    filename: 'gallery-21.jpg',
    url: 'https://images.unsplash.com/photo-1676970132913-e3db8e8493c3?auto=format&fit=crop&w=800&q=80',
    category: 'CULTURAL',
    titleBn: 'অমর একুশে ফেব্রুয়ারি ও আন্তর্জাতিক মাতৃভাষা দিবসের প্রভাতফেরি',
    titleEn: 'International Mother Language Day Tribute & Morning Procession',
  },
  {
    order: 22,
    filename: 'gallery-22.jpg',
    url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80',
    category: 'CAMPUS',
    titleBn: 'শিক্ষক মিলনায়তনে অ্যাকাডেমিক কাউন্সিলের বার্ষিক পরিকল্পনা সভা',
    titleEn: 'Faculty Academic Council Planning & Curriculum Review',
  },
  {
    order: 23,
    filename: 'gallery-23.jpg',
    url: 'https://images.unsplash.com/photo-1609710220150-64e6d60c4109?auto=format&fit=crop&w=800&q=80',
    category: 'SPORTS',
    titleBn: 'ইনডোর স্পোর্টস কমপ্লেক্সে টেবিল টেনিস ও দাবা প্রতিযোগিতা',
    titleEn: 'Indoor Sports Arena Table Tennis & Mind Games Championship',
  },
  {
    order: 24,
    filename: 'gallery-24.jpg',
    url: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=800&q=80',
    category: 'CULTURAL',
    titleBn: 'স্বাধীনতা ও বিজয় দিবসের বর্ণাঢ্য মঞ্চনাটক ও সাংস্কৃতিক গাঁথা',
    titleEn: 'National Day Patriotic Drama & Theatre Staging',
  },
];

async function main() {
  const targetDir = path.join(process.cwd(), 'public', 'images', 'gallery');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  console.log(`Downloading ${galleryItemsData.length} gallery images...`);

  for (const item of galleryItemsData) {
    const destPath = path.join(targetDir, item.filename);
    if (!fs.existsSync(destPath) || fs.statSync(destPath).size < 1000) {
      console.log(`Downloading ${item.filename} from ${item.url}...`);
      try {
        execSync(`curl.exe -s -L -k -o "${destPath}" "${item.url}"`);
        const stats = fs.statSync(destPath);
        console.log(`  Saved ${item.filename} (${stats.size} bytes)`);
      } catch (err) {
        console.error(`  Error downloading ${item.filename}:`, err.message);
      }
    } else {
      console.log(`  Already exists: ${item.filename} (${fs.statSync(destPath).size} bytes)`);
    }
  }

  // Clear existing items and insert 24 rich gallery records
  console.log('Seeding GalleryItem records into database...');
  await prisma.galleryItem.deleteMany({});

  for (const item of galleryItemsData) {
    await prisma.galleryItem.create({
      data: {
        order: item.order,
        category: item.category,
        titleBn: item.titleBn,
        titleEn: item.titleEn,
        imageUrl: `/images/gallery/${item.filename}`,
      },
    });
  }

  const count = await prisma.galleryItem.count();
  console.log(`Successfully seeded ${count} GalleryItem records into database.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
