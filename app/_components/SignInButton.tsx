"use client";

import { useRouter } from "next/navigation";

export default function SignInButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/auth/login");
  };

  return (
    <button
      onClick={handleClick}
      className="w-full py-3 px-5 flex items-center justify-center gap-3 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200"
    >
      <span>Sign in</span>
    </button>
  );
}
