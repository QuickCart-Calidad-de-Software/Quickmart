import { auth } from "./_lib/auth";
import { redirect } from "next/navigation";
import BuyerDashboard from "./dashboard/buyer/page";

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
      redirect("/dashboard/buyer")    
    default:
      redirect("/auth/login");
  }
}
