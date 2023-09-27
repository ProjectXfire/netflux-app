import { getServerSession, type Session } from 'next-auth';
import { type IUser } from '@/app/(user)/types';
import client from './prismadb';
import authOptions from './nextauth';

async function getSession(): Promise<Session | null> {
  return await getServerSession(authOptions);
}

async function getUserInfoSession(): Promise<IUser | null> {
  try {
    const session = await getSession();
    if (session?.user === undefined) return null;
    if (session.user.email === undefined || session.user.email === null) return null;
    const currentUser = await client.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        favoriteIds: true
      }
    });
    return currentUser;
  } catch (error) {
    return null;
  }
}

export default getUserInfoSession;
