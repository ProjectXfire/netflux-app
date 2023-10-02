'use client';

import { useRouter } from 'next/navigation';
import styles from './Hero.module.css';
import { type IMovie } from '../../types';
import { BsInfoCircle, BsFillPlayFill } from 'react-icons/bs';
import { Button } from '@nextui-org/button';

interface Props {
  randomMovie: IMovie | null;
}

function Hero({ randomMovie }: Props): JSX.Element {
  const router = useRouter();

  const playVideo = (): void => {
    router.push(`/watch/${randomMovie?.id}`);
  };

  return (
    <div className={styles.hero}>
      <video
        className={styles.hero__video}
        autoPlay
        muted
        loop
        src={randomMovie?.videoUrl}
        poster={randomMovie?.thumbnailUrl}
      ></video>
      <div className={styles.hero__detail}>
        <p>{randomMovie?.title}</p>
        <p>{randomMovie?.description}</p>
        <div className={styles['hero__detail-actions']}>
          <Button
            type='button'
            variant='solid'
            className='bg-opacity-70 bg-white'
            startContent={<BsFillPlayFill size={20} />}
            onClick={playVideo}
          >
            Play
          </Button>
          <Button
            type='button'
            variant='solid'
            className='bg-opacity-70'
            startContent={<BsInfoCircle size={20} />}
            color='primary'
          >
            More info
          </Button>
        </div>
      </div>
    </div>
  );
}
export default Hero;
