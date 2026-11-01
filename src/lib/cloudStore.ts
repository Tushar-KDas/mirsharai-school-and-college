import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  limit,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyDuwddr0viqFH9QUkA1SIAOLC7_FbcwbTI',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'mirsharai-school-and-college.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'mirsharai-school-and-college',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'mirsharai-school-and-college.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '410698632400',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:410698632400:web:718cee40dbaecfe03da2d5',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-KGF6S3KXJK',
};

function getDb() {
  try {
    const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    return getFirestore(app);
  } catch (err) {
    console.warn('Firestore initialization warning:', err);
    return null;
  }
}

export interface CloudNotice {
  id: string;
  titleBn: string;
  titleEn: string;
  contentBn: string;
  contentEn: string;
  category: string;
  isPinned: boolean;
  attachmentUrl?: string | null;
  publishedAt: string;
  status: string;
}

export async function saveNoticeCloud(notice: {
  id: string;
  titleBn: string;
  titleEn: string;
  contentBn: string;
  contentEn: string;
  category?: string;
  isPinned?: boolean;
  attachmentUrl?: string | null;
  publishedAt?: Date | string;
  status?: string;
}): Promise<void> {
  const firestore = getDb();
  if (!firestore) return;
  try {
    const docRef = doc(firestore, 'notices', notice.id);
    await setDoc(
      docRef,
      {
        id: notice.id,
        titleBn: notice.titleBn,
        titleEn: notice.titleEn,
        contentBn: notice.contentBn,
        contentEn: notice.contentEn,
        category: notice.category || 'GENERAL',
        isPinned: !!notice.isPinned,
        attachmentUrl: notice.attachmentUrl || null,
        publishedAt: notice.publishedAt
          ? new Date(notice.publishedAt).toISOString()
          : new Date().toISOString(),
        status: notice.status || 'PUBLISHED',
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (err) {
    console.warn('saveNoticeCloud error:', err);
  }
}

export async function getNoticesCloud(maxLimit = 20): Promise<CloudNotice[]> {
  const firestore = getDb();
  if (!firestore) return [];
  try {
    const colRef = collection(firestore, 'notices');
    const q = query(colRef, limit(maxLimit));
    const snap = await getDocs(q);
    const list: CloudNotice[] = [];
    snap.forEach((d) => {
      const data = d.data();
      list.push({
        id: d.id,
        titleBn: data.titleBn || '',
        titleEn: data.titleEn || '',
        contentBn: data.contentBn || '',
        contentEn: data.contentEn || '',
        category: data.category || 'GENERAL',
        isPinned: !!data.isPinned,
        attachmentUrl: data.attachmentUrl || null,
        publishedAt: data.publishedAt || data.createdAt || new Date().toISOString(),
        status: data.status || 'PUBLISHED',
      });
    });
    list.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
    return list;
  } catch (err) {
    console.warn('getNoticesCloud error:', err);
    return [];
  }
}

export async function saveAttendanceCloud(
  classId: string,
  dateStr: string,
  records: Array<{ studentId: string; status: string }>
): Promise<void> {
  const firestore = getDb();
  if (!firestore) return;
  try {
    const promises = records.map((r) => {
      if (!r.studentId) return Promise.resolve();
      const docId = `${classId}_${dateStr}_${r.studentId}`;
      const docRef = doc(firestore, 'attendance', docId);
      return setDoc(
        docRef,
        {
          classId,
          date: dateStr,
          studentId: r.studentId,
          status: r.status,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
    });
    await Promise.all(promises);
  } catch (err) {
    console.warn('saveAttendanceCloud error:', err);
  }
}

export async function getAttendanceCloud(
  classId: string,
  dateStr: string
): Promise<Record<string, string>> {
  const firestore = getDb();
  if (!firestore) return {};
  try {
    const q = query(
      collection(firestore, 'attendance'),
      where('classId', '==', classId),
      where('date', '==', dateStr)
    );
    const snap = await getDocs(q);
    const result: Record<string, string> = {};
    snap.forEach((d) => {
      const data = d.data();
      if (data.studentId && data.status) {
        result[data.studentId] = data.status;
      }
    });
    return result;
  } catch (err) {
    console.warn('getAttendanceCloud error:', err);
    return {};
  }
}
