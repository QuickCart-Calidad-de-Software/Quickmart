"use server";

import { signIn, signOut } from "@/app/_lib/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export async function signInAction(formData: FormData) {
  const { email, password } = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
    return { success: true };
  } catch (err: any) {
    if (isRedirectError(err)) throw err;
    return { success: false, error: err.message };
  }
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
