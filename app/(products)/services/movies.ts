import { type IResponse } from '@/app/(shared)/types';
import { type Movie } from '@prisma/client';
import client from '../../(shared)/libs/prismadb';

export async function getMovies(query?: string): Promise<IResponse<Movie[]>> {
  try {
    const movies = await client.movie.findMany();
    return {
      data: movies,
      errorMessage: null,
      successfulMessage: 'Movies successfully loaded'
    };
  } catch (error) {
    return {
      data: [],
      errorMessage: 'Something went wrong!',
      successfulMessage: null
    };
  }
}

export async function getRandomMovie(): Promise<IResponse<Movie | null>> {
  try {
    const moviesCount = await client.movie.count();
    const randomIndex = Math.floor(Math.random() * moviesCount);
    const randomMovie = await client.movie.findMany({ take: 1, skip: randomIndex });
    return {
      data: randomMovie[0],
      successfulMessage: 'Random movie succesfully loaded',
      errorMessage: null
    };
  } catch (error) {
    return {
      data: null,
      successfulMessage: null,
      errorMessage: 'Something went wrong!'
    };
  }
}
