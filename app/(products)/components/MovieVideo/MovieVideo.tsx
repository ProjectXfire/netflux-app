import styles from './MovieVideo.module.css';
import { type IMovie } from '../../types';

interface Props {
  movie: IMovie;
}

function MovieVideo({ movie }: Props): JSX.Element {
  return <video className={styles['movie-video']} autoPlay controls src={movie.videoUrl}></video>;
}
export default MovieVideo;
