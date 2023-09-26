'use client';

import { useState } from 'react';
import styles from './AuthForms.module.css';
import { AuthFooter, AuthLogin, AuthRegister, AuthSocials } from '..';

type AuthSelected = 'login' | 'register';

function AuthForms(): JSX.Element {
  const [authSelected, setAuthSelected] = useState<AuthSelected>('login');

  const onChangeAuth = (type: AuthSelected): void => {
    setAuthSelected(type);
  };

  return (
    <section className={styles['auth-forms']}>
      <div className={styles['auth-forms__form']}>
        {authSelected === 'login' ? (
          <>
            <AuthLogin />
            <AuthSocials />
            <AuthFooter
              text='First time using Netflux?'
              actionText='Create an account'
              action={() => {
                onChangeAuth('register');
              }}
            />
          </>
        ) : (
          <>
            <AuthRegister />
            <AuthSocials />
            <AuthFooter
              text='Already have an account?'
              actionText='Click here'
              action={() => {
                onChangeAuth('login');
              }}
            />
          </>
        )}
      </div>
    </section>
  );
}
export default AuthForms;
