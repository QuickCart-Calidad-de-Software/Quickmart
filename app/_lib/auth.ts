import NextAuth, { CredentialsSignin } from "next-auth";
import { getUser } from "@/app/_lib/data-service";
import Credentials from "next-auth/providers/credentials";
import { verifyPassword } from "@/app/_utils/passwordUtils";

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password";
  message = "Invalid identifier or password";
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;
        user = await getUser(credentials.email as string);
        if (!user) {
          throw new InvalidLoginError("Invalid credentials.");
        }

        const isValidPassword = await verifyPassword(
          credentials.password as string,
          user.password_hash
        );

        if (!isValidPassword) {
          throw new InvalidLoginError("Invalid credentials.");
        }
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: { strategy: "jwt" },
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth?.user;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user.role = token.role as string;
      return session;
    },
  },
});
