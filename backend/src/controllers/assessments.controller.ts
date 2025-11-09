import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

// Mock data de avaliações
let assessments = [
  {
    id: '1',
    classId: '1',
    className: 'Turma A - Manhã',
    title: 'Prova de Matemática',
    description: 'Avaliação do 1º Bimestre',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    criteria: [
      { id: '1', name: 'Conhecimento', weight: 40 },
      { id: '2', name: 'Participação', weight: 30 },
      { id: '3', name: 'Exercícios', weight: 30 },
    ],
    status: 'pending' as const,
    createdAt: new Date().toISOString(),
  },
];

export const assessmentController = {
  // GET /api/assessments
  getAll: async (req: Request, res: Response) => {
    try {
      const { classId, status } = req.query;

      let filtered = [...assessments];

      if (classId) {
        filtered = filtered.filter((a) => a.classId === classId);
      }

      if (status) {
        filtered = filtered.filter((a) => a.status === status);
      }

      res.json(filtered);
    } catch (error) {
      console.error('Error in getAll:', error);
      res.status(500).json({ message: 'Erro ao buscar avaliações' });
    }
  },

  // GET /api/assessments/:id
  getById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const assessment = assessments.find((a) => a.id === id);

      if (!assessment) {
        return res.status(404).json({ message: 'Avaliação não encontrada' });
      }

      res.json(assessment);
    } catch (error) {
      console.error('Error in getById:', error);
      res.status(500).json({ message: 'Erro ao buscar avaliação' });
    }
  },

  // POST /api/assessments
  create: async (req: Request, res: Response) => {
    try {
      const { classId, className, title, description, date, criteria, status } = req.body;

      // Validação: soma dos pesos deve ser 100
      const totalWeight = criteria.reduce((sum: number, c: any) => sum + c.weight, 0);
      if (totalWeight !== 100) {
        return res.status(400).json({ 
          message: `A soma dos pesos deve ser 100%. Atual: ${totalWeight}%` 
        });
      }

      // Validação: campos obrigatórios
      if (!classId || !title || !criteria || criteria.length === 0) {
        return res.status(400).json({ 
          message: 'Campos obrigatórios: classId, title, criteria' 
        });
      }

      const newAssessment = {
        id: uuidv4(),
        classId,
        className,
        title,
        description: description || '',
        date: date || new Date().toISOString(),
        criteria: criteria.map((c: any) => ({
          id: uuidv4(),
          name: c.name,
          weight: Number(c.weight),
        })),
        status: status || 'pending',
        createdAt: new Date().toISOString(),
      };

      assessments.push(newAssessment);
      res.status(201).json(newAssessment);
    } catch (error) {
      console.error('Error in create:', error);
      res.status(500).json({ message: 'Erro ao criar avaliação' });
    }
  },

  // PUT /api/assessments/:id
  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { classId, className, title, description, date, criteria, status } = req.body;

      const index = assessments.findIndex((a) => a.id === id);

      if (index === -1) {
        return res.status(404).json({ message: 'Avaliação não encontrada' });
      }

      // Validação: soma dos pesos deve ser 100
      if (criteria) {
        const totalWeight = criteria.reduce((sum: number, c: any) => sum + c.weight, 0);
        if (totalWeight !== 100) {
          return res.status(400).json({ 
            message: `A soma dos pesos deve ser 100%. Atual: ${totalWeight}%` 
          });
        }
      }

      assessments[index] = {
        ...assessments[index],
        classId: classId || assessments[index].classId,
        className: className || assessments[index].className,
        title: title || assessments[index].title,
        description: description !== undefined ? description : assessments[index].description,
        date: date || assessments[index].date,
        criteria: criteria ? criteria.map((c: any) => ({
          id: c.id || uuidv4(),
          name: c.name,
          weight: Number(c.weight),
        })) : assessments[index].criteria,
        status: status || assessments[index].status,
      };

      res.json(assessments[index]);
    } catch (error) {
      console.error('Error in update:', error);
      res.status(500).json({ message: 'Erro ao atualizar avaliação' });
    }
  },

  // DELETE /api/assessments/:id
  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const index = assessments.findIndex((a) => a.id === id);

      if (index === -1) {
        return res.status(404).json({ message: 'Avaliação não encontrada' });
      }

      assessments.splice(index, 1);
      res.status(204).send();
    } catch (error) {
      console.error('Error in delete:', error);
      res.status(500).json({ message: 'Erro ao deletar avaliação' });
    }
  },
};