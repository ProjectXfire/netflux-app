import axios from 'axios';
import { signIn } from 'next-auth/react';
import { type IResponse } from '@/app/(shared)/types';
import { type ILoginDto, type ICreateUserDto } from '../types';
import { type IUser } from '@/app/(user)/types';
import { handleErrorMessage } from '@/app/(shared)/helpers';

export async function createUser(payload: ICreateUserDto): Promise<IResponse<null>> {
  try {
    const res = await axios.post<IResponse<IUser | null>>('/api/register', payload);
    const { successfulMessage } = res.data;
    const { errorMessage } = await authUser({ email: payload.email, password: payload.password });
    if (errorMessage !== null) throw new Error(errorMessage);
    return {
      data: null,
      successfulMessage,
      errorMessage: null
    };
  } catch (error: any) {
    const errorMessage = handleErrorMessage(error);
    return {
      data: null,
      successfulMessage: null,
      errorMessage
    };
  }
}

export async function authUser(payload: ILoginDto): Promise<IResponse<null>> {
  try {
    const res = await signIn('credentials', { redirect: false, callbackUrl: '/', ...payload });
    if (res === undefined) throw new Error('Invalid credentials');
    if (res.error !== null) throw new Error(res.error);
    return {
      data: null,
      successfulMessage: 'Login successful',
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
