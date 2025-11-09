import { Response } from 'express';
import { students, classes } from '@/data/mockData';
import type { AuthRequest } from '@/middlewares';
import type { Student } from '@/types';

let studentIdCounter = students.length + 1;

export const studentController = {
  // GET /api/students
  getAll: async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { search, classId, status } = req.query;

      let filteredStudents = [...students];

      if (search) {
        const searchLower = (search as string).toLowerCase();
        filteredStudents = filteredStudents.filter(
          (s) =>
            s.name.toLowerCase().includes(searchLower) ||
            s.email.toLowerCase().includes(searchLower)
        );
      }

      if (classId) {
        filteredStudents = filteredStudents.filter((s) => s.classId === classId);
      }

      if (status) {
        filteredStudents = filteredStudents.filter((s) => s.status === status);
      }

      // Add className to response
      const studentsWithClassName = filteredStudents.map((student) => {
        const studentClass = classes.find((c) => c.id === student.classId);
        return {
          ...student,
          className: studentClass?.name || 'Sem turma',
        };
      });

      res.json(studentsWithClassName);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar alunos' });
    }
  },

  // GET /api/students/:id
  getById: async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const student = students.find((s) => s.id === id);

      if (!student) {
        res.status(404).json({ message: 'Aluno não encontrado' });
        return;
      }

      const studentClass = classes.find((c) => c.id === student.classId);

      res.json({
        ...student,
        className: studentClass?.name || 'Sem turma',
      });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar aluno' });
    }
  },

  // POST /api/students
  create: async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { name, email, classId, status } = req.body;

      if (!name || !email || !classId) {
        res.status(400).json({ message: 'Dados incompletos' });
        return;
      }

      const newStudent: Student = {
        id: String(studentIdCounter++),
        name,
        email,
        classId,
        status: status || 'active',
        enrollmentDate: new Date().toISOString(),
      };

      students.push(newStudent);

      // Update class
      const studentClass = classes.find((c) => c.id === classId);
      if (studentClass) {
        studentClass.studentIds.push(newStudent.id);
      }

      res.status(201).json({
        ...newStudent,
        className: studentClass?.name || 'Sem turma',
      });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar aluno' });
    }
  },

  // PUT /api/students/:id
  update: async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { name, email, classId, status } = req.body;

      const studentIndex = students.findIndex((s) => s.id === id);

      if (studentIndex === -1) {
        res.status(404).json({ message: 'Aluno não encontrado' });
        return;
      }

      const oldClassId = students[studentIndex].classId;

      students[studentIndex] = {
        ...students[studentIndex],
        ...(name && { name }),
        ...(email && { email }),
        ...(classId && { classId }),
        ...(status && { status }),
      };

      // Update class associations if classId changed
      if (classId && classId !== oldClassId) {
        const oldClass = classes.find((c) => c.id === oldClassId);
        if (oldClass) {
          oldClass.studentIds = oldClass.studentIds.filter((sid) => sid !== id);
        }

        const newClass = classes.find((c) => c.id === classId);
        if (newClass && !newClass.studentIds.includes(id)) {
          newClass.studentIds.push(id);
        }
      }

      const studentClass = classes.find((c) => c.id === students[studentIndex].classId);

      res.json({
        ...students[studentIndex],
        className: studentClass?.name || 'Sem turma',
      });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar aluno' });
    }
  },

  // DELETE /api/students/:id
  delete: async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const studentIndex = students.findIndex((s) => s.id === id);

      if (studentIndex === -1) {
        res.status(404).json({ message: 'Aluno não encontrado' });
        return;
      }

      const student = students[studentIndex];

      // Remove from class
      const studentClass = classes.find((c) => c.id === student.classId);
      if (studentClass) {
        studentClass.studentIds = studentClass.studentIds.filter((sid) => sid !== id);
      }

      students.splice(studentIndex, 1);

      res.json({ message: 'Aluno removido com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao remover aluno' });
    }
  },
};
