import { type IResponse } from '@/app/(shared)/types';
import client from '../../(shared)/libs/prismadb';
import { type IUser } from '@/app/(user)/types';
import { type IMovie } from '../types';

export async function getFavorites(session: IUser): Promise<IResponse<IMovie[]>> {
  try {
    const favoritesMovies = await client.movie.findMany({
      where: { id: { in: session.favoriteIds } }
    });
    return {
      data: favoritesMovies,
      errorMessage: null,
      successfulMessage: 'User movies favorites loaded'
    };
  } catch (error) {
    return {
      data: [],
      successfulMessage: null,
      errorMessage: 'Something went wrong!'
    };
  }
}
