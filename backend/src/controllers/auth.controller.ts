import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { users } from '../data/mockData';
import { config } from '../config';

export const authController = {
  // POST /api/auth/login
  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          message: 'Email e senha são obrigatórios',
        });
      }

      const user = users.find((u) => u.email === email);

      if (!user) {
        return res.status(401).json({
          message: 'Credenciais inválidas',
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({
          message: 'Credenciais inválidas',
        });
      }

      // Gerar token JWT - CORRIGIDO
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        config.jwt.secret as string,
        {
          expiresIn: config.jwt.expiresIn as string | number,
        }
      );

      const { password: _, ...userWithoutPassword } = user;

      res.json({
        user: userWithoutPassword,
        token,
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        message: 'Erro ao fazer login',
      });
    }
  },

  // POST /api/auth/register
  register: async (req: Request, res: Response) => {
    try {
      const { name, email, password, role } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({
          message: 'Nome, email e senha são obrigatórios',
        });
      }

      const userExists = users.find((u) => u.email === email);

      if (userExists) {
        return res.status(400).json({
          message: 'Usuário já cadastrado',
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = {
        id: String(users.length + 1),
        name,
        email,
        password: hashedPassword,
        role: role || 'teacher',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          name
        )}&background=random`,
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);

      // Gerar token JWT - CORRIGIDO
      const token = jwt.sign(
        {
          id: newUser.id,
          email: newUser.email,
          role: newUser.role,
        },
        config.jwt.secret as string,
        {
          expiresIn: config.jwt.expiresIn as string | number,
        }
      );

      const { password: _, ...userWithoutPassword } = newUser;

      res.status(201).json({
        user: userWithoutPassword,
        token,
      });
    } catch (error) {
      console.error('Register error:', error);
      res.status(500).json({
        message: 'Erro ao criar usuário',
      });
    }
  },

  // POST /api/auth/verify - ADICIONAR
  verify: async (req: Request, res: Response) => {
    try {
      const { token } = req.body;

      if (!token) {
        return res.status(400).json({
          message: 'Token não fornecido',
        });
      }

      const decoded = jwt.verify(token, config.jwt.secret as string) as any;

      const user = users.find((u) => u.id === decoded.id);

      if (!user) {
        return res.status(404).json({
          message: 'Usuário não encontrado',
        });
      }

      const { password: _, ...userWithoutPassword } = user;

      res.json({
        valid: true,
        user: userWithoutPassword,
      });
    } catch (error) {
      res.status(401).json({
        valid: false,
        message: 'Token inválido',
      });
    }
  },

  // POST /api/auth/logout - ADICIONAR
  logout: async (req: Request, res: Response) => {
    try {
      // Como estamos usando JWT, não há necessidade de invalidar no servidor
      // O cliente deve remover o token do localStorage
      res.json({
        message: 'Logout realizado com sucesso',
      });
    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({
        message: 'Erro ao fazer logout',
      });
    }
  },

  // GET /api/auth/me
  me: async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const userId = req.userId;

      const user = users.find((u) => u.id === userId);

      if (!user) {
        return res.status(404).json({
          message: 'Usuário não encontrado',
        });
      }

      const { password: _, ...userWithoutPassword } = user;

      res.json({ user: userWithoutPassword });
    } catch (error) {
      console.error('Me error:', error);
      res.status(500).json({
        message: 'Erro ao buscar usuário',
      });
    }
  },
};
