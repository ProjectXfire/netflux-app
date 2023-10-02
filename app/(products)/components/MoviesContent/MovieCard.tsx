'use client';

import NextImage from 'next/image';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import styles from './MoviesContent.module.css';
import { type IMovie } from '../../types';
import { removeFavorite, setFavorite } from '../../services';
import { AiFillPlayCircle } from 'react-icons/ai';
import { MdFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';
import { Button } from '@nextui-org/react';

interface Props {
  movie: IMovie;
  favoritesMoviesIds: string[];
  sessionId: string;
}

function MovieCard({ movie, favoritesMoviesIds, sessionId }: Props): JSX.Element {
  const router = useRouter();
  const isFavorite = favoritesMoviesIds.includes(movie.id);

  const handleFavorite = async (): Promise<void> => {
    if (isFavorite) {
      const { successfulMessage } = await removeFavorite(movie.id, sessionId);
      if (successfulMessage !== null) {
        toast.success('Removed from favorites');
        router.refresh();
      }
    } else {
      const { successfulMessage } = await setFavorite(movie.id, sessionId);
      if (successfulMessage !== null) {
        toast.success('Added to favorites');
        router.refresh();
      }
    }
  };

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
          <Button type='button' size='sm' isIconOnly color='primary'>
            <AiFillPlayCircle size={25} />
          </Button>
          <Button
            type='button'
            size='sm'
            isIconOnly
            color='primary'
            onClick={() => {
              void handleFavorite();
            }}
          >
            {isFavorite ? <MdFavorite size={25} /> : <MdOutlineFavoriteBorder size={25} />}
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
