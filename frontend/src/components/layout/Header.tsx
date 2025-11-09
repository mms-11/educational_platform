import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts';
import styles from './Header.module.css';

export const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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
          <button onClick={handleLogout} className={styles.logoutButton}>
            Sair
          </button>
        </div>
      </div>
    </header>
  );
};
