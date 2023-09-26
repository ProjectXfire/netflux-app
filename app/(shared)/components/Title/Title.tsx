import styles from './Title.module.css';

type Size = 'small' | 'medium' | 'large';

interface Props {
  text: string;
  size: Size;
  color?: string;
  center?: boolean;
}

function Title({ text, size, color, center }: Props): JSX.Element {
  return (
    <h1
      className={`${styles[`size-${size}`]} ${center !== undefined ? styles.center : ''}`}
      style={{ color }}
    >
      {text}
    </h1>
  );
}
export default Title;
