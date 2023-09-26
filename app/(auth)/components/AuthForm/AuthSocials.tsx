'use client';

import { signIn } from 'next-auth/react';
import styles from './AuthForms.module.css';
import { Button } from '@nextui-org/button';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineGithub } from 'react-icons/ai';

function AuthSocials(): JSX.Element {
  const onGoogleSignIn = async (): Promise<void> => {
    await signIn('google', { callbackUrl: '/' });
  };
  const onGithubSignIn = async (): Promise<void> => {
    await signIn('github', { callbackUrl: '/' });
  };

  return (
    <div className={styles['auth-socials']}>
      <Button
        type='button'
        isIconOnly
        onClick={() => {
          void onGoogleSignIn();
        }}
      >
        <FcGoogle />
      </Button>
      <Button
        type='button'
        isIconOnly
        onClick={() => {
          void onGithubSignIn();
        }}
      >
        <AiOutlineGithub />
      </Button>
    </div>
  );
}
export default AuthSocials;
