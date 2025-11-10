import { auth } from "./_lib/auth";
import SignInButton from "./_components/SignInButton";
import SignOutButton from "./_components/SignOutButton";
import SellerDashboard from "./rols/seller/pages/MainPage";
import { redirect } from "next/navigation";
import MainPage from "./rols/admin/pages/MainPage";
import BuyerDashboard from "./rols/buyer/pages/MainPage";

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
          <MainPage userName={session.user.name || "Usuario"} />
      );
    
    case "usuario":
      return <BuyerDashboard userName={session.user.name || "Usuario"} />;
    
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
