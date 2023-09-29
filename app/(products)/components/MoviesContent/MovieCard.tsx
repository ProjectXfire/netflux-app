'use client';

import NextImage from 'next/image';
import styles from './MoviesContent.module.css';
import { type IMovie } from '../../types';
import { AiFillPlayCircle } from 'react-icons/ai';
import { Button } from '@nextui-org/react';

interface Props {
  movie: IMovie;
}

function MovieCard({ movie }: Props): JSX.Element {
  return (
    <div className={styles['movie-item-container']}>
      <article className={styles['movie-item-static']}>
        <NextImage src={movie.thumbnailUrl} fill alt={movie.title} />
      </article>
      <article className={styles['movie-item-hover']}>
        <div className={styles['movie-item-hover__img']}>
          <NextImage src={movie.thumbnailUrl} fill alt={movie.title} />
        </div>
        <div className={styles['movie-item-hover__content']}>
          <Button size='md' isIconOnly color='primary'>
            <AiFillPlayCircle size={35} />
          </Button>
          <div>
            <p>{movie.genre}</p>
            <p>{movie.duration}</p>
          </div>
        </div>
      </article>
    </div>
  );
}
export default MovieCard;
