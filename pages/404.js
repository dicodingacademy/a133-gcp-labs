import Link from 'next/link';
import styles from './404.module.scss';

export default function NotFound() {
  return (
    <div className={styles.not_found}>
      <p>
        Your request is
        {' '}
        <b>not found</b>
      </p>
      <Link href="/">Back to Home</Link>
    </div>
  );
}
