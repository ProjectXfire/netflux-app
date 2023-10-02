import { redirect } from 'next/navigation';
import getUserInfoSession from '@/app/(shared)/libs/serverAuth';
import { getMovie } from '../../../services';
import { MovieHeader, MovieVideo } from '@/app/(products)/components';

interface IParams {
  movieId: string;
}

async function MoviePage({ params }: { params: IParams }): Promise<JSX.Element> {
  const session = await getUserInfoSession();
  if (session === null) redirect('/auth');
  const { data } = await getMovie(params.movieId);
  if (data === null) redirect('/');

  return (
    <>
      <MovieHeader movieName={data.title} />
      <MovieVideo movie={data} />
    </>
  );
}
export default MoviePage;
