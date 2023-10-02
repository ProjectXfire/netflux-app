import { redirect } from 'next/navigation';
import getUserInfoSession from '../../(shared)/libs/serverAuth';
import { getFavorites, getMovies, getRandomMovie } from '../services';
import { Hero, MoviesContent, Navbar } from '../components';

export default async function Home(): Promise<JSX.Element> {
  const session = await getUserInfoSession();

  if (session === null) redirect('/auth');

  const { data: movies } = await getMovies();
  const { data: randomMovie } = await getRandomMovie();
  const { data: favoritesMovies } = await getFavorites(session);

  return (
    <section>
      <Navbar session={session} />
      <Hero randomMovie={randomMovie} />
      <MoviesContent
        movies={movies}
        favoritesMoviesIds={session.favoriteIds}
        sessionId={session.id}
        title='Trending Now'
      />
      <MoviesContent
        movies={favoritesMovies}
        favoritesMoviesIds={session.favoriteIds}
        sessionId={session.id}
        title='My List'
      />
    </section>
  );
}
