import NextAuth, { CredentialsSignin } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password";
  message = "Invalid identifier or password";
}

const testUsers = [
  {
    id: "1",
    name: "Admin",
    email: "admin@example.com",
    username: "admin",
    password: "admin123",
    role: "admin",
  },
  {
    id: "2",
    name: "Vendedor",
    email: "vendedor@example.com",
    username: "vendedor",
    password: "vendedor123",
    role: "vendedor",
  },
  {
    id: "3",
    name: "Usuario",
    email: "usuario@example.com",
    username: "usuario",
    password: "usuario123",
    role: "usuario",
  },
];

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        //fetch from database
        const user = testUsers.find(
          (u) =>
            u.email === credentials?.email &&
            u.password === credentials?.password
        );
        if (!user) {
          throw new InvalidLoginError();
        }
        return user;
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
