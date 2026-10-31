import { storage } from './firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

/**
 * Uploads a file to Firebase Cloud Storage and returns the public download URL.
 * @param file File to upload
 * @param path Folder path in storage bucket (e.g. 'gallery', 'notices', 'teachers')
 */
export async function uploadToFirebaseStorage(
  file: File | Blob,
  path: string = 'uploads',
  customFileName?: string
): Promise<string> {
  if (!storage) {
    throw new Error('Firebase Storage is not initialized');
  }

  const fileName = customFileName || `${Date.now()}-${(file as File).name || 'file'}`;
  const storageRef = ref(storage, `${path}/${fileName}`);

  const snapshot = await uploadBytes(storageRef, file);
  const downloadUrl = await getDownloadURL(snapshot.ref);

  return downloadUrl;
}

/**
 * Deletes a file from Firebase Cloud Storage by its full URL or path.
 */
export async function deleteFromFirebaseStorage(fileUrlOrPath: string): Promise<boolean> {
  if (!storage) return false;

  try {
    const fileRef = ref(storage, fileUrlOrPath);
    await deleteObject(fileRef);
    return true;
  } catch (error) {
    console.error('Error deleting from Firebase Storage:', error);
    return false;
  }
}
