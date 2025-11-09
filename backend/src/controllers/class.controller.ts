import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';


let classes = [
  {
    id: '1',
    name: 'Turma A - Manhã',
    capacity: 30,
    currentStudents: 0,
    schedule: 'Segunda a Sexta - 08:00 às 12:00',
    status: 'active' as const,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Turma B - Tarde',
    capacity: 25,
    currentStudents: 0,
    schedule: 'Segunda a Sexta - 13:00 às 17:00',
    status: 'active' as const,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Turma C - Noite',
    capacity: 20,
    currentStudents: 0,
    schedule: 'Segunda a Sexta - 18:00 às 22:00',
    status: 'active' as const,
    createdAt: new Date().toISOString(),
  },
];

export const classController = {
  // GET /api/classes
  getAll: async (req: Request, res: Response) => {
    try {
      const { search, status } = req.query;

      let filtered = [...classes];

      if (search) {
        filtered = filtered.filter((cls) =>
          cls.name.toLowerCase().includes((search as string).toLowerCase())
        );
      }

      if (status) {
        filtered = filtered.filter((cls) => cls.status === status);
      }

      res.json(filtered);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar turmas' });
    }
  },

  // GET /api/classes/:id
  getById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const cls = classes.find((c) => c.id === id);

      if (!cls) {
        return res.status(404).json({ message: 'Turma não encontrada' });
      }

      res.json(cls);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar turma' });
    }
  },

  // POST /api/classes
  create: async (req: Request, res: Response) => {
    try {
      const { name, capacity, schedule, status } = req.body;

      if (!name || !capacity) {
        return res.status(400).json({ message: 'Nome e capacidade são obrigatórios' });
      }

      const newClass = {
        id: uuidv4(),
        name,
        capacity: Number(capacity),
        currentStudents: 0,
        schedule: schedule || '',
        status: status || 'active',
        createdAt: new Date().toISOString(),
      };

      classes.push(newClass);
      res.status(201).json(newClass);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar turma' });
    }
  },

  // PUT /api/classes/:id
  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, capacity, schedule, status } = req.body;

      const index = classes.findIndex((c) => c.id === id);

      if (index === -1) {
        return res.status(404).json({ message: 'Turma não encontrada' });
      }

      classes[index] = {
        ...classes[index],
        name: name || classes[index].name,
        capacity: capacity ? Number(capacity) : classes[index].capacity,
        schedule: schedule !== undefined ? schedule : classes[index].schedule,
        status: status || classes[index].status,
      };

      res.json(classes[index]);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar turma' });
    }
  },

  // DELETE /api/classes/:id
  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const index = classes.findIndex((c) => c.id === id);

      if (index === -1) {
        return res.status(404).json({ message: 'Turma não encontrada' });
      }

      classes.splice(index, 1);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Erro ao deletar turma' });
    }
  },
};