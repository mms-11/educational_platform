import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { users } from '@/data/mockData';
import { config } from '@/config';
import type { AuthRequest } from '@/middlewares';

export const authController = {
  // POST /api/auth/login
  login: async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ message: 'Email e senha são obrigatórios' });
        return;
      }

      // Find user
      const user = users.find((u) => u.email === email);

      if (!user) {
        res.status(401).json({ message: 'Credenciais inválidas' });
        return;
      }

      // Check password
      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if (!isPasswordValid) {
        res.status(401).json({ message: 'Credenciais inválidas' });
        return;
      }

      // Generate token
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        config.jwt.secret,
        { expiresIn: config.jwt.expiresIn }
      );

      // Return user without password
      const { password: _, ...userWithoutPassword } = user;

      res.json({
        token,
        user: userWithoutPassword,
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Erro ao fazer login' });
    }
  },

  // POST /api/auth/logout
  logout: async (req: Request, res: Response): Promise<void> => {
    // In a real app, you might want to blacklist the token
    res.json({ message: 'Logout realizado com sucesso' });
  },

  // GET /api/auth/me
  me: async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ message: 'Não autenticado' });
        return;
      }

      const user = users.find((u) => u.id === req.user!.id);

      if (!user) {
        res.status(404).json({ message: 'Usuário não encontrado' });
        return;
      }

      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error('Get user error:', error);
      res.status(500).json({ message: 'Erro ao buscar usuário' });
    }
  },

  // POST /api/auth/verify
  verify: async (req: Request, res: Response): Promise<void> => {
    try {
      const { token } = req.body;

      if (!token) {
        res.status(400).json({ valid: false });
        return;
      }

      jwt.verify(token, config.jwt.secret);
      res.json({ valid: true });
    } catch {
      res.json({ valid: false });
    }
  },
};
