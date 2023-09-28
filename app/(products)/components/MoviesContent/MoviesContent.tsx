// import styles from './MoviesContent.module.css';
import { type IMovie } from '../../types';

interface Props {
  movies: IMovie[];
}

function MoviesContent({ movies }: Props): JSX.Element {
  return <div>MoviesContent</div>;
}
export default MoviesContent;
