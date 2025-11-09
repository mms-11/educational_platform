export type ClassStatus = 'active' | 'inactive';

export interface Class {
  id: string;
  name: string;
  capacity: number;
  currentStudents: number;
  schedule?: string;
  status: ClassStatus;
  createdAt: string;
}

export interface CreateClassDto {
  name: string;
  capacity: number;
  schedule?: string;
  status?: ClassStatus;
}

export interface UpdateClassDto {
  name?: string;
  capacity?: number;
  schedule?: string;
  status?: ClassStatus;
}

export interface ClassFilters {
  search?: string;
  status?: ClassStatus;
}

export interface AssignStudentToClassDto {
  classId: string;
  studentId: string;
}
