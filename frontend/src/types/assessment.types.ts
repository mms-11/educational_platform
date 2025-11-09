export type AssessmentStatus = 'pending' | 'completed' | 'cancelled';

export interface AssessmentCriteria {
  id: string;
  name: string;
  weight: number; // Percentage (0-100)
}

export interface Assessment {
  id: string;
  classId: string;
  className: string;
  title: string;
  description: string;
  date: string;
  criteria: AssessmentCriteria[];
  status: AssessmentStatus;
  createdAt: string;
}

export interface CreateAssessmentDto {
  classId: string;
  className: string;
  title: string;
  description?: string;
  date?: string;
  criteria: Omit<AssessmentCriteria, 'id'>[];
  status?: AssessmentStatus;
}

export interface UpdateAssessmentDto {
  classId?: string;
  className?: string;
  title?: string;
  description?: string;
  date?: string;
  criteria?: AssessmentCriteria[];
  status?: AssessmentStatus;
}

export interface AssessmentFilters {
  classId?: string;
  status?: AssessmentStatus;
}

export interface ClassAssessment {
  id: string;
  classId: string;
  className?: string;
  criteria: AssessmentCriteria[];
  totalWeight: number; // Should always be 100
  updatedAt: string;
}

export interface CreateAssessmentCriteriaDto {
  name: string;
  weight: number;
}

export interface UpdateClassAssessmentDto {
  classId: string;
  criteria: CreateAssessmentCriteriaDto[];
}

export interface AssessmentValidation {
  isValid: boolean;
  totalWeight: number;
  errors: string[];
}
