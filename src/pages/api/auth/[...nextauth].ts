import { createUser } from "lib/db";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  callbacks: {
    async session({ session }) {
      try {
        const email = session?.user?.email;
        if (email) await createUser(email);
      } catch (error) {
        console.error("error from nextAuth on creating user", error);
      }
      return session;
    },
  },

  /*
    async session({
      session,
      user,
    }: {
      session: Session;
      user: User | undefined;
    }): Promise<Session> {
      try {
        const email = user?.email;
        if (email) await createUser(email);
      } catch (error) {
        console.error("error from nextAuth on creating user", error);
      }

      return session;
    },
  */
};

export default NextAuth(authOptions);
