'use client';

import styles from './Hero.module.css';
import { type IMovie } from '../../types';
import { BsInfoCircle } from 'react-icons/bs';
import { Button } from '@nextui-org/button';

interface Props {
  randomMovie: IMovie | null;
}

function Hero({ randomMovie }: Props): JSX.Element {
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
        <div>
          <Button
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
