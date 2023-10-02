import axios from 'axios';
import { type IResponse } from '@/app/(shared)/types';
import { type IUser } from '@/app/(user)/types';
import { handleErrorMessage } from '@/app/(shared)/helpers';

export async function setFavorite(
  movieId: string,
  sessionId: string
): Promise<IResponse<IUser | null>> {
  try {
    const res = await axios.post<IResponse<IUser | null>>('/api/favorites', { movieId, sessionId });
    const { data, successfulMessage } = res.data;
    return {
      data,
      successfulMessage,
      errorMessage: null
    };
  } catch (error) {
    const errorMessage = handleErrorMessage(error);
    return {
      data: null,
      successfulMessage: null,
      errorMessage
    };
  }
}

export async function removeFavorite(
  movieId: string,
  sessionId: string
): Promise<IResponse<IUser | null>> {
  try {
    const res = await axios.delete<IResponse<IUser | null>>(`/api/favorites/${movieId}`, {
      data: { sessionId }
    });
    const { data, successfulMessage } = res.data;
    return {
      data,
      successfulMessage,
      errorMessage: null
    };
  } catch (error) {
    const errorMessage = handleErrorMessage(error);
    return {
      data: null,
      successfulMessage: null,
      errorMessage
    };
  }
}
