import NextAuth, { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import GoogleProvider from 'next-auth/providers/google';

if (!process.env.GOOGLE_ID || !process.env.GOOGLE_SECRET) {
  throw new Error(
    'The GOOGLE_ID and GOOGLE_SECRET environment variables must be set'
  );
}

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
});
