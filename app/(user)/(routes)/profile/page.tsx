import { redirect } from 'next/navigation';
import getUserInfoSession from '@/app/(shared)/libs/serverAuth';
import { Profiles } from '../../components';

async function ProfilePage(): Promise<JSX.Element> {
  const session = await getUserInfoSession();

  if (session === null) redirect('/auth');

  return (
    <section>
      <Profiles session={session} />
    </section>
  );
}
export default ProfilePage;
