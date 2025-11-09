import { auth } from "./_lib/auth";
import { redirect } from "next/navigation";

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
      redirect("/dashboard/admin");
      break;

    default:
      redirect("/auth/login");
  }
}
