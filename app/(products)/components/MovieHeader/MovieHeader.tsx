'use client';

import { useRouter } from 'next/navigation';
import styles from './MovieHeader.module.css';
import { IoIosArrowBack } from 'react-icons/io';
import { Button } from '@nextui-org/react';

interface Props {
  movieName: string;
}

function MovieHeader({ movieName }: Props): JSX.Element {
  const router = useRouter();

  const backAction = (): void => {
    router.back();
  };

  return (
    <header className={styles.header}>
      <Button
        type='button'
        className='rounded-full bg-blue-950'
        size='lg'
        isIconOnly
        color='danger'
        onClick={backAction}
      >
        <IoIosArrowBack size={40} />
      </Button>
      <p>
        Watching: <strong>{movieName}</strong>
      </p>
    </header>
  );
}
export default MovieHeader;
