import LoginForm from "@/app/_components/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login page for Quickmart application",
};

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-800">
      <LoginForm />
    </div>
  );
}
