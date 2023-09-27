import { redirect } from 'next/navigation';
import { LoadingProvider } from '@/app/(shared)/states';
import { AuthContainer, AuthForms, AuthNavbar } from '../../components';
import getUserInfoSession from '@/app/(shared)/libs/serverAuth';

async function AuthPage(): Promise<JSX.Element> {
  const session = await getUserInfoSession();

  if (session !== null) redirect('/profile');

  return (
    <AuthContainer>
      <AuthNavbar />
      <LoadingProvider>
        <AuthForms />
      </LoadingProvider>
    </AuthContainer>
  );
}
export default AuthPage;
