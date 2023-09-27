import { redirect } from 'next/navigation';
import getUserInfoSession from '../../(shared)/libs/serverAuth';
import { Navbar } from '../components';

export default async function Home(): Promise<JSX.Element> {
  const session = await getUserInfoSession();

  if (session === null) redirect('/auth');

  return (
    <section>
      <Navbar session={session} />
      <h1>Netflux</h1>
    </section>
  );
}
