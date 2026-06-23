import { connection } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { AuthButton } from "@/components/auth-button";
import { Suspense } from "react";

export default async function CustomersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await connection();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  return (
    <div className="min-h-screen" style={{ background: "#F5F4F2" }}>
      <nav
        style={{ background: "#1C1F21" }}
        className="px-6 py-4 flex items-center justify-between"
      >
        <Link
          href="/customers"
          className="text-white font-bold text-base tracking-tight"
        >
          🔧 Eastside Auto
        </Link>
        <Suspense fallback={null}>
          <AuthButton />
        </Suspense>
      </nav>
      <main className="max-w-5xl mx-auto px-6 py-10">{children}</main>
    </div>
  );
}
