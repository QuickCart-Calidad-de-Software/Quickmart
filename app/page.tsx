import { auth } from "./_lib/auth";
import SignInButton from "./_components/SignInButton";
import SignOutButton from "./_components/SignOutButton";
import SellerDashboard from "./_components/SellerDashboard";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session?.user) {
    // En lugar de renderizar LoginForm aquí, redirigir a la página de login
    redirect('/auth/login');
  }

  // Renderizar dashboard según el rol
  switch (session.user.role) {
    case "vendedor":
      return <SellerDashboard userName={session.user.name || "Usuario"} />;
    
    case "admin":
      return (
        <div className="font-sans p-8" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
          <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
          <p>Bienvenido {session.user.name}</p>
          <SignOutButton />
        </div>
      );
    
    case "usuario":
      return (
        <div className="font-sans p-8" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
          <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
          <p>Bienvenido {session.user.name}</p>
          <SignOutButton />
        </div>
      );
    
    default:
      return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
          <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
            <p>Signed in as {session.user.name} with role {session.user.role}</p>
            <SignOutButton />
          </main>
        </div>
      );
  }
}
