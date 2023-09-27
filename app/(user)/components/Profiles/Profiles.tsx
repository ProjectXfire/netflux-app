'use client';

import NextImage from 'next/image';
import styles from './Profiles.module.css';
import { type IUser } from '../../types';
import { Title } from '@/app/(shared)/components';
import DefaultBlue from '@/public/images/default-blue.png';
import { useRouter } from 'next/navigation';

interface Props {
  session: IUser;
}

function Profiles({ session }: Props): JSX.Element {
  const router = useRouter();

  return (
    <section className={styles['profile-container']}>
      <Title center size='medium' text='Who is watching?' />
      <div className={styles.profiles}>
        <button
          type='button'
          onClick={() => {
            router.push('/');
          }}
        >
          <NextImage className={styles['profiles-img']} src={DefaultBlue} alt='profile' />
          <span>{session.name}</span>
        </button>
      </div>
    </section>
  );
}
export default Profiles;
