import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const menuItems = [
    {
      path: '/dashboard',
      icon: '📊',
      label: 'Dashboard',
    },
    {
      path: '/students',
      icon: '👥',
      label: 'Alunos',
    },
    {
      path: '/classes',
      icon: '🎓',
      label: 'Turmas',
    },
    {
      path: '/assessments',
      icon: '📝',
      label: 'Avaliações',
    },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <h2>📚 Portal Professor</h2>
      </div>

      <nav className={styles.nav}>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
            }
          >
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.label}>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
