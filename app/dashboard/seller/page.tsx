import { auth } from "@/app/_lib/auth";
import { redirect } from "next/navigation";
import SellerDashboard from "@/app/rols/seller/pages/MainPage";

export default async function SellerDashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  if (session.user.role !== "vendedor") {
    redirect("/");
  }

  return (
    <SellerDashboard
      userName={session.user.name || "Vendedor"}
      userId={session.user.id || ""}
    />
  );
}
