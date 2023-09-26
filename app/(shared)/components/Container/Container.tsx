import styles from './Container.module.css';

interface Props {
  children: React.ReactNode;
}

function Container({ children }: Props): JSX.Element {
  return <section className={styles.container}>{children}</section>;
}
export default Container;
