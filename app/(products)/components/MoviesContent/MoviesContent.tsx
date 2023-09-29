'use client';

import Slider, { type Settings } from 'react-slick';
import styles from './MoviesContent.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { type IMovie } from '../../types';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Title } from '@/app/(shared)/components';
import { MovieCard } from '..';

interface Props {
  title: string;
  movies: IMovie[];
}

const settings: Settings = {
  lazyLoad: 'progressive',
  infinite: false,
  slidesToShow: 8,
  slidesToScroll: 1,
  speed: 500,
  nextArrow: <IoIosArrowForward color='white' />,
  prevArrow: <IoIosArrowBack color='white' />,
  responsive: [
    {
      breakpoint: 1240,
      settings: {
        slidesToShow: 5
      }
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 425,
      settings: {
        slidesToShow: 1
      }
    }
  ]
};

function MoviesContent({ movies, title }: Props): JSX.Element {
  return (
    <div className={styles['movies-content']}>
      <Title text={title} size='small' />
      <Slider {...settings}>
        {movies.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </Slider>
    </div>
  );
}
export default MoviesContent;
