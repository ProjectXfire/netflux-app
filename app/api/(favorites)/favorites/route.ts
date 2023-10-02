import { type NextRequest, NextResponse } from 'next/server';
import { type Movie, type User } from '@prisma/client';
import { type IResponse } from '@/app/(shared)/types';
import client from '@/app/(shared)/libs/prismadb';

export async function GET(
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse<IResponse<Movie[]>>> {
  try {
    const body = await req.json();
    const { sessionId } = body;
    if (sessionId === undefined)
      return NextResponse.json(
        { data: [], successfulMessage: null, errorMessage: 'No user session id' },
        { status: 400 }
      );
    const user = await client.user.findUnique({
      where: { id: sessionId },
      select: { favoriteIds: true }
    });
    if (user === null)
      return NextResponse.json(
        { data: [], successfulMessage: null, errorMessage: 'Invalid user session' },
        { status: 400 }
      );
    const favoritesMovies = await client.movie.findMany({
      where: { id: { in: user.favoriteIds } }
    });
    return NextResponse.json(
      {
        data: favoritesMovies,
        successfulMessage: 'User favorites movies loaded',
        errorMessage: null
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { data: [], successfulMessage: null, errorMessage: 'Something went wrong!' },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse<IResponse<Partial<User> | null>>> {
  try {
    const body = await req.json();
    const { movieId, sessionId } = body;
    if (movieId === undefined || sessionId === undefined)
      return NextResponse.json(
        { data: null, successfulMessage: null, errorMessage: 'Invalid params' },
        { status: 400 }
      );
    const existMovie = await client.movie.findUnique({ where: { id: movieId } });
    if (existMovie === null)
      return NextResponse.json(
        { data: null, successfulMessage: null, errorMessage: 'No movie found' },
        { status: 400 }
      );
    const user = await client.user.update({
      where: { id: sessionId },
      data: { favoriteIds: { push: movieId } },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        favoriteIds: true
      }
    });
    return NextResponse.json(
      { data: user, successfulMessage: 'User favorites updated', errorMessage: null },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { data: null, successfulMessage: null, errorMessage: 'Something went wrong!' },
      { status: 500 }
    );
  }
}
