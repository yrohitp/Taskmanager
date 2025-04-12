import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './configs/db';
import taskRoutes from './routes/taskRoutes';

dotenv.config();

// Initialize express app
const app: Application = express();


// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes);

// Connect to MongoDB
connectDB();

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Task Manager API is running');
});

export default app;

