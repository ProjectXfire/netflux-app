import { type NextRequest, NextResponse } from 'next/server';
import { type Movie } from '@prisma/client';
import { type IResponse } from '@/app/(shared)/types';
import client from '@/app/(shared)/libs/prismadb';

export async function GET(
  req: NextRequest,
  { params }: { params: { movieId: string } }
): Promise<NextResponse<IResponse<Partial<Movie> | null>>> {
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
    const movie = await client.movie.findUnique({ where: { id: movieId } });
    return NextResponse.json(
      { data: movie, successfulMessage: 'Movie loaded', errorMessage: null },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { data: null, successfulMessage: null, errorMessage: 'Something went wrong!' },
      { status: 500 }
    );
  }
}
