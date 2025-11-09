import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import studentRoutes from './routes/student.routes';
import classRoutes from './routes/class.routes';
import dashboardRoutes from './routes/dashboard.routes';
import assessmentRoutes  from './routes/assessments.routes';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS liberado para QUALQUER origem (temporário para testes)
app.use(cors({
  origin: '*', // ← ACEITA QUALQUER ORIGEM
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false, // ← Importante quando origin é '*'
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/assessments', assessmentRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Portal do Professor API',
    version: '1.0.0',
    endpoints: [
      '/api/auth',
      '/api/students',
      '/api/classes',
      '/api/dashboard',
      '/api/assessments',
    ],
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;