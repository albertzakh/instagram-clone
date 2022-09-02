import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Logo from "../../../img/logo.webp";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      secret: process.env.NEXTAUTH_PUBLIC_SECRET
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ session, token, user }) {
      session.user.username = session.user.name.toLowerCase(),

      session.user.uid = token.sub;
      return session;
    }
  }
})