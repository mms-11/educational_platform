import { useEffect, useState } from 'react';
import { dashboardService } from '@/services';
import type { DashboardStats, UpcomingAssessment } from '@/types';
import styles from './DashboardPage.module.css';

const DashboardPage = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [assessments, setAssessments] = useState<UpcomingAssessment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [statsData, assessmentsData] = await Promise.all([
          dashboardService.getStats(),
          dashboardService.getUpcomingAssessments(),
        ]);
        setStats(statsData);
        setAssessments(assessmentsData);
      } catch (err) {
        setError('Erro ao carregar dados do dashboard');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div className={styles.loading}>Carregando...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Dashboard</h1>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>👥</div>
          <div className={styles.statInfo}>
            <h3>Total de Alunos</h3>
            <p className={styles.statValue}>{stats?.totalStudents || 0}</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>🎓</div>
          <div className={styles.statInfo}>
            <h3>Total de Turmas</h3>
            <p className={styles.statValue}>{stats?.totalClasses || 0}</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>✅</div>
          <div className={styles.statInfo}>
            <h3>Alunos Ativos</h3>
            <p className={styles.statValue}>{stats?.activeStudents || 0}</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>⏸️</div>
          <div className={styles.statInfo}>
            <h3>Alunos Inativos</h3>
            <p className={styles.statValue}>{stats?.inactiveStudents || 0}</p>
          </div>
        </div>
      </div>

      <div className={styles.assessmentsSection}>
        <h2>Próximas Avaliações</h2>
        {assessments.length === 0 ? (
          <p className={styles.emptyState}>Nenhuma avaliação próxima</p>
        ) : (
          <div className={styles.assessmentsList}>
            {assessments.map((assessment) => (
              <div key={assessment.id} className={styles.assessmentCard}>
                <h3>{assessment.title}</h3>
                <p>Turma: {assessment.className}</p>
                <p>Data: {new Date(assessment.date).toLocaleDateString('pt-BR')}</p>
                <p>Tipo: {assessment.type}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
