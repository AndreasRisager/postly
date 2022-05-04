import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/local`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ identifier: credentials.email, password: credentials.password }),
        });

        if (response.ok) {
          const user = await response.json();
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  secret: `${process.env.NEXTAUTH_SECRET}`,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.jwt = user.jwt;
        token.id = user.user.id;
      }
      return Promise.resolve(token);
    },
    session: async ({ session, token }) => {
      // get user data from strapi
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token.jwt,
        },
      });
      const data = await response.json();

      session.jwt = token.jwt;
      session.id = token.id;
      session.user = { ...session.user, data };
      return Promise.resolve(session);
    },
  },
  pages: {
    signIn: "/auth/login",
  },
});
