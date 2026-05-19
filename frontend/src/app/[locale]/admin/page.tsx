import { StrapiAdminRedirect } from "@/components/admin/StrapiAdminRedirect";
import { getTranslations } from "@/lib/i18n/server";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { locale: raw } = await params;
  const { dict } = await getTranslations(raw);
  return { title: dict.admin.strapiAdmin };
}

export default function AdminPage() {
  return <StrapiAdminRedirect />;
}
