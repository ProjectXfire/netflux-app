import styles from './AuthContainer.module.css';

interface Props {
  children: React.ReactNode;
}

function AuthContainer({ children }: Props): JSX.Element {
  return (
    <div className={styles['auth-container']}>
      <div className={styles['auth-background']}>{children}</div>
    </div>
  );
}
export default AuthContainer;
