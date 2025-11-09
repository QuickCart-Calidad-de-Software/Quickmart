import { supabase } from "./supabaseClient";
import type { DbUser } from "@/app/_types/user";

export async function getUser(email: string): Promise<DbUser | null> {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error) {
    return null;
  }

  return data as DbUser;
}

// register should use the hash method in the @/app/utils/passwordUtils file OJO AHI!
