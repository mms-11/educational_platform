export interface DashboardStats {
  totalStudents: number;
  totalClasses: number;
  activeStudents: number;    
  inactiveStudents: number;  
  activeAssessments: number;
  averageGrade: number;
  trends: {
    students: number;
    classes: number;
    assessments: number;
    grades: number;
  };
}

export interface UpcomingAssessment {
  id: string;
  title: string;           
  className: string;
  subject: string;
  date: string;
  type: string;            
  studentsCount: number;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface RecentActivity {
  id: string;
  type: 'student_enrolled' | 'assessment_created' | 'class_created' | 'grade_updated';
  description: string;
  timestamp: string;
}

export interface ClassPerformance {
  classId: string;
  className: string;
  averageGrade: number;
  studentsCount: number;
  assessmentsCompleted: number;
}
