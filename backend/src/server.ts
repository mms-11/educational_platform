import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import studentRoutes from './routes/student.routes';
import classRoutes from './routes/class.routes';
import dashboardRoutes from './routes/dashboard.routes';
import assessmentRoutes from '../src/routes/assessments.routes'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/assessments', assessmentRoutes); // ← ADICIONE

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔐 JWT Secret configured: ${!!process.env.JWT_SECRET}`);
});