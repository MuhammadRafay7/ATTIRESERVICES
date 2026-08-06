import type { Metadata } from "next";
import { getSettings } from "@/lib/cms";
import { sessionClient } from "@/lib/supabase";
import { AdminShell } from "./AdminShell";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

/**
 * Admin segment layout.
 *
 * The login screen shares this segment but renders bare — there is no shell to
 * sign in to yet, so the chrome is only drawn once there is a session.
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await sessionClient();
  const {
    data: { user },
  } = (await supabase?.auth.getUser()) ?? { data: { user: null } };

  if (!user) return <>{children}</>;

  const settings = await getSettings();
  const logoUrl = (settings as { logoUrl?: string }).logoUrl;

  return (
    <AdminShell
      brandName={settings.name}
      logoUrl={logoUrl}
      email={user.email ?? ""}
    >
      {children}
    </AdminShell>
  );
}
