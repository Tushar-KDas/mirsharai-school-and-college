import { redirect } from 'next/navigation';

export default async function ParentChildrenPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/parent/dashboard`);
}
