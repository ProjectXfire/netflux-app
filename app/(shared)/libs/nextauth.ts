import { type AuthOptions } from 'next-auth';
import bcrypt from 'bcrypt';
import { PrismaAdapter } from '@auth/prisma-adapter';
import Credentials from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import client from './prismadb';

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(client),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID ?? '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? ''
    }),
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials, req) {
        console.log(credentials);
        if (credentials === undefined) throw new Error('Invalid credentials');
        const { email, password } = credentials;
        if (email === '' || password === '') throw new Error('Invalid credentials');
        const user = await client.user.findUnique({ where: { email: credentials.email } });
        if (user === null) throw new Error('Invalid credentials');
        if (user.hashedPassword === null) throw new Error('Invalid credentials');
        const isValidPassword = await bcrypt.compare(credentials.password, user.hashedPassword);
        if (!isValidPassword) throw new Error('Invalid credentials');
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          favoriteIds: user.favoriteIds
        };
      }
    })
  ],
  pages: { signIn: '/' },
  debug: process.env.NODE_ENV === 'development',
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET
};

export default authOptions;
