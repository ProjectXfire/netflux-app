import { type NextRequest, NextResponse } from 'next/server';
import { type User } from '@prisma/client';
import { type IResponse } from '@/app/(shared)/types';
import client from '@/app/(shared)/libs/prismadb';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { movieId: string } }
): Promise<NextResponse<IResponse<Partial<User> | null>>> {
  try {
    const body = await req.json();
    const { movieId } = params;
    const { sessionId } = body;
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

    const userFavIds = await client.user.findUnique({
      where: { id: sessionId },
      select: { favoriteIds: true }
    });
    if (userFavIds === null)
      return NextResponse.json(
        { data: null, successfulMessage: null, errorMessage: 'No user found' },
        { status: 400 }
      );
    const user = await client.user.update({
      where: { id: sessionId },
      data: { favoriteIds: { set: userFavIds.favoriteIds.filter((fav) => fav !== movieId) } },
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
