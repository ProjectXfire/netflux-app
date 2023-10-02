import axios from 'axios';
import { type IResponse } from '@/app/(shared)/types';
import { type IMovie } from '../types';
import { handleErrorMessage } from '@/app/(shared)/helpers';

export async function getRandomMovie(movieId: string): Promise<IResponse<IMovie | null>> {
  try {
    const res = await axios.get<IResponse<IMovie | null>>(`/api/movies/${movieId}`);
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
