import NextImage from 'next/image';
import styles from './AuthNavbar.module.css';

function AuthNavbar(): JSX.Element {
  return (
    <nav className={styles.navbar}>
      <NextImage width={150} height={50} src='/images/logo.png' alt='logo' />
    </nav>
  );
}
export default AuthNavbar;
