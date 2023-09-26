import { AuthContainer, AuthForms, AuthNavbar } from '../../components';

function AuthPage(): JSX.Element {
  return (
    <AuthContainer>
      <AuthNavbar />
      <AuthForms />
    </AuthContainer>
  );
}
export default AuthPage;
