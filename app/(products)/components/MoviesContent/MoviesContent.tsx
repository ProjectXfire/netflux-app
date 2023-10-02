'use client';

import styles from './MoviesContent.module.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { type IMovie } from '../../types';
import { carouselResponsive } from '@/app/(shared)/helpers';
import { Title } from '@/app/(shared)/components';
import { MovieCard } from '..';

interface Props {
  title: string;
  movies: IMovie[];
  favoritesMoviesIds: string[];
  sessionId: string;
}

function MoviesContent({ movies, title, favoritesMoviesIds, sessionId }: Props): JSX.Element {
  if (movies.length === 0) return <></>;

  return (
    <div className={styles['movies-content']}>
      <Title text={title} size='small' />
      <Carousel responsive={carouselResponsive}>
        {movies.map((m) => (
          <MovieCard
            key={m.id}
            movie={m}
            favoritesMoviesIds={favoritesMoviesIds}
            sessionId={sessionId}
          />
        ))}
      </Carousel>
    </div>
  );
}
export default MoviesContent;
