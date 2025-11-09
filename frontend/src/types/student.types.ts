export type StudentStatus = 'active' | 'inactive';

export interface Student {
  id: string;
  name: string;
  email: string;
  classId: string;
  className?: string;
  status: StudentStatus;
  enrollmentDate: string;
  avatar?: string;
}

export interface CreateStudentDto {
  name: string;
  email: string;
  classId: string;
  status: StudentStatus;
}


export interface UpdateStudentDto {
  name?: string;
  email?: string;
  classId?: string;
  status?: StudentStatus;
}

export interface StudentFilters {
  search?: string;
  classId?: string;
  status?: StudentStatus;
}
