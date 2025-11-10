import SignOutButton from "@/app/_components/SignOutButton";
import { auth } from "@/app/_lib/auth";

function capitalize(str?: string): string {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const user = session?.user;
  const role = capitalize(user?.role);
  const name = user?.name ?? "";

  return (
    <>
      <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        {children}
      </main>
    </>
  );
}
