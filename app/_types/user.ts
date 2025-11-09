export type UserRole = "admin" | "user" | "vendedor";

export interface DbUser {
  id: string;
  email: string;
  username?: string | null;
  password_hash: string;
  name?: string | null;
  role: UserRole;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
