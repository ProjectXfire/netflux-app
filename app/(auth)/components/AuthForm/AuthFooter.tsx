import styles from './AuthForms.module.css';

interface Props {
  text: string;
  actionText: string;
  action: () => void;
}

function AuthFooter({ text, actionText, action }: Props): JSX.Element {
  return (
    <footer className={styles['auth-footer']}>
      <p>{text}</p>
      <button type='button' onClick={action}>
        {actionText}
      </button>
    </footer>
  );
}
export default AuthFooter;
