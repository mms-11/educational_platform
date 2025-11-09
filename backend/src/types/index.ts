export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // Hashed
  role: 'professor' | 'admin';
  avatar?: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  classId: string;
  status: 'active' | 'inactive';
  enrollmentDate: string;
  avatar?: string;
}

export interface Class {
  id: string;
  name: string;
  maxCapacity: number;
  studentIds: string[];
  createdAt: string;
}

export interface AssessmentCriteria {
  id: string;
  name: string;
  weight: number;
}

export interface ClassAssessment {
  id: string;
  classId: string;
  criteria: AssessmentCriteria[];
  updatedAt: string;
}

export interface UpcomingAssessment {
  id: string;
  title: string;
  className: string;
  date: string;
  type: string;
}
