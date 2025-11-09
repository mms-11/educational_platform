import { Request, Response } from 'express';

export const dashboardController = {
  // GET /api/dashboard/stats
  getStats: async (req: Request, res: Response) => {
    try {
      const stats = {
        totalStudents: 156,
        totalClasses: 8,
        activeStudents: 142,      
        inactiveStudents: 14,     
        activeAssessments: 12,
        averageGrade: 7.8,
        trends: {
          students: +12,
          classes: +2,
          assessments: +3,
          grades: +0.3,
        },
      };

      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar estatísticas' });
    }
  },

  // GET /api/dashboard/upcoming-assessments
  getUpcomingAssessments: async (req: Request, res: Response) => {
    try {
      const upcomingAssessments = [
        {
          id: '1',
          title: 'Prova de Matemática',        // ← ADICIONE
          className: 'Turma A - Manhã',
          subject: 'Matemática',
          date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
          type: 'Prova',                       // ← ADICIONE
          studentsCount: 28,
          status: 'pending' as const,
        },
        {
          id: '2',
          title: 'Trabalho de Português',     // ← ADICIONE
          className: 'Turma B - Tarde',
          subject: 'Português',
          date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
          type: 'Trabalho',                    // ← ADICIONE
          studentsCount: 25,
          status: 'pending' as const,
        },
        {
          id: '3',
          title: 'Seminário de História',     // ← ADICIONE
          className: 'Turma C - Noite',
          subject: 'História',
          date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          type: 'Seminário',                   // ← ADICIONE
          studentsCount: 20,
          status: 'pending' as const,
        },
      ];

      res.json(upcomingAssessments);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar avaliações' });
    }
  },

  // GET /api/dashboard/recent-activities
  getRecentActivities: async (req: Request, res: Response) => {
    try {
      const activities = [
        {
          id: '1',
          type: 'student_enrolled',
          description: 'João Silva foi matriculado na Turma A',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: '2',
          type: 'assessment_created',
          description: 'Nova avaliação criada para Turma B',
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: '3',
          type: 'class_created',
          description: 'Turma D - Integral foi criada',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        },
      ];

      res.json(activities);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar atividades' });
    }
  },

  // GET /api/dashboard/performance
  getPerformance: async (req: Request, res: Response) => {
    try {
      const performance = [
        {
          classId: '1',
          className: 'Turma A - Manhã',
          averageGrade: 8.2,
          studentsCount: 28,
          assessmentsCompleted: 15,
        },
        {
          classId: '2',
          className: 'Turma B - Tarde',
          averageGrade: 7.8,
          studentsCount: 25,
          assessmentsCompleted: 12,
        },
        {
          classId: '3',
          className: 'Turma C - Noite',
          averageGrade: 7.5,
          studentsCount: 20,
          assessmentsCompleted: 10,
        },
      ];

      res.json(performance);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar desempenho' });
    }
  },
};
