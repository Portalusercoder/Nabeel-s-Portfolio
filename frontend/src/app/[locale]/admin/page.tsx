import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { getTranslations } from "@/lib/i18n/server";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { locale: raw } = await params;
  const { dict } = await getTranslations(raw);
  return { title: dict.admin.title };
}

export default function AdminPage() {
  return <AdminDashboard />;
}
