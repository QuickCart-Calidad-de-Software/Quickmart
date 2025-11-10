import { auth } from "./_lib/auth";
import { redirect } from "next/navigation";
<<<<<<< HEAD
import MainPage from "./rols/admin/pages/MainPage";
import BuyerDashboard from "./rols/buyer/pages/MainPage";
=======
>>>>>>> b0c0aea04c785ae096ffde5dc072f626c1cf9c23

export default async function Home() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  switch (session.user.role) {
    case "vendedor":
      redirect("/dashboard/seller");
      break;

    case "admin":
      redirect("/dashboard/admin");
      break;

    case "usuario":
<<<<<<< HEAD
      return <BuyerDashboard userName={session.user.name || "Usuario"} />;
    
=======
      redirect("/dashboard/user");
      break;

>>>>>>> b0c0aea04c785ae096ffde5dc072f626c1cf9c23
    default:
      redirect("/auth/login");
  }
}
