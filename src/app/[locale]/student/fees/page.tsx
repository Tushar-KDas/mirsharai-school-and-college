import { redirect } from 'next/navigation';

export default async function StudentFeesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/student/dashboard#fees`);
}
