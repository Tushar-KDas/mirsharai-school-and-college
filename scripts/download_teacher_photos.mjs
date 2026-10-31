import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import prisma from '../src/lib/prisma.ts';

const teachersDir = path.resolve('public/images/teachers');
if (!fs.existsSync(teachersDir)) {
  fs.mkdirSync(teachersDir, { recursive: true });
}

// Map teacher employee IDs to male/female portrait IDs
const femaleIds = new Set([
  'MSC-TEA-006',
  'MSC-TEA-008',
  'MSC-TEA-013',
  'MSC-TEA-016',
  'MSC-TEA-018',
  'MSC-TEA-021',
  'MSC-TEA-024',
  'MSC-TEA-026',
  'MSC-TEA-028',
  'MSC-TEA-030',
]);

async function main() {
  const teachers = await prisma.staff.findMany({
    where: { isTeacher: true },
    orderBy: { order: 'asc' },
  });

  console.log(`Downloading and assigning photos for ${teachers.length} teachers...`);

  let maleIndex = 1;
  let femaleIndex = 1;

  for (const t of teachers) {
    const isFemale = femaleIds.has(t.employeeId);
    const genderFolder = isFemale ? 'women' : 'men';
    const indexToUse = isFemale ? femaleIndex++ : maleIndex++;
    
    // Pick diverse portrait IDs
    const portraitNum = (indexToUse * 3) % 95 + 1;
    const url = `https://randomuser.me/api/portraits/${genderFolder}/${portraitNum}.jpg`;
    const localFileName = `${t.employeeId.toLowerCase()}.jpg`;
    const localFilePath = path.join(teachersDir, localFileName);
    const relativeUrl = `/images/teachers/${localFileName}`;

    try {
      execSync(`curl.exe -L "${url}" -o "${localFilePath}"`, { stdio: 'ignore' });
      await prisma.staff.update({
        where: { id: t.id },
        data: { photoUrl: relativeUrl },
      });
      console.log(`✓ ${t.employeeId} - ${t.nameEn}: saved ${relativeUrl}`);
    } catch (err) {
      console.error(`✗ Error downloading for ${t.employeeId}:`, err.message);
    }
  }

  console.log('Finished updating all teacher photos!');
}

main().finally(() => prisma.$disconnect());
