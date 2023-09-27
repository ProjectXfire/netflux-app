import { redirect } from 'next/navigation';
import getUserInfoSession from '../(shared)/libs/serverAuth';

export default async function Home(): Promise<JSX.Element> {
  const session = await getUserInfoSession();

  if (session === null) redirect('/auth');

  return (
    <main>
      <h1>Netflux</h1>
    </main>
  );
}
