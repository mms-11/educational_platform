import bcrypt from 'bcryptjs';
import type { User, Student, Class, ClassAssessment, UpcomingAssessment } from '../types';

// Hash password helper
const hashPassword = (password: string): string => {
  return bcrypt.hashSync(password, 10);
};

// Mock Users
export const users: User[] = [
  {
    id: '1',
    name: 'Professor Silva',
    email: 'professor@teste.com',
    password: hashPassword('senha123'),
    role: 'professor',
  },
  {
    id: '2',
    name: 'Administrador',
    email: 'admin@teste.com',
    password: hashPassword('admin123'),
    role: 'admin',
  },
];

// Mock Students
export const students: Student[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@email.com',
    classId: '1',
    status: 'active',
    enrollmentDate: '2024-01-15',
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria@email.com',
    classId: '1',
    status: 'active',
    enrollmentDate: '2024-01-15',
  },
  {
    id: '3',
    name: 'Pedro Oliveira',
    email: 'pedro@email.com',
    classId: '2',
    status: 'active',
    enrollmentDate: '2024-02-01',
  },
  {
    id: '4',
    name: 'Ana Costa',
    email: 'ana@email.com',
    classId: '2',
    status: 'inactive',
    enrollmentDate: '2024-02-01',
  },
  {
    id: '5',
    name: 'Carlos Mendes',
    email: 'carlos@email.com',
    classId: '3',
    status: 'active',
    enrollmentDate: '2024-03-10',
  },
];

// Mock Classes
export const classes: Class[] = [
  {
    id: '1',
    name: 'Turma A - Matemática',
    maxCapacity: 30,
    studentIds: ['1', '2'],
    createdAt: '2024-01-10',
  },
  {
    id: '2',
    name: 'Turma B - Português',
    maxCapacity: 25,
    studentIds: ['3', '4'],
    createdAt: '2024-01-25',
  },
  {
    id: '3',
    name: 'Turma C - Ciências',
    maxCapacity: 28,
    studentIds: ['5'],
    createdAt: '2024-03-05',
  },
];

// Mock Assessments
export const assessments: ClassAssessment[] = [
  {
    id: '1',
    classId: '1',
    criteria: [
      { id: '1', name: 'Prova 1', weight: 30 },
      { id: '2', name: 'Prova 2', weight: 30 },
      { id: '3', name: 'Trabalhos', weight: 25 },
      { id: '4', name: 'Participação', weight: 15 },
    ],
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    classId: '2',
    criteria: [
      { id: '5', name: 'Redação', weight: 40 },
      { id: '6', name: 'Interpretação', weight: 35 },
      { id: '7', name: 'Gramática', weight: 25 },
    ],
    updatedAt: new Date().toISOString(),
  },
];

// Mock Upcoming Assessments
export const upcomingAssessments: UpcomingAssessment[] = [
  {
    id: '1',
    title: 'Prova de Matemática - Álgebra',
    className: 'Turma A - Matemática',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    type: 'Prova',
  },
  {
    id: '2',
    title: 'Trabalho de Português - Redação',
    className: 'Turma B - Português',
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
    type: 'Trabalho',
  },
  {
    id: '3',
    title: 'Prova de Ciências - Biologia',
    className: 'Turma C - Ciências',
    date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days from now
    type: 'Prova',
  },
];
