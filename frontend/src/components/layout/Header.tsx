import { useAuth } from '@/contexts';
import styles from './Header.module.css';

export const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <h1>Portal do Professor</h1>
        </div>
        <div className={styles.userSection}>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{user?.name}</span>
            <span className={styles.userRole}>
              {user?.role === 'admin' ? 'Administrador' : 'Professor'}
            </span>
          </div>
          <button onClick={logout} className={styles.logoutButton}>
            Sair
          </button>
        </div>
      </div>
    </header>
  );
};
