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
      {/* Header */}
      <header className="border-b border-[var(--border-color)] bg-[var(--card-bg)] px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo + Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">Q</span>
            </div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">
              QuickMart {role}
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <button
              className="relative p-2 rounded-lg hover:opacity-80"
              aria-label="Notifications"
            >
              <svg
                className="w-6 h-6 text-[var(--foreground)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium text-[var(--foreground)]">
                  {name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {role}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {name.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>

            <SignOutButton />
          </div>
        </div>
      </header>

      <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        {children}
      </main>
    </>
  );
}
