import { redirect } from 'next/navigation';

export default async function ParentFeesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/parent/dashboard#fees`);
}
