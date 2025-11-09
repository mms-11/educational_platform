# 🎓 Portal do Professor - Sistema Acadêmico

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)

Sistema acadêmico completo para gerenciamento de alunos, turmas e avaliações desenvolvido com React, TypeScript, Node.js e Express.

## 🎯 Sobre o Projeto

O Portal do Professor é uma aplicação web moderna desenvolvida para facilitar o gerenciamento acadêmico. O sistema permite que professores gerenciem alunos, turmas e configurem critérios de avaliação de forma intuitiva e eficiente.

## ✨ Destaques

- ✅ Arquitetura escalável (Monorepo: Frontend + Backend)
- ✅ Autenticação JWT com rotas protegidas
- ✅ TypeScript para type-safety
- ✅ Interface responsiva
- ✅ Código limpo e modularizado
- ✅ Context API para gerenciamento de estado
- ✅ Validações robustas
- ✅ Feedback visual (loading, erro, sucesso)

## 🚀 Funcionalidades

### ✅ Implementado
- **Autenticação**: Login JWT, rotas protegidas, logout
- **Dashboard**: Estatísticas, próximas avaliações
- **API REST Completa**: Alunos, Turmas, Avaliações
- **Layout Responsivo**: Header, Sidebar, Navigation

### 🔄 Em Desenvolvimento
- Interfaces de CRUD de Alunos
- Interfaces de CRUD de Turmas
- Interface de Configuração de Avaliações
- Testes automatizados

## 🛠️ Tecnologias

**Frontend:** React 18, TypeScript, React Router, Axios, Context API, Vite, CSS Modules

**Backend:** Node.js, Express, TypeScript, JWT, bcryptjs, CORS

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/portal-professor.git
cd portal-professor

# Instale as dependências
npm install

# Configure variáveis de ambiente
cd backend && cp .env.example .env
cd ../frontend && cp .env.example .env

# Inicie o projeto (raiz)
cd ..
npm run dev
```

## 🎮 Como Usar

**Credenciais de teste:**
- Professor: `professor@teste.com` / `senha123`
- Admin: `admin@teste.com` / `admin123`

**URLs:**
- Frontend: http://localhost:3000 (ou 5173)
- Backend: http://localhost:5000

## 🔌 API Endpoints

```
POST   /api/auth/login                      # Login
GET    /api/auth/me                         # Usuário atual
GET    /api/dashboard/stats                 # Estatísticas
GET    /api/dashboard/upcoming-assessments  # Avaliações
GET    /api/students                        # Listar alunos
POST   /api/students                        # Criar aluno
PUT    /api/students/:id                    # Atualizar
DELETE /api/students/:id                    # Remover
```

## 📝 Scripts

```bash
npm run dev          # Inicia frontend + backend
npm run build        # Build de ambos
npm run lint         # Lint
npm run format       # Format com Prettier
```

## 🏗️ Estrutura

```
portal-professor/
├── frontend/        # React + TypeScript
│   ├── src/
│   │   ├── components/
│   │   ├── features/
│   │   ├── contexts/
│   │   ├── services/
│   │   ├── types/
│   │   └── routes/
│   └── package.json
│
├── backend/         # Node.js + Express
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── types/
│   │   └── data/
│   └── package.json
│
└── package.json     # Monorepo
```

## 👨‍💻 Autor

Desenvolvido para o desafio técnico Frontend React

---

⭐ Projeto desenvolvido com foco em qualidade, organização e boas práticas!
