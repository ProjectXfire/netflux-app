'use client';

import styles from './AuthForms.module.css';
import { Button } from '@nextui-org/button';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineGithub } from 'react-icons/ai';

function AuthSocials(): JSX.Element {
  const onGoogleSignIn = (): void => {};
  const onGithubSignIn = (): void => {};

  return (
    <div className={styles['auth-socials']}>
      <Button type='button' isIconOnly onClick={onGoogleSignIn}>
        <FcGoogle />
      </Button>
      <Button type='button' isIconOnly onClick={onGithubSignIn}>
        <AiOutlineGithub />
      </Button>
    </div>
  );
}
export default AuthSocials;
